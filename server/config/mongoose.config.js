const mongoose = require("mongoose");

mongoose
  .connect(`mongodb://localhost/${process.env.DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`you are connected to the database ${process.env.DB_NAME}`);
  })
  .catch((err) => {
    console.log(
      `you are not connected to the database ${process.env.DB_NAME}`,
      err
    );
  });
