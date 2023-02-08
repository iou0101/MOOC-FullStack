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
  return course.parts.length === 0 ? (
    <div>
      <Header title={course.name} />
      <p>course's details are to be known soon!</p>
    </div>
  ) : (
    <div>
      <Header title={course.name} />
      <Content list={course.parts} />
      <Total list={course.parts} />
    </div>
  );
};

const Courses = ({ list }) => {
  return list.map((course) => <Course key={course.id} course={course} />);
};

const App = () => {
  const courses = [
    {
      id: 1,
      name: "#1 Half Stack application development",
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
    },
    {
      id: 2,
      name: "#2 Continuous Integration and Software Quality 2",
      parts: [],
    },
  ];

  return (
    <>
      <Courses list={courses} />
    </>
  );
};

export default App;
