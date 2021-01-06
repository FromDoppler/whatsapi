var express = require('express');
require('dotenv').config();
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({extended: false}));
const { escape } = require('querystring');

  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = require('twilio')(accountSid, authToken);
  const MessagingResponse = require('twilio').twiml.MessagingResponse;
  
/*   console.log("#########################");
  console.log(accountSid);
  console.log(authToken);
  console.log("#########################"); */


  app.get('/', function (req, res) {
    console.log('Hello World!')
    res.send('Hello World!');
  });


app.get('/sendMessage', function (req, res) {
  client.messages
    .create({
      from: 'whatsapp:+16282271705',
      body: 'Bienvenido al wasap automatico de Doppler!',
      to: 'whatsapp:+5492236692734'
    })
    .then(message => {
      console.log(message)
      res.send('Hello World!');
    })
    .catch(err =>{
      console.log(err)
      res.send('aca hay un erroraso');
    });
    
});

app.post('/recive', (req, res) => {
  const twiml = new MessagingResponse();
  const query = req.body;
  console.log(req.body);
/*   
  console.log("otra opcioin seria estringifitear solo erl requ");
  console.log(JSON.parse(JSON.stringify(req))); */
  //const query = "*¡Hola!* 👋 Gracias por escribirnos.\n\n Cuéntanos cómo podemos ayudarte y *un miembro del equipo de Doppler te responderá pronto.*\n";
  twiml.message(`*su mensaje es:* \n\n${query}\n\n *muchas gracias.* \n\n\n🌈  *visítanos!:* https://www.fromdoppler.com`);
 
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
  console.log('live port! 80' + PORT );
});
