'use strict';

describe('', function() {

  var module;
  var dependencies;
  dependencies = [];

  var simpleDAS = 'Attributes {\n\
    Pg {\n\
        Float32 _FillValue -999.0;\n\
        String short_name "Pg";\n\
        String units "-";\n\
        String long_name "Pg";\n\
        Int32 _ChunkSizes 24, 58, 47;\n\
    }\n\
    longitude {\n\
        String long_name "longitude";\n\
        String units "degrees_east";\n\
    }\n\
    latitude {\n\
        String long_name "latitude";\n\
        String units "degrees_north";\n\
    }\n\
    time {\n\
        String units "days since 1800-01-01 0:0:0";\n\
        String long_name "time";\n\
    }\n\
    NC_GLOBAL {\n\
        String emptyAttr "";\n\
        String creator_name "Water and Landscape Dynamics group";\n\
        String strange_attr "Water and Landscape Dynamics \\"group";\n\
        String creator_url "http://www.wenfo.org/wald/";\n\
        String creator_email "albert.vandijk@anu.edu.au";\n\
        String institution "Australian National University";\n\
        String date_created "07-Mar-2016";\n\
        String license "Creative Commons with Attribution (https://creativecommons.org/licenses/by/3.0/au/deed.en)";\n\
    }\n\
}\n';

  var simpleDDS = 'Dataset {\n\
    Grid {\n\
     ARRAY:\n\
        Byte ChangeMap[time = 1][latitude = 137000][longitude = 162000];\n\
     MAPS:\n\
        Int32 time[time = 1];\n\
        Float32 latitude[latitude = 137000];\n\
        Float32 longitude[longitude = 162000];\n\
    } ChangeMap;\n\
    Int32 time[time = 1];\n\
    Float32 latitude[latitude = 137000];\n\
    Float32 longitude[longitude = 162000];\n\
} ub8/au/treecover/ANUWALD.change.2015.nc;';

  var simpleData = 'Dataset {\n\
    Grid {\n\
     ARRAY:\n\
        Float32 Pg[time = 1][longitude = 1][latitude = 51];\n\
     MAPS:\n\
        Int32 time[time = 1];\n\
        Float32 longitude[longitude = 1];\n\
        Float32 latitude[latitude = 51];\n\
    } Pg;\n\
} ub8/au/OzWALD/daily/OzWALD.daily.Pg.2015.nc;\n\
---------------------------------------------\n\
Pg.Pg[1][1][51]\n\
[0][0], -999.0, -999.0, -999.0, -999.0, -999.0, -999.0, -999.0, -999.0, -999.0, -999.0, -999.0, -999.0, -999.0, -999.0, -999.0, -999.0, -999.0, -999.0, -999.0, -999.0, -999.0, -999.0, -999.0, -999.0, -999.0, -999.0, -999.0, -999.0, -999.0, -999.0, -999.0, -999.0, -999.0, -999.0, -999.0, -999.0, -999.0, -999.0, -999.0, -999.0, -999.0, -999.0, -999.0, -999.0, -999.0, -999.0, -999.0, -999.0, -999.0, -999.0, -999.0\n\
\n\
Pg.time[1]\n\
78527\n\
\n\
Pg.longitude[1]\n\
114.475\n\
\n\
Pg.latitude[51]\n\
-12.475, -12.525, -12.575, -12.625, -12.675, -12.725, -12.775, -12.825, -12.875, -12.925, -12.975, -13.025, -13.075, -13.125, -13.175, -13.225, -13.275, -13.325, -13.375, -13.425, -13.475, -13.525, -13.575, -13.625, -13.675, -13.725, -13.775, -13.825, -13.875, -13.925, -13.975, -14.025, -14.075, -14.125, -14.175, -14.225, -14.275, -14.325, -14.375, -14.425, -14.475, -14.525, -14.575, -14.625, -14.675, -14.725, -14.775, -14.825, -14.875, -14.925, -14.975';


  var simpleDDX = '<?xml version="1.0" encoding="UTF-8"?>\n\
<Dataset name="ub8/au/treecover/ANUWALD.change.2015.nc"\n\
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n\
xmlns="http://xml.opendap.org/ns/DAP2"\n\
xsi:schemaLocation="http://xml.opendap.org/ns/DAP2  http://xml.opendap.org/dap/dap2.xsd" >\n\
\n\
\n\
  <Grid  name="ChangeMap">\n\
    <Attribute name="_Unsigned" type="String">\n\
      <value>true</value>\n\
    </Attribute>\n\
    <Attribute name="_FillValue" type="Int16">\n\
      <value>-1</value>\n\
    </Attribute>\n\
    <Attribute name="long_name" type="String">\n\
      <value>tree cover change category</value>\n\
    </Attribute>\n\
    <Attribute name="units" type="String">\n\
      <value>categorical</value>\n\
    </Attribute>\n\
    <Attribute name="_ChunkSizes" type="Int32">\n\
      <value>1</value>\n\
      <value>1882</value>\n\
      <value>2226</value>\n\
    </Attribute>\n\
    <Array name="ChangeMap">\n\
      <Byte/>\n\
      <dimension name="time" size="1"/>\n\
      <dimension name="latitude" size="137000"/>\n\
      <dimension name="longitude" size="162000"/>\n\
    </Array>\n\
    <Map name="time">\n\
      <Int32/>\n\
      <dimension name="time" size="1"/>\n\
    </Map>\n\
    <Map name="latitude">\n\
      <Float32/>\n\
      <dimension name="latitude" size="137000"/>\n\
    </Map>\n\
    <Map name="longitude">\n\
      <Float32/>\n\
      <dimension name="longitude" size="162000"/>\n\
    </Map>\n\
  </Grid>\n\
  <Array name="time">\n\
    <Attribute name="long_name" type="String">\n\
      <value>time</value>\n\
    </Attribute>\n\
    <Attribute name="units" type="String">\n\
      <value>days since 1800-01-01 0:0:0</value>\n\
    </Attribute>\n\
    <Int32/>\n\
    <dimension name="time" size="1"/>\n\
  </Array>\n\
  <Array name="latitude">\n\
    <Attribute name="long_name" type="String">\n\
      <value>latitude</value>\n\
    </Attribute>\n\
    <Attribute name="units" type="String">\n\
      <value>degrees_north</value>\n\
    </Attribute>\n\
    <Float32/>\n\
    <dimension name="latitude" size="137000"/>\n\
  </Array>\n\
  <Array name="longitude">\n\
    <Attribute name="long_name" type="String">\n\
      <value>longitude</value>\n\
    </Attribute>\n\
    <Attribute name="units" type="String">\n\
      <value>degrees_east</value>\n\
    </Attribute>\n\
    <Float32/>\n\
    <dimension name="longitude" size="162000"/>\n\
  </Array>\n\
\n\
</Dataset>';

  var twoD = 'Dataset {\n\
    Grid {\n\
     ARRAY:\n\
        Float32 Pg[time = 31][latitude = 1][longitude = 6];\n\
     MAPS:\n\
        Int32 time[time = 31];\n\
        Float32 latitude[latitude = 1];\n\
        Float32 longitude[longitude = 6];\n\
    } Pg;\n\
} ub8/au/Pg/MOD09A1.Pgau.0_005deg.2015.nc;\n\
---------------------------------------------\n\
Pg.Pg[31][1][6]\n\
[0][0], 1.0, 1.0, 1.0, 1.0, 1.0, 1.0\n\
[1][0], 2.0, 1.0, 1.0, 1.0, 1.0, 1.0\n\
[2][0], 3.0, 1.0, 1.0, 1.0, 1.0, 1.0\n\
[3][0], 4.0, 1.0, 1.0, 1.0, 1.0, 1.0\n\
[4][0], 5.0, 1.0, 1.0, 1.0, 1.0, 1.0\n\
[5][0], 6.0, 1.0, 1.0, 1.0, 1.0, 1.0\n\
[6][0], 7.0, 1.0, 1.0, 1.0, 1.0, 1.0\n\
[7][0], 8.0, 1.0, 1.0, 1.0, 1.0, 1.0\n\
[8][0], 9.0, 1.0, 1.0, 1.0, 1.0, 1.0\n\
[9][0], 10.0, 1.0, 1.0, 1.0, 1.0, 1.0\n\
[10][0], 11.0, 1.0, 1.0, 1.0, 1.0, 1.0\n\
[11][0], 12.0, 1.0, 1.0, 1.0, 1.0, 1.0\n\
[12][0], 13.0, 1.0, 1.0, 1.0, 1.0, 1.0\n\
[13][0], 14.0, 1.0, 1.0, 1.0, 1.0, 1.0\n\
[14][0], 15.0, 1.0, 1.0, 1.0, 1.0, 1.0\n\
[15][0], 16.0, 1.0, 1.0, 1.0, 1.0, 1.0\n\
[16][0], 17.0, 1.0, 1.0, 1.0, 1.0, 1.0\n\
[17][0], 18.0, 1.0, 1.0, 1.0, 1.0, 1.0\n\
[18][0], 19.0, 1.0, 1.0, 1.0, 1.0, 1.0\n\
[19][0], 20.0, 1.0, 1.0, 1.0, 1.0, 1.0\n\
[20][0], 21.0, 1.0, 1.0, 1.0, 1.0, 1.0\n\
[21][0], 22.0, 1.0, 1.0, 1.0, 1.0, 1.0\n\
[22][0], 23.0, 1.0, 1.0, 1.0, 1.0, 1.0\n\
[23][0], 24.0, 1.0, 1.0, 1.0, 1.0, 1.0\n\
[24][0], 25.0, 1.0, 1.0, 1.0, 1.0, 1.0\n\
[25][0], 26.0, 1.0, 1.0, 1.0, 1.0, 1.0\n\
[26][0], 27.0, 1.0, 1.0, 1.0, 1.0, 1.0\n\
[27][0], 28.0, 1.0, 1.0, 1.0, 1.0, 1.0\n\
[28][0], 29.0, 1.0, 1.0, 1.0, 1.0, 1.0\n\
[29][0], 30.0, 1.0, 1.0, 1.0, 1.0, 1.0\n\
[30][0], 31.0, 1.0, 1.0, 1.0, 1.0, 1.0\n\
\n\
Pg.time[31]\n\
78527, 78535, 78543, 78551, 78559, 78567, 78575, 78583, 78591, 78599, 78607, 78615, 78623, 78631, 78639, 78647, 78655, 78663, 78671, 78679, 78687, 78695, 78703, 78711, 78719, 78727, 78735, 78743, 78751, 78759, 78767\n\
\n\
Pg.latitude[1]\n\
-24.096972\n\
\n\
Pg.longitude[6]\n\
131.13841, 131.14311, 131.14781, 131.1525, 131.1572, 131.1619\n\
\n\
';

  var threeD = 'Dataset {\n\
    Grid {\n\
     ARRAY:\n\
        Float32 Pg[time = 11][latitude = 4][longitude = 5];\n\
     MAPS:\n\
        Int32 time[time = 11];\n\
        Float32 latitude[latitude = 4];\n\
        Float32 longitude[longitude = 5];\n\
    } Pg;\n\
} ub8/au/Pg/MOD09A1.Pgau.0_005deg.2015.nc;\n\
---------------------------------------------\n\
Pg.Pg[11][4][5]\n\
[0][0], 1.0, 1.0, 1.0, 1.0, 1.0\n\
[0][1], 1.0, 1.0, 1.0, 1.0, 1.0\n\
[0][2], 1.0, 1.0, 1.0, 1.0, 1.0\n\
[0][3], 1.0, 1.0, 1.0, 1.0, 1.0\n\
[1][0], 1.0, 1.0, 1.0, 1.0, 1.0\n\
[1][1], 1.0, 1.0, 1.0, 1.0, 1.0\n\
[1][2], 1.0, 1.0, 1.0, 1.0, 1.0\n\
[1][3], 1.0, 1.0, 1.0, 1.0, 1.0\n\
[2][0], 1.0, 1.0, 1.0, 1.0, 1.0\n\
[2][1], 1.0, 1.0, 1.0, 1.0, 1.0\n\
[2][2], 1.0, 1.0, 1.0, 1.0, 1.0\n\
[2][3], 1.0, 1.0, 1.0, 1.0, 1.0\n\
[3][0], 1.0, 1.0, 1.0, 1.0, 1.0\n\
[3][1], 1.0, 1.0, 1.0, 1.0, 1.0\n\
[3][2], 1.0, 1.0, 1.0, 1.0, 1.0\n\
[3][3], 1.0, 1.0, 1.0, 1.0, 1.0\n\
[4][0], 1.0, 1.0, 1.0, 1.0, 1.0\n\
[4][1], 1.0, 1.0, 1.0, 1.0, 1.0\n\
[4][2], 1.0, 1.0, 1.0, 1.0, 1.0\n\
[4][3], 1.0, 1.0, 1.0, 1.0, 1.0\n\
[5][0], 1.0, 1.0, 1.0, 1.0, 1.0\n\
[5][1], 1.0, 1.0, 1.0, 1.0, 1.0\n\
[5][2], 1.0, 1.0, 1.0, 1.0, 1.0\n\
[5][3], 1.0, 1.0, 1.0, 1.0, 1.0\n\
[6][0], 1.0, 1.0, 1.0, 1.0, 1.0\n\
[6][1], 1.0, 1.0, 1.0, 1.0, 1.0\n\
[6][2], 1.0, 1.0, 1.0, 1.0, 1.0\n\
[6][3], 1.0, 1.0, 1.0, 1.0, 1.0\n\
[7][0], 1.0, 1.0, 1.0, 1.0, 1.0\n\
[7][1], 1.0, 1.0, 1.0, 1.0, 1.0\n\
[7][2], 1.0, 1.0, 1.0, 1.0, 1.0\n\
[7][3], 1.0, 1.0, 1.0, 1.0, 1.0\n\
[8][0], 1.0, 1.0, 1.0, 1.0, 1.0\n\
[8][1], 1.0, 1.0, 1.0, 1.0, 1.0\n\
[8][2], 1.0, 1.0, 1.0, 1.0, 1.0\n\
[8][3], 1.0, 1.0, 1.0, 1.0, 1.0\n\
[9][0], 1.0, 1.0, 1.0, 1.0, 1.0\n\
[9][1], 1.0, 1.0, 1.0, 1.0, 1.0\n\
[9][2], 1.0, 1.0, 1.0, 1.0, 1.0\n\
[9][3], 1.0, 1.0, 1.0, 1.0, 1.0\n\
[10][0], 1.0, 1.0, 1.0, 1.0, 1.0\n\
[10][1], 1.0, 1.0, 1.0, 1.0, 1.0\n\
[10][2], 1.0, 1.0, 1.0, 1.0, 1.0\n\
[10][3], 1.0, 1.0, 1.0, 1.0, 1.0\n\
\n\
Pg.time[11]\n\
78527, 78535, 78543, 78551, 78559, 78567, 78575, 78583, 78591, 78599, 78607\n\
\n\
Pg.latitude[4]\n\
-24.096972, -24.10167, -24.106367, -24.111063\n\
\n\
Pg.longitude[5]\n\
131.13841, 131.14311, 131.14781, 131.1525, 131.1572\n\
\n\
';

  var hasModule = function(module) {
  return dependencies.indexOf(module) >= 0;
  };

  beforeEach(function() {
    // Get module
    module = dap;
  });

  it('should convert das to JSON',function(){
    var parsed = JSON.parse(module.dasToJSON(simpleDAS));
  });

  var dasExpectations = function(das,varName){
    expect(das.variables).toBeDefined();
    expect(das.variables[varName]).toBeDefined();
    expect(das.variables.time.epoch.getFullYear()).toBe(1800);
    expect(das.variables.time.epoch.getMonth()).toBe(0);
    expect(das.variables.time.epoch.getDate()).toBe(1);
  };

  it('should parse das',function(){
    var parsed = module.parseDAS(simpleDAS);
    dasExpectations(parsed,'Pg');
    expect(parsed.attr.creator_name).toBe('Water and Landscape Dynamics group');
  });

  it('should parse ddx',function(){
    var parsed = module.parseDDX(simpleDDX);
    dasExpectations(parsed,'ChangeMap');
    expect(parsed.variables.ChangeMap.dimensions.length).toBe(3);
    expect(parsed.variables.ChangeMap.dimensions[0].name).toBe('time');
  });

  it('should convert 1D data queries to json',function(){
    var jsonText = module.dataToJSON(simpleData);
    var parsed = JSON.parse(jsonText);
  });

  it('should convert 2D data queries to json',function(){
    var jsonText = module.dataToJSON(twoD);
    var parsed = JSON.parse(jsonText);
  });

  it('should convert nulls in data queries to json',function(){
    var jsonText = module.dataToJSON(twoD.replace('27.0','NaN'));
    var parsed = JSON.parse(jsonText);
  });

  it('should convert 3D data queries to json',function(){
    var jsonText = module.dataToJSON(threeD);
    var parsed = JSON.parse(jsonText);
  });

  it('should parse simple queries',function(){
    var parsed = module.parseData(simpleData);
    expect(parsed.Pg).toBeDefined();
    expect(parsed.Pg.length).toBe(1);
    expect(parsed.Pg[0].length).toBe(1);
    expect(parsed.Pg[0][0].length).toBe(51);

    var simplified = module.simplify(parsed);
    expect(simplified.Pg).toBeDefined();
    expect(simplified.Pg.length).toBe(51);
  });


  it('should translate time dimension',function(){
    var parsed = module.parseData(twoD,module.parseDDX(simpleDDX));
    expect(parsed.time.length).toBe(31);
    expect(parsed.time[0].getDate()).toBe(1);
    expect(parsed.time[0].getMonth()).toBe(0);
    expect(parsed.time[0].getFullYear()).toBe(2015);

    expect(parsed.time[1].getDate()).toBe(9);
    expect(parsed.time[1].getMonth()).toBe(0);
    expect(parsed.time[1].getFullYear()).toBe(2015);
  });

  it('should parse two dimensional data queries',function(){
    var parsed = module.parseData(twoD);

    // TODO expectations
  });

  it('should parse three dimensional data queries',function(){
    var parsed = module.parseData(threeD);

    // TODO expectations
  });

});
