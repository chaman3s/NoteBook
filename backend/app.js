const connectToMongo = require('./db');
const express = require('express')
const router = express.Router();

const Port = 90;
const app = express();

var cors = require('cors')

app.use(cors())

connectToMongo();

app.use(express.json());

app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.listen(Port,()=>{
    connectToMongo();
    console.log("listening on ",Port)
});