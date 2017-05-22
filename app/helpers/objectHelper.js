module.exports = (function(){
  return {
    merge: function (source, dest){
      if(!source || !dest){
        return;
      }
      for(var key in source){
        if(source[key] !== undefined && typeof(dest[key]) !== 'object'){
          dest[key] = source[key];
        }
      }
    }
  };
})();