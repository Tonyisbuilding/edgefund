const mongoose = require("mongoose");

const connectToDatabase = async (uri) => {
  try {
    const connect = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      ssl: true,
      tlsAllowInvalidCertificates: true,
    });
    console.log("connected to database");
  } catch (error) {
    console.log(`An error occured: ${error}`);
  }
};

module.exports = connectToDatabase;
