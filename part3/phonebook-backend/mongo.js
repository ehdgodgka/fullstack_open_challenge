const mongoose = require('mongoose');

if (process.argv.length < 5) {
  console.log(
    'Please proceed program in following form: node mongo.js <password> <name> <number>'
  );
  process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://fsoPhonebookUser:${password}@fullstackopenphonebook-zkpl7.mongodb.net/phonebook?retryWrites=true&w=majority
`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  number: { type: String, required: true }
});

const Person = mongoose.model('Person', personSchema);

const person = new Person({
  name: name,
  number: number
});

person.save().then((result) => {
  console.log(`added ${name} number ${number}to phonebook`);
  Person.find().then((people) =>
    people.forEach((person) => {
      console.log(person.name, person.number);
      mongoose.connection.close();
    })
  );
});
