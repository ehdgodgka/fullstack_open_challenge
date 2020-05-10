import React, { useState } from "react";
import ReactDOM from "react-dom";
import './index.css';
const Button = ({ onClickHandler }) => {
  return (
    <>
      <button onClick={() => onClickHandler("good")}>good</button>
      <button onClick={() => onClickHandler("neutral")}>neutral</button>
      <button onClick={() => onClickHandler("bad")}>bad</button>
    </>
  );
};
const Statistic = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};
const Statistics = ({ good, neutral, bad, counter, getAverage, getPositiveRate }) => {
  return (
    <>
      <h1>statistics</h1>
      {counter ? (
        <table className='statistic'> 
          <Statistic text='good' value={good}></Statistic>
          <Statistic text='neutral' value={neutral}></Statistic>
          <Statistic text='bad' value={bad}></Statistic>
          <Statistic text='all' value={good + neutral + bad}></Statistic>
          <Statistic text='average' value={getAverage()}></Statistic>
          <Statistic text='positive' value={getPositiveRate() + "%"}></Statistic>
        </table>
      ) : (
        <div>No feedback given </div>
      )}
    </>
  );
};
const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [counter, setCounter] = useState(0);
  const getAverage = () => {
    return (good - bad) / counter;
  };
  const getPositiveRate = () => {
    return (good * 100) / counter;
  };
  const setToValue = (value) => {
    switch (value) {
      case "good":
        setGood(good + 1);
        setCounter(counter + 1);
        break;
      case "neutral":
        setNeutral(neutral + 1);
        setCounter(counter + 1);
        break;
      case "bad":
        setBad(bad + 1);
        setCounter(counter + 1);
        break;
      default:
        break;
    }
  };
  return (
    <div>
      <h1>give feedback</h1>
      <Button onClickHandler={setToValue} />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        counter={counter}
        getAverage={getAverage}
        getPositiveRate={getPositiveRate}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
