const express = require('express');
const app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.json());

app.set('port', (process.env.PORT || 3001));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.post('/api/join', (req, res) => {
  const { email } = req.body;
  console.log('email', email);
  const resp = { email };
  res.json(resp);
});

app.listen(app.get('port'), () => {
  console.log(`Server started at http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
