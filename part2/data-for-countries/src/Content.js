import React from "react";
import "./Content.css";

const Content = ({ items }) => {
  if (items.length > 10) {
    return <div> Too many Matches, specify filter</div>;
  } else if (items.length > 1 && items.length < 10) {
    return (
      <div>
        {items.map((item) => (
          <li key={item.name}>{item.name}</li>
        ))}
      </div>
    );
  } else if (items.length === 1) {
    console.log(items);
    return (
      <div className='country-info'>
        <h1>{items[0].name}</h1>
        <ul className='basic-info'>
          <li>capital:{items[0].capital}</li>
          <li>population:{items[0].population}</li>
        </ul>
        <h2>Language</h2>
        <ul>
          {items[0].languages.map((language) => (
            <li>{language.name}</li>
          ))}
        </ul>
        <h2>Flag</h2>
        <img className='flag' src={items[0].flag} />
      </div>
    );
  } else {
    return null;
  }
};

export default Content;
