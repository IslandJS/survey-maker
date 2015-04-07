/*
 * Survey Maker Rest API
 *
 * awaterma@awaterma.net
 */

var pkg = require('../package.json');
var restify = require('restify');
var api = require('./api.js');

var local = true;

var server = restify.createServer({
  name: pkg.name,
  version: pkg.version,
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.fullResponse());

server.get('/results/:Experiment', function(req, res, next) {
   var experiment = req.params.Experiment
   res.status(200);
   res.send(JSON.stringify(api.results(experiment)));
   return next();
});

if (local) {
  server.post('/survey/:Experiment', function(req, res, next) {
    var experiment = req.params.Experiment;
    var results = req.body;
    if (typeof (req.body) != 'object')
      results = JSON.parse(req.body);
    var survey = {}
    if (results['Survey'] != null) {
      survey = api.find(results['Survey']);
      delete(results['Survey']);
    }
    res.setHeader('Access-Control-Allow-Origin','*');
    try {
      api.take(experiment, survey, results);
      res.status(201);
      res.send('Ok.');
    } catch (exception) {
      res.status(500);
      console.log(exception);
      res.send ();
    }
    return next();
  });
}

server.listen(3000, function () {
   console.log('%s:%s listening at %s', server.name, server.versions, server.url);
   console.log('routes: /results/:var, /survey/:var');
});

module.exports = server;
