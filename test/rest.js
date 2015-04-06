var Lab = require('lab');
var lab = exports.lab = Lab.script();
var server = require('../lib/server.js');
var hippie = require('hippie');

var test = lab.test;
var experiment = lab.experiment;

experiment('REST API', function() {
  test('/survey', function(done) {
    hippie(server)
      .expectStatus(200)
      .post('/survey/rest-test')
      .form()
      .json()
      .send({
        Name : 'Test' ,
        Email : 'test@email.test',
        Volunteering : 'true',
        Interests : 'Helping others.',
        Program : 'true',
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
      .get('/results/simple')
      .end(function(err, res, body) {
        if (err) throw err;
        done();
      });
  });
});
