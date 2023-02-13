import { useState } from "react";
import Number from "./components/Number";

const App = () => {
  const [persons, setPersons] = useState([{ id: 1, name: "Arto Hellas" }]);

  const [newName, setNewName] = useState("");

  const checkDuplicateNames = (name) => {
    const personsNames = persons.map((person) => person.name);
    return personsNames.includes(name);
  };

  const isDuplicate = (person) => {
    return checkDuplicateNames(person.name); // decoupled to allow scaling
  };

  const handleAddingPerson = (event) => {
    if (newName !== "") {
      event.preventDefault();

      const person = {
        id: persons.length + 1,
        name: newName,
      };

      if (!isDuplicate(person)) {
        console.log(newName);
        setPersons(persons.concat(person));
        setNewName("");
      } else {
        alert(`${newName} is already added to phonebook`);
      }
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
          name:{" "}
          <input value={newName} onChange={handleNameInputChange} required />
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
