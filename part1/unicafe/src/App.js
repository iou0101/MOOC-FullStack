import { useState } from 'react';

const Button = ({ text, event }) => <button onClick={event}>{text}</button>
const Stat = ({ label, figure }) => <div><p>{label}: {figure}</p></div>
const App = () => {

  const [ratings, setRatings] = useState({
    good: 0, 
    neutral: 0, 
    bad: 0
  })




  const handleGoodClick = () => setRatings({...ratings, good: ratings.good + 1});

  const handleNeutralClick = () => setRatings({...ratings, neutral: ratings.neutral + 1});

  const handleBadClick = () => setRatings({...ratings, bad: ratings.bad + 1});


  return ( 
    <>
      <h1>Give feedback</h1>
        <Button text="good" event={handleGoodClick}/>
        <Button text="neutral" event={handleNeutralClick} />
        <Button text="bad" event={handleBadClick} />
      <h2>Statistics</h2>
        <Stat label="good" figure={ratings.good} />
        <Stat label="neutral" figure={ratings.neutral} />
        <Stat label="bad" figure={ratings.bad} />
    </>
  );
}


export default App;
