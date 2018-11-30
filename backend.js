let express = require('express');
let path = require('path');
let bodyparser = require('body-parser');
var mongoOp = require('./model/mongo');

let port = 8080;
let app = express();

// Required so that express can read POST data
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

//Serve static content
app.use(express.static("."));

// Simple test array to store appointments
// Will be substituted with database later but for now will suffice
let appointments = [];

app.route('/')
      .get((req, res) => {
        res.sendFile(path.join(__dirname + '/index.html'));
      })

app.route('/api/appointments')
      // GET REQUEST
      .get((req, res) => {
        //res.json(appointments);
        mongoOp.find({}, (err, data) => {
          if(!err) {
            res.json(data);
          }
          else {
            res.send("ERROR:" + err);
          }
        });
      })
      // POST REQUEST
      .post((req, res) => {
        console.log(req.body);
        var db = new mongoOp();
        db.name = req.body.title;
        db.haircut = req.body.haircut;
        db.deals = req.body.dealsOrService;
        db.addOns = req.body.additionalService;
        db.start = req.body.start;
        db.duration = req.body.appointmentDuration;
        db.end = req.body.end;
        db.key = req.body.key;
        db.save((err, appointment) => {
          if(err) {
            console.log("DB FAILED TO POST NEW APPOINTMENT");
            console.log(err);
            res.send(err);
            //next(err);
          }
          else {
            console.log("SUCCESSFULLY POSTED APPOINTMENT");
            res.send("SUCCESSFULLY POSTED APPOINTMENT");
            //res.send("Appointment Stored Successfully");
          }
        });
      })
      // DELETE REQUEST
      .delete((req, res) => {
        mongoOp.deleteOne({key: req.body.key}, (err)=> {
          if(err) {
            console.log("Error deleting key: " + req.body.key);
          }
          else {
            res.send("SUCCESSFULLY DELETED APPOINTMENT");
          }
        });
      })

app.listen(port, () => {
        console.log("Running backend");
      });
