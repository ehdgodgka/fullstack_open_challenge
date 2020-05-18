import React from "react";
import personService from "../components/services/person";
const PersonList = ({ persons, setPersons }) => {
  const deleteHandler = (index) => {
    if (window.confirm(`delete ${persons[index].name}?`)) {
      personService.remove(index + 1).then((response) => {
        setPersons(persons.filter((person, i) => i !== index));
      });
    }
  };
  return (
    <ul>
      {persons.map((person, index) => (
        <li key={person.name}>
          {person.name} {person.number}
          <button onClick={() => deleteHandler(index)}>delete</button>
        </li>
      ))}
    </ul>
  );
};

export default PersonList;
