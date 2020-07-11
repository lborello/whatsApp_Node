const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();
const  client = require('./whats-app');  

app.use(bodyParser.json());

console.log(client.sendMessage); 


//https://www.youtube.com/watch?feature=youtu.be&v=bQj7Hg4PFe4&app=desktop

 app.post('/whatsapp/connect', client.conectApi);
 app.post('/whatsapp/sendmessage', client.sendMessage);

app.listen(3000, () => {
    console.log('conectado');
})