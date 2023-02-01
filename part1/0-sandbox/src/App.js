import { useState } from 'react';


const Hello = ({ name, age }) => {
  const yearNow = new Date().getFullYear();

  const bornYear = () => yearNow - age;

  return (
    <>
      <p>Hello {name}, you are {age}</p>
      <p>...So, you were probably born in {bornYear()}</p>
    </>

  )
} 

const Button = ({ clickEvent, text }) => <button onClick={clickEvent}>{text}</button>
const Display = ({ counter }) => <div>{ counter }</div>

const History = (props) => {
  return (props.allClicks.length === 0) 
    ? <div>The app is used by pressing the buttons!</div>
    : <div>Button press history: {props.allClicks.join(" ")}</div>
}





const App = () => { 
  
  // const [right, setRight] = useState(0);
  // const [left, setLeft] = useState(0);

  const [clicks, setClicks] = useState({
    left: 0, right: 0
  });

  const [allClicks, setAllClicks] = useState([]);

  const handleRightClick= () => {
    setClicks({ ...clicks, right: clicks.right + 1 });
    setAllClicks(allClicks.concat("R"));
  }
  const handleLeftClick = () => {
    setClicks({ ...clicks, left: clicks.left + 1 });
    setAllClicks(allClicks.concat("L"));
  }

  return (
    <>
      <div>
        <Display counter={clicks.right} />
        <Button clickEvent={handleRightClick} text="right" />
        <Display counter={clicks.left} />
        <Button clickEvent={handleLeftClick} text="left" />
        <History allClicks={allClicks} />
      </div>
    </>
  );
}


export default App; 