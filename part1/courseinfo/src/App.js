const Header = ({ title }) => <h1>{title}</h1>;

const Content = ({ list }) => {
  return list.map((item) => (
    <Part key={item.id} title={item.title} exercise={item.exercises} />
  ));
};

const Total = ({ list }) => {
  return (
    <p>
      <b>
        Total of{" "}
        {list.reduce((acc, item) => {
          return acc + item.exercises;
        }, 0)}{" "}
        exercises
      </b>
    </p>
  );
};

const Part = ({ title, exercise }) => (
  <p>
    {title} {exercise}
  </p>
);

const Course = ({ course }) => {
  return (
    <div>
      <Header title={course.name} />
      <Content list={course.parts} />
      <Total list={course.parts} />
    </div>
  );
};

const App = () => {
  const course = {
    id: 1,
    name: "Half Stack application development",
    parts: [
      {
        title: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        title: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        title: "State of a component",
        exercises: 14,
        id: 3,
      },
      {
        title: "Redux",
        exercises: 11,
        id: 4,
      },
    ],
  };

  return (
    <>
      <Course course={course} />
    </>
  );
};

export default App;
