import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(props.anecdotes.length).fill(0));
  const randomNum = () => {
    let random = null;
    do {
      random = Math.floor(Math.random() * 6);
    } while (random === selected);
    setSelected(random);
  };

  const addVote = () => {
    const updatedVotes = [...votes];
    updatedVotes[selected]++;
    setVotes(updatedVotes);
  };
  const mostVotedAnec = () => {
    const mostVotedIndex = votes.indexOf(Math.max(...votes));
    return mostVotedIndex;
  };

  return (
    <>
      <h1>Anecdote of the day</h1>
      {props.anecdotes[selected]}
      <p>
        has {votes[selected]}
        {votes[selected] > 1 ? " votes" : " vote"}
      </p>
      <div>
        <button onClick={() => addVote()}>vote</button>
        <button onClick={() => randomNum()}>next anecdotes</button>
      </div>
      <h1>Anecdote with most votes</h1>
      {props.anecdotes[mostVotedAnec()]}
    </>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
