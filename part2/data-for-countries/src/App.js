import React, { useEffect, useState } from "react";
import Filter from "./Filter";
import Content from "./Content";
import axios from "axios";

function App() {
  const [countrySearch, setCountrySearch] = useState("");
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setCountries(response.data);
    });
  }, []);
  return (
    <div className='App'>
      <Filter
        textInput={countrySearch}
        setTextInput={setCountrySearch}
        items={countries}
        setFilteredItems={setFilteredCountries}
      />
      <Content items={filteredCountries} showItem={setCountrySearch} />
    </div>
  );
}

export default App;
