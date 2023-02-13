import { useState } from "react";
import Contact from "./components/Number";

const App = () => {
  // TODO: contacts state needs to be reworked
  const [contacts, setContacts] = useState([{ id: 1, name: "Arto Hellas" }]);

  const [newName, setNewName] = useState("");

  const checkDuplicateNames = (name) => {
    const contactsNames = contacts.map((contact) => contact.name);
    return contactsNames.includes(name);
  };
  const handleNumberInputChange = () => {};

  const isDuplicate = (contact) => {
    return checkDuplicateNames(contact.name); // decoupled to allow scaling
  };

  const handleAddingContact = (event) => {
    if (newName !== "") {
      event.preventDefault();

      const contact = {
        id: contacts.length + 1,
        name: newName,
      };

      if (!isDuplicate(contact)) {
        console.log(newName);
        setContacts(contacts.concat(contact));
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
          number:{" "}
          <input
            value={newNumber}
            onChange={handleNumberInputChange}
            required
          />
        </div>

        <div>
          <button type="submit" onClick={handleAddingContact}>
            Add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {contacts.map((contact) => (
          <Contact
            key={contact.id}
            name={contact.person}
            numbe={contact.number}
          />
        ))}
      </ul>
    </>
  );
};

export default App;
