var express = require('express');
require('dotenv').config();
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({extended: false}));

  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = require('twilio')(accountSid, authToken);
  const MessagingResponse = require('twilio').twiml.MessagingResponse;
  
  
app.get('/sendMessageTo/:phoneTo', function (req, res) { 
  client.messages
    .create({
      from: `whatsapp:${process.env.DOPPLER_PHONE}`,
      body: 'Bienvenido al Mundo Mágico de Doppler!',
      to: `whatsapp:+549${req.params.phoneTo}`
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

  twiml.message(`*¡Hola!* 👋\n\n *su mensaje es:* \n\n ${query.Body} \n\n  Gracias por escribirnos.\n\n *un miembro del equipo de Doppler te responderá pronto.*\n`);
  twiml.toString();
  twiml.message(`🌈  *visítanos!:*\n\n https://www.fromdoppler.com \n\n\n *muchas gracias.*`);
 
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});


app.get('*', function (req, res) {
  console.log('Hello World!')
  res.send('Hello World!');
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
  console.log('live port!' + PORT );
});
