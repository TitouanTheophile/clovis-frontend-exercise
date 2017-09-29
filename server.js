var express = require('express');
var winston = require('winston');
var data = require('./data');
var _ = require('lodash');
var app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.get('/api/projects', (req, res) => {
  res.json(_.map(data, (project) => {
    return { id: project.id, name: project.name, image: project.image };
  }));
});

app.get('/api/projects/:id', (req, res) => {
  res.json(_.find(data, (e) => e.id === parseInt(req.params.id)));
});

app.use(function(req, res, next) {
  res.status(404).send('Sorry cant find that!');
});

var port = process.env.PORT || 1337;

app.listen(port, () => {
  winston.info('App running on port ' + port + ' o//');
});
