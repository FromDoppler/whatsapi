var express = require('express');
require('dotenv').config();
var app = express();

  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = require('twilio')(accountSid, authToken);
  const MessagingResponse = require('twilio').twiml.MessagingResponse;
  
/*   console.log("#########################");
  console.log(accountSid);
  console.log(authToken);
  console.log("#########################"); */

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
  const query = escape(req.Body);
  twiml.message(`*su mensaje es:* \n\n${query}\n\n *muchas gracias.* \n\n\n🌈  *visítanos!:* https://www.fromdoppler.com`);
 
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});

app.listen(3000, function () {
  console.log('live port 3000!');
});