var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

//mongoose.connect('mongodb://localhost/logs_database');
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());

var log = mongoose.model('log', {
    text : String
});

app.get('/api/logs', function(req, res) {
    Todo.find(function(err, logs) {
        if (err)
            res.send(err)

        res.json(logs);
    });
});

app.post('/api/logs', function(req, res) {

    Log.create({
        text : req.body.text,
        done : false
    }, function(err, log) {
        if (err)
            res.send(err);

        Log.find(function(err, logs) {
            if (err)
                res.send(err)
            res.json(logs);
        });
    });
});

app.get('*', function(req, res) {
    res.sendfile('./public/index.html');
});

app.listen(8080);
console.log("App listening on port 8080");
