const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

// Initialize the invalid request count.
let invalidRequestCount = 0;

// Task 1: Create a route for the signup page with a POST endpoint to receive user details.
app.get('/signup', (req, res) => {
  // If the request method is GET, return the signup form.
  res.send(`
    <html>
      <head>
        <title>Signup</title>
      </head>
      <body>
        <h1>Signup</h1>
        <form action="/signup" method="post">
          <label for="name">Name:</label>
          <input type="text" id="name" name="name" required>

          <label for="gender">Gender:</label>
          <select id="gender" name="gender" required>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          <label for="age">Age:</label>
          <input type="number" id="age" name="age" min="0" max="120" required>

          <button type="submit">Signup</button>
        </form>
      </body>
    </html>
  `);
});

app.post('/signup', (req, res) => {
  // If the request method is POST, save the user data to the users.txt file.
  const { name, gender, age } = req.body;
  fs.appendFile('users.txt', `${name},${gender},${age}\n`, (err) => {
    if (err) throw err;
    res.send('Signup successful!');
  });
});

// Task 2: If the request method is invalid for the signup route, return an error message with the count of invalid requests.
app.get('/signup', (req, res) => {
  if (req.method !== 'GET') {
    res.send(`
      <html>
        <head>
          <title>Invalid request method</title>
        </head>
        <body>
          <h1>Invalid request method - ${++invalidRequestCount}</h1>
        </body>
      </html>
    `);
  }
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});