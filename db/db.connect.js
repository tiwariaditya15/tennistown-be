const mongoose = require("mongoose");

async function connectToAtlas() {
  mongoose.set("useCreateIndex", true);
  return mongoose.connect(process.env.CONNECTION_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
}

module.exports = { connectToAtlas };
