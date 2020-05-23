import React, { useState } from "react";
const Filter = ({ persons }) => {
  const [filterInput, setFilterInput] = useState("");
  const filterInputHandler = (event) => {
    setFilterInput(event.target.value);
  };
  return (
    <>
      filter shown with
      <input value={filterInput} onChange={filterInputHandler} />
      {filterInput &&
        persons
          .filter((person) => !person.name.toLowerCase().indexOf(filterInput.toLowerCase()))
          .map((person) => (
            <li key={person.name}>
              {person.name} {person.number}
            </li>
          ))}
    </>
  );
};

export default Filter;
