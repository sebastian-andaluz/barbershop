let express = require('express');
let path = require('path');
let bodyparser = require('body-parser');

let port = 8080;
let app = express();

// Required so that express can read POST data
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

// Simple test array to store appointments
// Will be substituted with database later but for now will suffice
let appointments = [];

app.route('/')
      .get((req, res) => {
        res.sendFile(path.join(__dirname + '/index.html'));
      })

app.route('/appointments')
      // GET REQUEST
      .get((req, res) => {
        res.json(appointments);
      })
      // POST REQUEST
      .post((req, res) => {
        appointments.push(req.body);
        res.send("Added " + req.body);
      })

app.listen(port, () => {
        console.log("Running backend");
      });
