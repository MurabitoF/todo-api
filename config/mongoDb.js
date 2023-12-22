const mongoose = require('mongoose');

async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('conected to MongoDb');
  } catch (err) {
    console.log('Error connecting to MongoDB:', err);
  }
}

module.exports = connect;
