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
          "Have you programmed before?" : [true,false],
        "For how many years?" : [[0,1],[1,2],[3,5],[5,10],[10,20]],
        "How interested are you in programming?" : [
          'somewhat interested', 'interested','very interested'],
      };

    var answers = [
      [true, 20, 'very interested'], [false, 0, 'interested'],[true, 2, 'somewhat interested']
    ];

    test('with a basic response', function(done) {
      var result = validator.validate('experiment 1', simple, answers);

      assertThat(result, is(true));
      done();
    });
});
