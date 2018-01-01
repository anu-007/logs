var mongoose = require('mongoose');

var LogSchema = mongoose.Schema({
  log: String,
  //date: {type: Date, "default": new Date()}
});

var Log = module.exports = mongoose.model('Log', LogSchema);
