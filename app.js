const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParse = require("body-parser");
const vetRoutes = require("./src/routes/veterinaryRoute");
const userRoutes = require("./src/routes/userRoutes");
const productRoutes = require("./src/routes/productRoutes");
const notificationRoutes = require("./src/routes/notificationRoutes");
const chatRoutes = require("./src/routes/chatRoutes");

require("dotenv/config");

//Middlewares
app.use(bodyParse.json());
app.use(cors());

//routes
//app.use('/veterinary',vetRoutes)
app.use("/user", userRoutes);
app.use("/product", productRoutes);
app.use("/notification", notificationRoutes);
app.use("/chat", chatRoutes);

mongoose.connect(process.env.DB_CONNECTION, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

app.set("port", process.env.PORT || port);

app.get("/", (req, res) => {
  console.log("Hola");
  res.send("Hello World!");
});

app.listen(app.get("port"), () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
