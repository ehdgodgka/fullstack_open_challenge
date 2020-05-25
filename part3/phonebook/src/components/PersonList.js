import React from 'react';
import personService from '../components/services/person';
import Proptypes from 'prop-types';

const PersonList = ({ persons, setPersons, setNotification, notiTimer, setNotiTimer }) => {
  const deleteHandler = ({ id, name }) => {
    if (window.confirm(`delete ${name}?`)) {
      personService
        .remove(id)
        .then((response) => {
          setPersons(persons.filter((person) => person.id !== id));
          if (notiTimer) {
            clearTimeout(notiTimer);
          }
          setNotiTimer(setTimeout(() => setNotification({}), 3000));
          setNotification({ style: 'success', message: `${name} deleted` });
        })
        .catch(() => {
          if (notiTimer) {
            clearTimeout(notiTimer);
          }
          setNotiTimer(setTimeout(() => setNotification({}), 3000));
          setNotification({
            style: 'error',
            message: `${name}' was already removed from server`
          });
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

PersonList.propTypes = {
  persons: Proptypes.array.isRequired,
  setPersons: Proptypes.func.isRequired,
  setNotification: Proptypes.func.isRequired,
  notiTimer: Proptypes.object.isRequired,
  setNotiTimer: Proptypes.func.isRequired
};
export default PersonList;
