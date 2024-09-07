const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Log the MONGO_URI and options
    console.log("Connecting to MongoDB with URI:", process.env.MONGO_URI);

    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`error in mongodb ${error.message}`);
    process.exit();
  }
};

module.exports = connectDB;
