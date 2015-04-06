var hamjest = require('hamjest');
for (var k in hamjest) {
  global[k] = hamjest[k];
}

var Lab = require('lab');
var lab = exports.lab = Lab.script();
var test = lab.test;
var experiment = lab.experiment;
var maker = require('../lib/api.js');

var simple = {
  "Have you programmed before?" : [true,false],
  "For how many years?" : [[0,1],[1,2],[2,5],[5,10],[10,20]],
  "How interested are you in programming?" : [
    'somewhat interested', 'interested','very interested'],
};

experiment('you can create surveys ... ', function() {

  test('from something simple', function(done) {
    maker.register("simple", simple);
    var stored = maker.find("simple");
    delete (simple.id);
    delete (stored.id);

    assertThat(stored, hasProperties(simple));
    done();
  });
});

experiment('and take them ...', function() {
  test('such as a simple survey with one answer', function(done) {
    maker.register("simple", simple);
    var survey = maker.find("simple");
    var answer = [true, 1, 'very interested'];

    maker.take("unit-test", survey, answer);
    var results = maker.results("unit-test");

    assertThat(results, hasItems(answer));
    done();
  });
});
