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
    return db(name).first();
  },

  take : function(experiment_name, survey, answers) {
    var experiment = db(experiment_name);
    v.validate(survey, answers);
    experiment.insert(answers);
    db.save();
  },

  results : function(experiment_name, survey) {
    return db(experiment_name).value();
  }

}
