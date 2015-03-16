var hamjest = require('hamjest');
for (var k in hamjest) {
  global[k] = hamjest[k];
}

var Lab = require('lab');
var lab = exports.lab = Lab.script();
var test = lab.test;
var experiment = lab.experiment;

var simple = {
  "Have you programmed before?" : [true,false],
  "For how many years?" : [[0,1],[1,2],[2,5],[5,10],[10,20]],
  "How interested are you in programming?" : [
    'somewhat interested', 'interested','very interested'],
};

lab.before(function(done) {
  console.log('before.');
  done();
});

lab.after(function(done) {
  console.log('after.');
  done();
});

experiment('REST API', function() {

  test('/survey route', function(done) {
      fail('empty test');
      done();
  });
});

