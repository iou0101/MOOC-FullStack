import { useState } from 'react';

const SIG_FIG = 3;

const Button = ({ text, event }) => <button onClick={event}>{text}</button>
const StatisticsLine = ({ label, value }) => <tr><td>{label}</td><td>{value}</td></tr>;


const Statistics = ({ ratings }) => {

  const sumOfRates = () => ratings.bad + ratings.neutral + ratings.good;

  // although MOOC shows different results and hence there's a different formula used,
  // i think that my formula of calculating the average of ratings is more accurate/the correct one
  // (unless im totally wrong about this, unsurprisingly lol)
  const averageOfRatings = () => (sumOfRates() !== 0) ? Number((ratings.bad * 1 + ratings.neutral * 2 + ratings.good * 3) / sumOfRates()).toPrecision(SIG_FIG) : "no ratings yet!";
  const percentageOfPositive = () => Number(sumOfRates() !== 0) ? (ratings.good * 100 / sumOfRates()).toPrecision(SIG_FIG) + " %" : "no ratings yet!";

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>
              Statistics
            </th>
          </tr>
        </thead>
        <tbody>
          <StatisticsLine label="good" value={ratings.good} />
          <StatisticsLine label="neutral" value={ratings.neutral} />
          <StatisticsLine label="bad" value={ratings.bad} />
          <StatisticsLine label="All" value= {sumOfRates()} />
          <StatisticsLine label="Average" value={averageOfRatings()} />
          <StatisticsLine label="Percent positive" value={percentageOfPositive()}/> 
        </tbody>
      </table>
    </>
  )

}

const App = () => {

  const [ratings, setRatings] = useState({
    good: 0, 
    neutral: 0, 
    bad: 0
  })

  console.log(ratings);





  const handleGoodClick = () => setRatings({...ratings, good: ratings.good + 1});

  const handleNeutralClick = () => setRatings({...ratings, neutral: ratings.neutral + 1});

  const handleBadClick = () => setRatings({...ratings, bad: ratings.bad + 1});

  return ( 
    <>
      <h1>Give feedback</h1>
        <Button text="good" event={handleGoodClick}/>
        <Button text="neutral" event={handleNeutralClick} />
        <Button text="bad" event={handleBadClick} />
      <Statistics ratings={ratings} />
    </>
  );
}


export default App;
