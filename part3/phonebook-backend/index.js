require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const marked = require('marked');

const Person = require('./models/person');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('build'));

morgan.token('data', (req, res) => {
  if (Object.keys(req.body).length) {
    return JSON.stringify(req.body);
  }
  return null;
});

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :data')
);

app.get('/api/persons', async (req, res) => {
  const persons = await Person.find({});
  res.json(persons);
});

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => (person ? res.json(person) : res.status(404).end()))
    .catch((error) => next(error));
});

app.put('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  })
    .then((updatedResult) => res.json(updatedResult))
    .catch((error) => next(error));
});

app.post('/api/persons', (req, res, next) => {
  const { name, number } = req.body;
  if (!name || !number) {
    name || next({ name: 'ValidationError', message: 'name is missing' });
    number || next({ name: 'ValidationError', message: 'number is missing' });
  }

  const newPerson = new Person({ name, number });
  newPerson
    .save()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => next(error));
});

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then((result) => {
      res.status(204).end();
    })
    .catch((error) => next(error));
});
app.get('/readme', function (req, res) {
  var readmePath = path.join(__dirname, '/README.md');
  var file = fs.readFileSync(readmePath, 'utf8');
  res.send(marked(file.toString()));
});

app.get('/info', async (req, res) => {
  const number = await Person.estimatedDocumentCount();
  const time = new Date().toString();
  res.send(
    `<div>Phonebook has info for ${number} people</div> <div>${time}</div>`
  );
});

const errorHandler = (error, req, res, next) => {
  switch (error.name) {
    case 'ValidationError':
      res.status(400).json({ name: error.name, message: error.message });
      break;
    default:
      res.status(400).json({ name: 'error', message: 'error' });
  }
};
app.use(errorHandler);
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
