'use strict';

exports = module.exports = function(app, mongoose) {
  var projectSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    project_name: String,
    project_folder: String,
    project_description: String,
    isActive: String,
    timeCreated: { type: Date, default: Date.now }
  });

  projectSchema.plugin(require('./plugins/pagedFind'));
  projectSchema.set('autoIndex', (app.get('env') === 'development'));
  app.db.model('Project', projectSchema);
};
