import React, { useState, useEffect } from "react";
import Notification from "./Notification";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import PersonList from "./PersonList";
import personService from "./services/person";
const App = () => {
  const [persons, setPersons] = useState([]);
  const [notification, setNotification] = useState({});
  const [notiTimer, setNotiTimer] = useState(null);
  useEffect(() => {
    personService.getAll().then((response) => {
      setPersons(response.data);
    });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification style={notification.style} message={notification.message} />
      <Filter persons={persons} />
      <h2>add a new</h2>
      <PersonForm
        persons={persons}
        setPersons={setPersons}
        setNotification={setNotification}
        notiTimer={notiTimer}
        setNotiTimer={setNotiTimer}
      />
      <h2>Numbers</h2>
      <PersonList
        persons={persons}
        setPersons={setPersons}
        setNotification={setNotification}
        notiTimer={notiTimer}
        setNotiTimer={setNotiTimer}
      />
    </div>
  );
};

export default App;
