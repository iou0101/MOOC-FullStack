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
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  
  const parts = [
    {
      title: part1,
      exercises: exercises1
    },
    {
      title: part2, 
      exercises: exercises2
    },
    {
      title: part3,
      exercises: exercises3
    }   
  ];


  return (
    <div>
      <Header title={course} />
      <Content list={parts} />
      <Total list={parts} />
    </div>
  )
}

export default App