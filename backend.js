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
        //mongoOp.find({}, {"sort": ['start', 'asc']}, (err, data) => {
        mongoOp.find().sort({"start":1}).exec((err, data) => {
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
        db.name = req.body.name;
        db.haircut = req.body.haircut;
        db.deals = req.body.deals;
        db.addOns = req.body.addOns;
        db.start = req.body.start;
        db.duration = req.body.duration;
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
        console.log("RECEIVED DELETE REQUEST FOR KEY: " + req.body.key);
        mongoOp.deleteOne({key: req.body.key}, (err)=> {
          if(err) {
            console.log("Error deleting key: " + req.body.key);
            res.send("DELETE REQUEST ENCOUNTERED ERROR");
          }
          else {
            res.send("SUCCESSFULLY DELETED APPOINTMENT");
          }
        });
      })
      // PUT REQUEST
      .put((req, res) => {
        console.log("RECEIVED PUT REQUEST FOR KEY: " + req.body.key);
        try {
          mongoOp.updateOne(
            { key: req.body.key }, 
            { 
              name: req.body.name, 
              haircut: req.body.haircut, 
              deals: req.body.deals,
              addOns: req.body.addOns,
              start: req.body.start,
              end: req.body.end,
              duration: req.body.duration
            }).then(
              (data) => res.send("UPDATE SUCCESSFUL")
            )
        } catch (e) {
          console.log("ERROR WHEN UPDATING KEY: " + req.body.key);
          res.send("ENCOUNTERED ERROR DURING UPDATE");
        }
      })

app.listen(port, () => {
        console.log("Running backend");
      });
