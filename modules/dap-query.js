/*jshint -W089 */
/*jshint -W121 */
/*jshint camelcase:false */
/*jshint maxcomplexity:11 */

(function () {
  'use strict';
   var dapQuery = (function (name) {
      var root = typeof window !== 'undefined' ? window : global,
         had = Object.prototype.hasOwnProperty.call(root, name),
         prev = root[name], me = root[name] = {};
      if (typeof module !== 'undefined' && module.exports) {
         module.exports = me;
      }

      me.noConflict = function () {
         if (root[name] === me) {
            root[name] = had ? prev : undefined;
            if (!had) {
               try {
                  delete root[name];
               } catch (ex) {
               }
            }
         }
         return me;
      };

      var postProcessDataDescription = function(das){
        Object.keys(das.variables).forEach(function(v){
          var variable = das.variables[v];
          if(!variable.units){
            return;
          }
          if((variable.units.indexOf('days since ')<0)&&
             (variable.units.indexOf('seconds since ')<0)){
            return;
          }
          variable.scale=variable.units.split(' ')[0];
          var epochText = variable.units.substr(variable.scale.length+7);
          var epochComponents = epochText.split(/[ \-\:]/);
          variable.epoch = new Date(epochComponents[0],epochComponents[1]-1,epochComponents[2],
                                epochComponents[3]||null,epochComponents[4]||null,epochComponents[5]||null);
        });
      };

      me.dasToJSON = function(text){
        text = '{\n'+text+'\n}';
        var linesTmp = text.split('\n');
        var lines = [];
        var accum;
        linesTmp.forEach(function(line){
          var quoteCount = (line.replace(/\\"/g,'').match(/"/g)||[]).length;
          if(accum){
            if(quoteCount%2){
              lines.push(accum+line);
              accum=undefined;
            } else {
              accum += line;
            }
          } else {
            if(quoteCount%2){
              accum = line;
            } else {
              lines.push(line);
            }
          }
        });
        if(accum){
          lines.push(accum);
        }

        lines = lines.map(Function.prototype.call,String.prototype.trim);
        var lastLineInBlock = function(idx){
          if(idx===(lines.length-1)) {
            return true;
          }

          for(var jdx=idx+1; jdx<lines.length; jdx++) {
            if(lines[jdx]==='}') {
              return true;
            }

            if(lines[jdx].length) {
              return false;
            }
          }

          return true;
        };

        lines = lines.map(function(line,idx){
          if(!line.length) {
            return '';
          }

          if(line==='{'){
            return '{';
          }

          if((line[0]==='}')) {
            if(lastLineInBlock(idx)) {
              return '}';
            }
            return '},';
          }

          var components;
          if(line[line.length-1]==='{') {
            // Group
            components = line.split(' ');
            return '"' + components[0] + '":{';
          } 
          
          // Data line
          components = line.split(' ');
          var dType = components[0];
          var vName = components[1];
          var startValue = dType.length + vName.length + 2;
          var value = line.substr(startValue,line.length-startValue-1);

          if((dType!=='String')&&(value.indexOf(',')>=0)) {
            value = '[' + value + ']';
          }
          if(value==='NaN'){
            value='null';
          }
          var result = '"'+vName+'":'+value;
          if(!lastLineInBlock(idx)){
            result += ',';
          }
          return result;
        });

        var result = lines.join('\n');
        return result;
      };

      me.parseDAS = function(text) {
        var result = {
          variables:{}
        };
        var json = me.dasToJSON(text);
        var data = JSON.parse(json).Attributes;

        for(var key in data) {
          if(key==='NC_GLOBAL') {
            result.attr = data[key];
          } else {
            result.variables[key] = data[key];
          }
        }

        postProcessDataDescription(result);

        return result;
      };

      var copyInto = function(src,dest) {
        for(var key in src){
          dest[key] = src[key];
        }
        return dest;
      };

      var retrieveAttributes = function(elem) {
        var result = {};

        var attrs = elem.getElementsByTagName('Attribute');
        for(var ix=0; ix<attrs.length;ix++){
          var attr = attrs[ix];
          var attrValue = attr.getElementsByTagName('value')[0].textContent;
          result[attr.getAttribute('name')] = attrValue;
        }
        return result;
      };

      var retrieveArrayDetails = function(arrayElem) {
        var result = {};
        result.dimensions = [];
        result = copyInto(retrieveAttributes(arrayElem),result);

        for(var ix=0;ix<arrayElem.childNodes.length;ix++){
          var child = arrayElem.childNodes[ix];

          if((child.nodeName==='Attribute')||child.nodeName==='#text'){
            continue;
          }

          if(child.nodeName==='dimension'){
            result.dimensions.push({
              name:child.getAttribute('name'),
              size:child.getAttribute('size')
            });
          } else {
            result.dType = child.nodeName;
          }
        }
        return result;
      };

      me.parseDDX = function(xmlText) {
        var parser = new DOMParser();
        xmlText = xmlText.replace('<Datasetname','<Dataset name'); // Fix bug with some versions of THREDDS!

        var doc = parser.parseFromString(xmlText,'text/xml');
        doc = doc.documentElement;
        var result = {
          variables:{}
        };

        var grids = doc.getElementsByTagName('Grid');
        var ix;
        var varName,variable;
        for(ix=0; ix<grids.length;ix++){
          var gridElem = grids[ix];
          varName = gridElem.getAttribute('name');
          variable = {};

          variable = copyInto(retrieveAttributes(gridElem),variable);
          var array = gridElem.getElementsByTagName('Array')[0];
          variable = copyInto(retrieveArrayDetails(array),variable);
          result.variables[varName] = variable;
        }

        var arrays = doc.getElementsByTagName('Array');
        for(ix=0;ix<arrays.length;ix++){
          var arrayElem = arrays[ix];
          if(arrayElem.parentNode.nodeName==='Grid') {
            continue;
          }
          varName = arrayElem.getAttribute('name');
          result.variables[varName] = retrieveArrayDetails(arrayElem);
        }
        postProcessDataDescription(result);
        return result;
      };

      var newLinesAsJSON = function(lines,dimensions){
        if(dimensions.length===1){
          return '['+lines[0]+']';
        } else if(dimensions.length===2){
          return '['+lines.map(function(line){
            var components = line.split(',');
            if(components[0][0]==='[') {
              components.shift();
            }
            return '['+components.join(',')+']';
          }).join(',\n')+']\n';
        } else {
          var result = [];
          for(var ix = 0; ix<dimensions[0];ix++){
            var entry = newLinesAsJSON(lines.slice(ix,ix+dimensions[1]),dimensions.slice(1));
            //lines = lines.slice(dimensions[1]);
            if(ix<(dimensions[0]-1)) {
              entry += ',';
            }
            entry += '\n';
            result.push(entry);
          }
          return '['+result.join('').replace(/NaN/g,'null')+']';
        }
      };

      me.parseDDS = function(txt){
        var lines = txt.split('\n').map(function(s){return s.trim();});
        var result = {
          variables:{}
        };
        var currentVariableName = null;

        var addVariable = function(ln){
          var components = ln.split(/[ \[=\];]+/);
          var varName = components[1];
          result.variables[varName] = {
            dimensions:[]
          };
          for(var dim=2;dim<(components.length-1);dim+=2){
            result.variables[varName].dimensions.push({
              name:components[dim],
              size:+components[dim+1]
            });
          }
          return varName;
        };

        lines.slice(1).forEach(function(ln){
          if(ln.startsWith('}')){
            currentVariableName = null;
            return;
          }

          if(currentVariableName===null){
            if(ln.endsWith(';')){
              currentVariableName = addVariable(ln);
              return;
            }
          }

          if(ln.endsWith(':')){
            return;
          }
        });
        return result;
      };

      me.dataToJSON = function(text) {
        var result = {};

        var sections = text.split(/\n-+\w*\n/);
        var header = sections[0];
        var body = sections[1];

        var variables = body.trim().split('\n\n');
        variables = variables.map(function(v){
          var lines = v.split('\n');
          var headerLine = lines.shift();
          var dimensions = headerLine.split('[');
          var varName = dimensions.shift().split('.').pop();
          dimensions = dimensions.map(function(d){return +d.slice(0,d.length-1);});
          var data = newLinesAsJSON(lines,dimensions);
          return '"'+varName+'":' + data;
        });
        return '{' + variables.join(',\n') + '}';
      };

      me.parseData = function(text,das,_fillValues) {
        var parsed = JSON.parse(me.dataToJSON(text));
        if(das){
          Object.keys(parsed).forEach(function(v){
            if(!das.variables[v]){
              return;
            }

            var variable = das.variables[v];
            if(!variable.epoch){
              return;
            }

            var epoch = variable.epoch;
            parsed[v] = parsed[v].map(function(d){
              if(variable.scale==='days'){
                var date = new Date(epoch);
                date.setDate(date.getDate()+d);
                return date;
              } else if(variable.scale==='seconds'){
                return new Date(epoch.getTime()+1000.0*d);
              }
              return null;
            });
          });
        }

        if(das){
          for(var variable in parsed){
            if(_fillValues!==undefined&&(_fillValues[variable]!==undefined)){
              me.replaceValues(parsed[variable],_fillValues[variable],NaN);
            }else if(das.variables[variable]&&das.variables[variable]._FillValue){
              me.replaceValues(parsed[variable],+das.variables[variable]._FillValue,NaN);
            }
          }
        }
        return parsed;
      };

      me.replaceValues = function(variable,from,to){
        for(var i in variable){
          if(variable[i]===null){
            variable[i]=NaN;
          }

          if(variable[i].length){
            me.replaceValues(variable[i],from,to);
          } else if(variable[i]===from){
            variable[i]=to;
          }
        }
      };

      me.simplifyVariable = function(variable) {
        if(Object.prototype.toString.call(variable) === '[object Array]') {
          if(variable.length===1) {
            return me.simplifyVariable(variable[0]);
          } else {
            return variable.map(function(elem){
              return me.simplifyVariable(elem);
            });
          }
        } else {
          return variable;
        }
      };

      me.simplify = function(data){
        var result = {};
        for(var name in data){
          result[name] = me.simplifyVariable(data[name]);
        }
        return result;
      };

      me.sliceToQuery = function(slice){
        if(!slice.length){
          slice = [slice];
        }

        if(slice.length===1){
          slice = [slice,slice];
        }

        if(slice.length===2){
          slice = [slice[0],1,slice[1]];
        }

        return '['+slice.join(':')+']';
      };

      me.makeQuery = function(ddx,variable,params){
        params = params||{};
        var variableMetadata = ddx.variables[variable];
        return variableMetadata.dimensions.map(function(dim){
          var dimName = dim.name;
          var slice = params[dimName];
          if(slice===undefined){
            slice = [0,(+dim.size)-1];
          }
          return me.sliceToQuery(slice);
        }).join('');
      };

      return me;

   }('dap'));
   // Attach methods to myModule...
}());
