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

server.get('/results/:experiment', function(req, res, next) {
   var experiment = req.params.experiment
   res.send(JSON.stringify(api.results(experiment)));
   return next();
});

if (local) {
  server.post('/survey/:experiment', function(req, res, next) {
    var experiment = req.params.experiment;
    var survey = {}; //req.params.survey;
    var results = {};
    for (k in req.params) {
      if (k === 'experiment' || k === 'survey')
        continue;
      debugger;
      results[k] = req.params[k];
    }
    res.setHeader('Access-Control-Allow-Origin','*');
    try {
      res.send(JSON.stringify(api.take(experiment, survey, results)));
    } catch (exception) {
      res.status(500);
      res.send ('Error:' + exception)
    }
    return next();
  });
}

server.listen(3000, function () {
   console.log('%s:%s listening at %s', server.name, server.versions, server.url);
   console.log('routes: /results/:var, /survey/:var');
   console.log('ACCEPT: %s', server.acceptable);
});

module.exports = server;
