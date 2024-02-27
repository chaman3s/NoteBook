const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
require("dotenv").config({ path: '/home/chaman/project/INotebook/backend/.env'});
const Database_url = process.env.NODE_ENV_Database_url;
console.log(Database_url);
const connectToMongo= ()=> {
      try{
        mongoose.connect('mongodb://127.0.0.1:27017/test')
        .then(() => console.log('Connected!'));
       
      }
      catch{

      }


  }
module.exports = connectToMongo;
