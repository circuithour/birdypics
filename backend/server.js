const express = require('express');
const app = express();
const port = 80;
const bodyParser = require('body-parser');
const fs = require('fs');

require('dotenv').config()

if (!process.env.ADMIN_USERNAME || !process.env.ADMIN_PASSWORD) {
  console.error('ADMIN_USERNAME or ADMIN_PASSWORD not set in .env file.');
  process.exit(1);
}

// Serve static files from the "public" directory
app.use(express.static('../frontend/dist'));

// Parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: false }));

// Parse JSON bodies
app.use(bodyParser.json());

// Handle form submission
app.post('/subscribe', (req, res) => {
  const email = req.body.email;

  if (email) {
    // Save email to a JSON file
    fs.readFile('subscribers.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).json({ success: false });
        return;
      }

      const subscribers = JSON.parse(data);

      if (!subscribers.includes(email)) {
        subscribers.push(email);

        fs.writeFile('subscribers.json', JSON.stringify(subscribers), (err) => {
          if (err) {
            console.error(err);
            res.status(500).json({ success: false });
            return;
          }

          console.log(`Email ${email} subscribed successfully.`);
          res.status(200).json({ success: true });
        });
      } else {
        console.log(`Email ${email} is already subscribed.`);
        res.status(409).json({ success: false, error: 'already_subscribed' });
      }
    });
  } else {
    console.log('No email provided.');
    res.status(400).json({ success: false });
  }
});

// Handle admin login page
app.post('/adminlogin', (req, res) => {
  console.log(req.body)
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    console.log('No username or password provided.');
    res.status(400).json({ success: false });
    return;
  }

  if (username !== process.env.ADMIN_USERNAME || password !== process.env.ADMIN_PASSWORD) {
    console.log('Incorrect username or password.');
    res.status(401).json({ success: false });
    return;
  }


  console.log('Admin login successful.');
  res.status(200).json({ success: true });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
