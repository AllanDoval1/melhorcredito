import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import twilio from 'twilio';

dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

const authToken = process.env.TWILIO_AUTH_TOKEN;

app.post('/whatsapp/webhook', (req, res) => {
  const signature = req.headers['x-twilio-signature'];
  const url = process.env.PUBLIC_URL
    ? `${process.env.PUBLIC_URL}/whatsapp/webhook`
    : `${req.protocol}://${req.get('host')}${req.originalUrl}`;

  const isValid = twilio.validateRequest(authToken, signature, url, req.body);
  if (!isValid) {
    return res.status(403).send('Invalid signature');
  }

  console.log(`[${new Date().toISOString()}]`, req.body);

  const twiml = new twilio.twiml.MessagingResponse();
  twiml.message('Mensagem Recebida');

  res.type('text/xml');
  res.send(twiml.toString());
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
