require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
//55.56

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

//configuring the server to accept and update cookies and it helps us decode the content of daid cookies
app.use(cookieParser());

require("./config/mongoose.config");
require("./routes/user.routes")(app);
require("./routes/game.routes")(app);

app.listen(process.env.MY_PORT, () =>
  console.log(`connected to port ${process.env.MY_PORT}`)
);
