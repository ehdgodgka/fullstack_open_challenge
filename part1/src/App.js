import React from "react";

const Header = (props) => <h1>{props.course}</h1>;

const Part = (props) => (
  <p>
    {props.part} {props.exercise}
  </p>
);

const Content = ({ parts, exercises }) => {
  return (
    <>
      <Part part={parts[0]} exercise={exercises[0]} />
      <Part part={parts[1]} exercise={exercises[1]} />
      <Part part={parts[2]} exercise={exercises[2]} />
    </>
  );
};

const Total = ({ exercises }) => (
  <p>Number of exercises {exercises[0] + exercises[1] + exercises[2]}</p>
);

const App = () => {
  const course = "Half Stack application development";
  const parts = ["Fundamentals of React", "Using props to pass data", "State of a component"];
  const exercises = [10, 7, 14];
  return (
    <div>
      <Header course={course} />
      <Content parts={parts} exercises={exercises} />
      <Total exercises={exercises} />
    </div>
  );
};

export default App;
