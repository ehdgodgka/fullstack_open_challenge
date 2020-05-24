require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const fs = require("fs");
const marked = require("marked");

const Person = require("./models/person");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("build"));

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1,
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2,
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3,
  },
];
morgan.token("data", (req, res) => {
  if (Object.keys(req.body).length) {
    return JSON.stringify(req.body);
  }
  return null;
});

app.use(morgan(":method :url :status :res[content-length] - :response-time ms :data"));

app.get("/info", function (req, res) {
  var readmePath = __dirname + "/README.md";
  var file = fs.readFileSync(readmePath, "utf8");
  res.send(marked(file.toString()));
});

app.get("/api/persons", async (req, res) => {
  const persons = await Person.find({});
  res.json(persons);
});
// const isNameUnique = (name) => {
//   return !!!persons.find((person) => name === person.name);
// };

app.post("/api/persons", (req, res) => {
  const { name, number } = req.body;
  if (!name || !number) {
    name || res.status(400).json({ error: "name is missing" });
    number || res.status(400).json({ error: "number is missing" });
    return;
  }
  // if (!isNameUnique(person.name)) {
  //   res.status(400).json({ error: "name must be unique" });
  //   return;
  // }
  const newPerson = new Person({ name, number });
  newPerson
    .save()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => console.log("save person error"));
});

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const person = persons.find((person) => person.id == id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.delete("/api/persons/:id", (req, res, next) => {
  // const id = Number(req.params.id);
  // const person = persons.find((person) => person.id === id);
  // if (person) {
  //   persons = persons.filter((person) => person.id !== id);
  //   res.status(204).end();
  // } else {
  //   res.status(204).end();
  // }
  Person.findByIdAndRemove(req.param.id)
    .then((result) => {
      res.status(204).end();
    })
    .catch((error) => next(error));
});

app.get("/info", (req, res) => {
  const number = persons.length;
  const time = new Date().toString();
  res.send(`<div>Phonebook has info for ${number} people</div> <div>${time}</div>`);
});

const errorHandler=(error,req,res,next)=>{
  console.log(error);
  res.status(400)
}
app.use(errorHandler);
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
