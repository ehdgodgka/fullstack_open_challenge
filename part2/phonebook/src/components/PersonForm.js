import React, { useState } from "react";
import personService from "../components/services/person";
const PersonForm = ({ persons, setPersons }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const nameInputHandler = (event) => {
    setNewName(event.target.value);
  };

  const numberInputHandler = (event) => {
    setNewNumber(event.target.value);
  };

  const addInfo = (event) => {
    event.preventDefault();
    const newInfo = { name: newName, number: newNumber };
    if (nameOf()) {
      if (window.confirm(`${newName} already existed. do you want to update?`)) {
        const id = persons.indexOf(nameOf()) + 1;
        personService.update(id, newInfo).then((response) => {
          setPersons(persons.map((person) => (person.name === newName ? newInfo : person)));
        });
      }
    } else {
      personService.create(newInfo).then((response) => {
        setPersons(persons.concat(response.data));
      });
    }
  };
  const nameOf = () => persons.find((person) => person.name === newName);
  return (
    <form onSubmit={addInfo}>
      <div>
        name:
        <input value={newName} onChange={nameInputHandler} />
      </div>
      <div>
        number: <input value={newNumber} onChange={numberInputHandler} />
      </div>
      <div>
        <button type='submit'>add</button>
      </div>
    </form>
  );
};

export default PersonForm;
