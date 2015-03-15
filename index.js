var pkg = require('./package.json');
var os = require('os');
var restify = require('restify');

var server = restify.createServer({
  name: pkg.name,
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.get('/echo/:name', function (req, res, next) {
      res.send(req.params);
        return next();
});

debugger;
server.listen(8080, function () {
      console.log('%s:%s listening at %s', server.name, server.versions, server.url);
});
