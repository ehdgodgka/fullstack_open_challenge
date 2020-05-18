import React from "react";
import personService from "../components/services/person";
const PersonList = ({ persons, setPersons, setNotification,notiTimer,setNotiTimer }) => {
  const deleteHandler = ({ id, name }) => {
    if (window.confirm(`delete ${name}?`)) {
      personService
        .remove(id)
        .then((response) => {
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch((error) => {
          if (notiTimer) {
            clearTimeout(notiTimer);
          }
          setNotiTimer(setTimeout(() => setNotification({}), 3000));
          setNotification({ style: "error", message: `${name}' was already removed from server` });
          setPersons(persons.filter((person) => person.id !== id));
        });
    }
  };
  return (
    <ul>
      {persons.map((person) => (
        <li key={person.name}>
          {person.name} {person.number}
          <button onClick={() => deleteHandler(person)}>delete</button>
        </li>
      ))}
    </ul>
  );
};

export default PersonList;
