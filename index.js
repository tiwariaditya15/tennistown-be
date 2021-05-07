const express = require("express");
const cors = require("cors");
const { connectToAtlas } = require("./db/db.connect.js");
const productRouter = require("./routes/products.router.js");
const authenticationRouter = require("./routes/authentication.router.js");
const app = express();

app.use(express.json());
app.use(cors());
app.use("/products", productRouter);
app.use("/accounts", authenticationRouter);

app.use("/", (req, res) => {
  res.send({ success: true, route: "/" });
});

connectToAtlas(app);
