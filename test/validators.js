var hamjest = require('hamjest');
for (var k in hamjest) {
    global[k] = hamjest[k];
}

var Lab = require('lab');
var lab = exports.lab = Lab.script();
var test = lab.test;
var experiment = lab.experiment;
var validator = require('../lib/validator.js');

experiment('you can validate answers ...', function() {

  var simple = {
    "Programmed" : [true,false],
    "Years" : 0,
    "Interested" : [
      'somewhat interested', 'interested','very interested'],
    };

    test('that are correct', function(done) {
      var answers = [
        { Programmed: true, Years: 20, Interested: 'very interested'},
        { Programmed: true, Years: 15, Interested: 'somewhat interested'},
        { Programmed: false, Years: 0, Interested: 'interested'}
      ];

      answers.forEach(function(answer) {
        debugger;
        var result = validator.validate(simple, answer);

        assertThat(result, is(true));
      })
      done();
    });
    test('and catch those that are incorrect', function (done) {
      var answers = [
        { Programmed : 20, Years: 'very', Interested: true}
      ];

      answers.forEach(function(answer) {
        try {
          var result = validator.validate(simple, answer);
          fail('Validator should throw assertion errors!');
        } catch (AssertionError) {
        }
      })
      done();
    });
  });
