const express = require("express");
const { connectToAtlas } = require("./db/db.connect.js");
const productRouter = require("./routes/products.router.js");

const app = express();

app.use(express.json());
app.use("/products", productRouter);

app.use("/", (req, res) => {
  res.send({ success: true, route: "/" });
});

connectToAtlas(app);
