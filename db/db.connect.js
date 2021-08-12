const mongoose = require("mongoose");

function connectToAtlas(app) {
  mongoose.set("useCreateIndex", true);
  mongoose
    .connect(process.env.CONNECTION_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then(() => {
      console.log("Connected to atlas.");
      app.listen(process.env.PORT, () => console.log("Server up on 5000."));
    })
    .catch((err) => {
      if (err.code === "ECONNREFUSED") {
        console.log("Internet Connection not found.");
      }
    });
}

module.exports = { connectToAtlas };
