import React, { useState } from 'react';
import Proptypes from 'prop-types';
const Filter = ({ persons }) => {
  const [filterInput, setFilterInput] = useState('');
  const filterInputHandler = (event) => {
    setFilterInput(event.target.value);
  };
  return (
    <>
      filter shown with
      <input value={filterInput} onChange={filterInputHandler} />
      {filterInput &&
        persons
          .filter(
            (person) =>
              !person.name.toLowerCase().indexOf(filterInput.toLowerCase())
          )
          .map((person) => (
            <li key={person.name}>
              {person.name} {person.number}
            </li>
          ))}
    </>
  );
};

Filter.propTypes = {
  persons: Proptypes.object.isRequired
};
export default Filter;
