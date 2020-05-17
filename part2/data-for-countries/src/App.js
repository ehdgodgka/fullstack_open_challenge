import React, { useEffect,useState} from "react";
import Filter from "./Filter"
import Content from "./Content"
import axios from "axios";
/* 3가지 경우의 수가 있다
1. 11개 이상의  나라가 검색될 때
2. 10개이하의 나라가 검색 될때 
3. 1가지 나라가 검색될 때
*/
function App() {
  const [countries,setCountries]=useState([]);
  const [filteredCountries,setFilteredCountries]=useState([]);

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => { 
      setCountries(response.data);
  })}, []);
  return <div className='App'>
    <Filter items={countries} setFilteredItems={setFilteredCountries}/>
    <Content items={filteredCountries}/>
   
  </div>;
}

export default App;
