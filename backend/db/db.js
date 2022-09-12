const mongoose = require("mongoose");

mongoose
  .connect(
    process.env.MongoDBCOneectionString
  )
  .then(
    () => {
      console.log("DB connected");
    },
    (err) => {
      console.log(err);
    }
  );
