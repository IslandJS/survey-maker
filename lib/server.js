/*
 * Survey Maker Rest API
 *
 * awaterma@awaterma.net
 */

var pkg = require('../package.json');
var restify = require('restify');
var api = require('./api.js');
var bunyan = require('bunyan');
var log = bunyan.createLogger({name: 'server.js', stream: process.stdout });

var server = restify.createServer({
  name: pkg.name,
  version: pkg.version,
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.fullResponse());

server.on('after', restify.auditLogger({
  log: bunyan.createLogger({
    name: 'audit',
    stream: process.stdout
  })
}));

server.get('/results/:Experiment', function(req, res, next) {
   var experiment = req.params.Experiment
   try {
     var results = api.results(experiment);
     res.status(200);
     res.send(JSON.stringify(results));
   } catch (exception) {
     log.warn(exception);
     res.status(500);
   }
   return next();
});

server.post('/survey/:Experiment', function(req, res, next) {
  try {
    var experiment = req.params.Experiment;
    var results = req.body;
    if (typeof (req.body) != 'object')
      results = JSON.parse(req.body);
    var survey = {}
    if (results['Survey'] != null) {
      survey = api.find(results['Survey']);
      if (survey == null || survey == undefined) {
        log.info("Unable to find requested survey! ["  + results['Survey'] + "]");
        throw "Survey [" + results['Survey'] + "] not found!";
      }
      delete(results['Survey']);
    }
    res.setHeader('Access-Control-Allow-Origin','*');
    api.take(experiment, survey, results);
    res.status(201);
    res.send('Ok.');
  } catch (exception) {
    log.warn(exception);
    res.status(500);
  }
  return next();
});

server.listen(3000, function () {
   console.log('%s:%s listening at %s', server.name, server.versions, server.url);
   console.log('routes: /results/:var, /survey/:var');
});

module.exports = server;
