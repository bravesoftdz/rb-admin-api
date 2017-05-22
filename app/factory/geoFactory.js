var objectHelper = require('../helpers/objectHelper');
var fs = require('fs');
var _ = require('lodash');

var states;
var cities;
module.exports = (function(){
  return {
    findStates: function (req, res){
      if(!states){
        fs.readFile('./estados-brasileiros.json', 'utf8', function (err, data) {
          if (err) {
            return;
          }
          states = JSON.parse(data);
        });
      } else {
        return res.json(states);
      }
    },
    findCitiesByState: function (req, res){
      var id = req.params.id;
      if(!cities){
        fs.readFile('./cidades-brasileiras.json', 'utf8', function (err, data) {
          if (err) {
            return;
          }
          cities = JSON.parse(data);
          var obj = _.filter(cities, { stateId: id });
          return res.json(obj);
        });
      } else {
        var obj = _.filter(cities, { stateId: id });
        return res.json(obj);
      }
    }
  };
})();