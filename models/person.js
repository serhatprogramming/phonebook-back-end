const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const url = process.env.MONGODB_URI;

console.log("Connecting to DB");

mongoose
  .connect(url)
  .then((result) => {
    console.log("Connected to Phone Book Database.");
  })
  .catch((e) => {
    console.log("error connecting to Phone Book Database", e.message);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },

  number: {
    type: String,
    validate: {
      validator: function (v) {
        return /^\d{8}\d*$|^\d{2,3}-\d{6}\d*$/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
    required: [true, "User phone number required"],
  },
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
