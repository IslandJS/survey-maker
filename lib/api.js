var v = require('./validator.js');
var low = require('lowdb');
low.mixin(require('underscore-db'))
var db = low('survey.json', {
    autoSave: true});

module.exports = {
  register : function(name, survey) {
    return db(name).insert(survey);
  },

  find : function(name) {
    var result = db(name).first();
    if (!result)
      throw "Result not found!";
    return result;
  },

  take : function(experiment_name, survey, answers) {
    var experiment = db(experiment_name);
    v.validate(survey, answers);
    experiment.insert(answers);
    db.save();
  },

  results : function(experiment_name, survey) {
    var result = db(experiment_name);
    if (!result) {
      throw "Result not found!";
    }
    return result.value();
  }
}
