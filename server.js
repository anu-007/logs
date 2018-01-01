var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var Log = require('./logs');

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());

mongoose.connect('mongodb://localhost/logsdb');

mongoose.connection.on('connected',()=>{
  console.log('connected to database');
});

mongoose.connection.on('error',(err)=>{
  if(err)
  {
    console.log('error in connection'+err);
  }
});

app.get('/api/logs', function(req, res) {
    Log.find(function(err, logs) {
        if (err)
            res.send(err)

        res.json(logs);
    });
});

app.post('/api/logs', function(req, res) {

    let newLog = new Log({
      log : req.body.text
    });

    newLog.save((err, log)=>{
      if (err)
          res.send(err);
      else
          res.json({msg: 'log added successfully'});
    });
    /*Log.create({
        log : req.body.text
    }, function(err, log) {
        if (err)
            res.send(err);
        else {
            res.json({msg: 'log added successfully'});
        }

        Log.find(function(err, logs) {
            if (err)
                res.send(err);
            res.json(logs);
        });
    });*/
});

app.get('*', function(req, res) {
    res.sendfile('./public/index.html');
});

app.listen(8080);
console.log("App listening on port 8080");
