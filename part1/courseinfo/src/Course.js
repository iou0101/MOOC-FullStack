const Header = ({ title }) => <h1>{title}</h1>;

const Content = ({ list }) => {
  return list.map((item) => (
    <Part key={item.id} title={item.title} exercise={item.exercises} />
  ));
};

const Part = ({ title, exercise }) => (
  <p>
    {title} {exercise}
  </p>
);

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

export default Course;
