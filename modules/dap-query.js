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

      me.parseDAS = function(text) {
        var result = {};

        var lines = text.split('\n').map(Function.prototype.call,String.prototype.trim);

        lines = lines.map(function(line,idx){
          if((line[0]==='}')) {
            if((idx===(lines.length-1))||(lines[idx+1]!=='}')) {
              return '},';
            }
            return line;
          }

          if(line.endswith('{')) {
            // Groiup
          } 
          
          // Data line         
          return result;
        });

        return result;
      };

      me.parseData = function(text,das) {
        var result = {};

        var sections = text.split(/\n-+\w*\n/);
        var header = sections[0];
        var body = sections[1];


        return result;
      };

      return me;
   }('dap'));
   // Attach methods to myModule...
}());
