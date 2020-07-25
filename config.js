require('dotenv').config()
const mongoose = require('mongoose');

const url = process.env.url;

//Db configuration
const connectDB = async () => {
    await mongoose.connect(url,
        { useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true,
        }
        );
    console.log("Db connected successfully:");
}

module.exports = connectDB;
    