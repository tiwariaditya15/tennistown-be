const mongoose = require("mongoose");

async function connectToAtlas() {
  // mongoose.set("useCreateIndex", true);
  // mongoose
  //   .connect(process.env.CONNECTION_URL, {
  //     useUnifiedTopology: true,
  //     useNewUrlParser: true,
  //   })
  //   .then(() => {
  //     console.log("Connected to atlas.");
  //   })
  //   .catch((err) => {
  //     if (err.code === "ECONNREFUSED") {
  //       console.log("Internet Connection not found.");
  //     }
  //   });
}

module.exports = { connectToAtlas };
