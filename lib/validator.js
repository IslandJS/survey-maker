var _ = require('underscore');
var bunyan = require('bunyan');
var log = bunyan.createLogger({name: 'validator.js', stream: process.stdout });

function reduce(arr) {
  for (var k in arr) {
    if (arr[k] instanceof Array) return reduce(arr[k]);
    return arr[k];
  }
}

module.exports = {
  validate: function(survey, answers) {
    console.assert(survey != null  && survey != undefined, 'Null survey!');
    console.assert(answers != null && answers != undefined, 'Null answers!');
    for (k in survey) {
      if (answers[k] == null || survey[k] == null)
        continue;
      var acceptable = survey[k];
      var answer = answers[k];
      try {
        if (answer instanceof Array) {
          if (!acceptable instanceof Array) throw "Incomparable fields!";
          answer.forEach(function(test) {
            console.assert(_.contains(acceptable, test), acceptable + ' not in ' + test);
          })
        } else if (typeof(acceptable) == 'object') {
          var example = reduce(acceptable);
          console.assert(typeof(example) == typeof(answer), example + ' not typeof ' + answer);
        } else {
          console.assert(typeof(acceptable) == typeof(answer), acceptable = ' not typeof ' + answer);
        }
      } catch (exception) {
        log.warn(exception);
        throw exception;
      }
    }
    return true;
  }
}
