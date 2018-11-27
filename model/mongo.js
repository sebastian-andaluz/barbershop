var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/appointments');

mongoSchema = mongoose.Schema;
var appointmentSchema = {
  "name": String,
  "haircut": String,
  "deals":  String,
  "addOns": String,
  "start": Date,
  "duration": Number,
  "end": Date,
  "key": String
}
module.exports = mongoose.model('appointments', appointmentSchema);
