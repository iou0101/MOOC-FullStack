import Course from "./Course";

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
