import { useState } from "react";
import Number from "./components/Number";

const App = () => {
  const [persons, setPersons] = useState([{ id: 1, name: "Arto Hellas" }]);

  const [newName, setNewName] = useState("");

  const handleAddingPerson = (event) => {
    event.preventDefault();
    if (newName !== "") {
      const person = {
        id: persons.length + 1,
        name: newName,
      };
      console.log(newName);
      setPersons(persons.concat(person));
      setNewName("");
    }
  };

  const handleNameInputChange = (event) => {
    setNewName(event.target.value);
  };

  return (
    <>
      <h1>Phonebook App</h1>
      <form>
        <div>
          name: <input value={newName} onChange={handleNameInputChange} />
        </div>
        <div>
          <button type="submit" onClick={handleAddingPerson}>
            Add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => (
          <Number key={person.id} number={person} />
        ))}
      </ul>
    </>
  );
};

export default App;
