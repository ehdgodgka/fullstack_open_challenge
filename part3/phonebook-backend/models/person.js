const mongoose = require("mongoose");

const url = process.env.DB_URL;

mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then((result) => console.log("db connected"))
  .catch((error) => console.log("db connection error"));

const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  number: { type: String, required: true },
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
