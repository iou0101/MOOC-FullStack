const Header = ({ title }) => <h1>{ title }</h1>

const Content = ({ list }) => {
  return list.map((item) => <Part key={item.title} title={ item.title } exercise={ item.exercises } />);
}

const Total = ({ list }) => {
  return <p>Number of exercises: {
    list.reduce((acc, item) => {
      return acc + item.exercises
    }, 0)
  }</p>
}

const Part = ({ title, exercise }) => <p>{ title } { exercise }</p>;

const App = () => {
  const course = {
    name: 'Half Stack application development', 
    parts: [
      {
        title: 'Fundamentals of React',
        exercises: 10
      },
      {
        title: 'Using props to pass data',
        exercises: 7
      },
      {
        title: 'State of a component',
        exercises: 14
      }   
    ]
  };


  return (
    <div>
      <Header title={course.name} />
      <Content list={course.parts} />
      <Total list={course.parts} />
    </div>
  )
}

export default App