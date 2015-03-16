/*
 * Survey Maker Rest API
 *
 * awaterma@awaterma.net
 */

var pkg = require('./package.json');
var restify = require('restify');
var api = require('./lib/api.js');

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

server.post('/survey/:experiment', function(req, res, next) {
   var experiment = req.params.experiment;
   var survey = JSON.parse(req.body.survey);
   var result = JSON.parse(req.body.result);

   res.send(JSON.stringify(api.take(experiment, survey, answer)));
   return next();
});

server.listen(8080, function () {
   console.log('%s:%s listening at %s', server.name, server.versions, server.url);
   console.log('routes: /results/:var, /survey/:var');
   console.log('ACCEPT: %s', server.acceptable);
});

