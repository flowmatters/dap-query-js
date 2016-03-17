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
        String creator_name "Water and Landscape Dynamics group";\n\
        String creator_url "http://www.wenfo.org/wald/";\n\
        String creator_email "albert.vandijk@anu.edu.au";\n\
        String institution "Australian National University";\n\
        String date_created "07-Mar-2016";\n\
        String license "Creative Commons with Attribution (https://creativecommons.org/licenses/by/3.0/au/deed.en)";\n\
    }\n\
}';

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

  var hasModule = function(module) {
  return dependencies.indexOf(module) >= 0;
  };

  beforeEach(function() {
    // Get module
    module = dap;
  });

  it('should parse das',function(){
    var parsed = module.parseDAS(simpleDAS);
    expect(parsed.variables.Pg).toBeDefined();
    expect(parsed.variables.time.epoch.getYear()).toBe(1800);
    expect(parsed.variables.dimensions.length).toBe(3);
    expect(parsed.variables.dimensions[0]).toBe('time');
    expect(parsed.attr.creator_name).toBe('Water and Landscape Dynamics group');
  });

  it('should parse simple queries',function(){
    var parsed = module.parseData(simpleData);
    expect(parsed.Pg).toBeDefined();
    expect(parsed.Pg.length).toBe(1);
    expect(parsed.Pg[0].length).toBe(1);
    expect(parsed.Pg[0][0].length).toBe(51);
  });

});
