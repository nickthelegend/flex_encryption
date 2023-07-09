const express = require('express');
const { encrypt, CardTypes } = require('cs2-encryption');
const app = express();

app.use(express.json());

app.post('/encrypt', (req, res) => {
  const { number, securityCode, expirationMonth, expirationYear, type, context } = req.body;

  const data = {
    number,
    securityCode,
    expirationMonth,
    expirationYear,
    type: CardTypes[type],
  };

  encrypt(data, context)
    .then(encrypted => {
      res.json({ encrypted });
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: 'Encryption failed' });
    });
});


const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
