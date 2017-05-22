var User        = require("./app/models/userModel");
var factories   = require("./app/factories");
var mongoose    = require('mongoose');
var config      = require('./app/config');

mongoose.connect(config.database);
console.log("Conectado em: " + config.database);
var initializeUsers = function (){
  var users = [{ 
    username: "renan",
    name: "Renan", 
    password: factories.crypto.shuffle("renan147"),
    email: "renan@nexusistemas.com.br",
    role: "admin"
  },
  { 
    username: "paulo",
    name: "paulo", 
    password: factories.crypto.shuffle("paulo147"),
    email: "paulo@nexusistemas.com.br",
    role: "admin"
  },
  { 
    username: "vinicius",
    name: "Vinicius", 
    password: factories.crypto.shuffle("vinicius147"),
    email: "vinicius@nexusistemas.com.br",
    role: "admin"
  },
  { 
    username: "demo",
    name: "Demo", 
    password: factories.crypto.shuffle("demo"),
    email: "demo@demo.com.br",
    role: "admin"
  },];
  
  User.remove({}, function (){
    console.log("Limpando tabela de usuários");
    
    User.create(users, function(e){
      console.log("Populando usuários");
      process.exit(0);
    }, function(){
      console.log('error');
    });

  });
  
  console.log(factories.crypto.shuffle("renan147"));
  
};

console.log("Inicializando banco de dados");
initializeUsers();
