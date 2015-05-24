var Lab = require('lab');
var lab = exports.lab = Lab.script();
var pkg = require('../package.json');
var server = require('../lib/server.js')(pkg.options.port);
var hippie = require('hippie');

var test = lab.test;
var experiment = lab.experiment;

lab.before(function(done) {
  var api = require('../lib/api.js');
  var survey = {
      Name : "string",
      Email : "string",
      Volunteering : [true, false],
      Interests : "string",
      Program : [true,false],
      Years : [ 0,1,2,3,4,5,6,7,8,9,10 ],
      Languages : ['blockly','html','javascript','java','cpp','c','lisp','haskell','perl','ruby','python']
  }
  api.register('NodeSchool', survey);
  done();
});

experiment('REST API', function() {
  test('/survey', function(done) {
    hippie(server)
      .expectStatus(201)
      .post('/survey/rest-test')
      .form()
      .json()
      .header('Content-Type', 'application/json')
      .send(
        {
          Survey : 'NodeSchool',
          Name : 'Test' ,
          Email : 'test@email.test',
          Volunteering : true,
          Interests : 'Helping others.',
          Program : true,
          Years : 10,
          Languages : ['blockly','java','javascript','c','cpp']
      })
      .end(function (err, res, body) {
        if (err) throw err;
        done();
      })
  });

  test('/results', function(done) {
    hippie(server)
      .json()
      .expectStatus(200)
      .get('/results/rest-test')
      .end(function(err, res, body) {
        if (err) throw err;
        done();
      });
  });
});
