require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectToAtlas } = require("./db/db.connect.js");
const productRouter = require("./routes/products.router.js");
const authenticationRouter = require("./routes/authentication.router.js");
const cartRouter = require("./routes/cart.router.js");
const wishlistsRouter = require("./routes/wishlists.router.js");
const routeNotFound = require("./middlewares/route-not-found.middleware.js");
const errorHandler = require("./middlewares/error-handler.middleware.js");
const verifyToken = require("./middlewares/verifyToken.middleware");
const getWishlistsByUserId = require("./middlewares/getWishlistsByUserId.middleware");
const getCartByUserId = require("./middlewares/getCartByUserId.middleware.js");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/products", productRouter);
app.use("/accounts", authenticationRouter);
app.use(verifyToken);
app.use("/wishlists", getWishlistsByUserId, wishlistsRouter);
app.use("/cart", getCartByUserId, cartRouter);

app.use("/", (req, res) => {
  res.send({
    success: true,
    route: "/",
    message: "No routes matched. This is default handler.",
  });
});

app.use(errorHandler);
app.use(routeNotFound);

connectToAtlas(app);

app.listen(process.env.PORT || 5000, () => console.log("Server up on 5000."));
