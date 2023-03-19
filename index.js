require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const Person = require("./models/person");

app.get("/api/persons", (req, res) => {
  Person.find({}).then((people) => {
    res.json(people);
  });
});

app.post("/api/persons", (req, res) => {
  const body = req.body;

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((result) => {
    console.log("added", result.name, result.number, "to phonebook");
    res.json(person);
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`The server is listening on port ${PORT}`));
