const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  completed: { type: Boolean, default: false },
});

taskSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    return returnedObject;
  },
});

module.exports = mongoose.model('Task', taskSchema);
