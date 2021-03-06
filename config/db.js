require('dotenv').config()
const mongoose = require('mongoose');
// const config = require('config');
// const db = config.get('mongoURI')
const db = process.env.MONGO_URI

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    });

    console.log('MongoDB connected');
  } catch (err) {
    console.log('error is ', err.message);
    //exit process with failure
    process.exit(1);
  }
}
module.exports = connectDB; 