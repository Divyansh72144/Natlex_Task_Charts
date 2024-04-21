const mongoose = require("mongoose");
require("dotenv").config();

mongoose.set("strictQuery", false);

const url = process.env.MONGODB_URI;

mongoose
  .connect(url)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const chartSchema = new mongoose.Schema({
    seriesTitle: String,
    xAxisName: String,
    values: String,
    title: String,
    data: [Number], 
    dates: [String], 
    color: String
});

chartSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Chart", chartSchema);
