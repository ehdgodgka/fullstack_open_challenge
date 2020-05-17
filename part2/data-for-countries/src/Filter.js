import React, { useState, useEffect } from "react";
const Filter = ({ items, setFilteredItems }) => {
  const [textInput, setTextInput] = useState("");
  const textInputHandler = (event) => {
    setTextInput(event.target.value);
  };
  useEffect(() => {
    const filteredItems = items.filter(
      (item) => !item.name.toLowerCase().indexOf(textInput.toLowerCase())
    );
     setFilteredItems(filteredItems);
     textInput||setFilteredItems([]);
  }, [textInput]);
  return (
    <>
      find countries
      <input value={textInput} onChange={textInputHandler} />
    </>
  );
};

export default Filter;
