import React from "react";
import '../css/Course.css'

const Header = ({ name }) => <h1>{name}</h1>;

const Content = ({ parts }) => {
  return (
    <ul className='content'>
      {parts.map((part) => {
        console.log(part.id, part.name, part.exercises);
        return <Part key={part.id} name={part.name} count={part.exercises} />;
      })}
      <Total parts={parts} />
    </ul>
  );
};

const Part = ({ name, count }) => {
  console.log(name,count);
  return (
    <li>
      {name} {count}
    </li>
  );
};

const Total =({parts})=>{
  const sumAll=()=>{
    return parts.reduce( (acc,part)=>{ 
      return acc+part.exercises
    },0)
  }
 return <li className='total'> total of {sumAll()}exercises</li>
}
const Course = ({ course }) => {
  return (<>
    <Header name={course.name} />
    <Content parts={course.parts} />
  </>);
};
export default Course;
