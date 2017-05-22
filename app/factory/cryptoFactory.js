var bcrypt = require('bcrypt');
var crypto = require('crypto');

module.exports = (function(){
  return {
    shuffle: function (str){
      var hash = bcrypt.hashSync(str, 8);
      return hash;
    },
    compare: function (planPassword, hash){
      return bcrypt.compareSync(planPassword, hash);
    }
  };
})();