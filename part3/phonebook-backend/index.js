const express = require("express");
const morgan = require("morgan");
const app = express();
app.use(express.json());
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
morgan.token("data", function (req, res) {
  if (Object.keys(req.body).length) {
    return JSON.stringify(req.body);
  }
  return " ";
});


app.use(morgan(":method :url :status :res[content-length] - :response-time ms :data"));

app.get("/api/persons", (req, res) => {
  res.json(persons);
});
const isNameUnique = (name) => {
  return !!!persons.find((person) => name === person.name);
};

app.post("/api/persons", (req, res) => {
  // console.log("here");
  const person = req.body;
  if (!person.name || !person.number) {
    person.name || res.status(400).json({ error: "name is missing" });
    person.number || res.status(400).json({ error: "number is missing" });
    return;
  }
  if (!isNameUnique(person.name)) {
    res.status(400).json({ error: "name must be unique" });
    return;
  }
  const newPerson = { ...person, id: Math.floor(Math.random() * 10000) + 1 };
  persons = persons.concat(newPerson);
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

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    persons = persons.filter((person) => person.id !== id);
    res.status(204).end();
  } else {
    res.status(204).end();
  }
});

app.get("/info", (req, res) => {
  const number = persons.length;
  const time = new Date().toString();
  res.send(`<div>Phonebook has info for ${number} people</div> <div>${time}</div>`);
});
const port = 3001;
app.listen(port);
console.log(`Server running on port ${port}`);
