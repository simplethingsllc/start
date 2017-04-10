const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const Mailchimp = require('mailchimp-api-v3');

app.use(bodyParser.json());
app.set('port', (process.env.PORT || 3001));

const isProd = process.env.NODE_ENV === 'production';
console.log('Starting prod =', isProd);
if (isProd) {
  app.use(express.static('client/build'));
}

const mailApi = new Mailchimp('83ffb81bbb5be6a9198f77892e614f85-us14');

app.post('/api/join', (req, res) => {
  const { email = '', name = '', company = '' } = req.body;
  console.log(email, name, company);
  if (email.split('@').length !== 2) {
    res.status(400).send({ status: 400 });
    return;
  }

  let firstName = name;
  let lastName = '';
  const split = name.trim().indexOf(' ');
  if (split > 0) {
    firstName = name.substring(0, split);
    lastName = name.substring(split);
  }

  const body = {
    email_address: email,
    status: 'subscribed',
    merge_fields: {
      FNAME: firstName,
      LNAME: lastName,
      CNAME: company,
    },
  };
  if (isProd) {
    mailApi.post('lists/3f0a35ceac/members', body).then(() => {
      console.log('Success');
    }).catch((e) => {
      console.error('Failed');
    });
  }

  const resp = {};
  res.json(resp);
});

app.listen(app.get('port'), () => {
  console.log(`Server started at http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
