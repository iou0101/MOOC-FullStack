import { useState } from "react";
import Contact from "./components/Number";

const App = () => {
  // TODO: contacts state needs to be reworked
  const [contacts, setContacts] = useState([
    { id: 1, name: "Arto Hellas", telephone: "06987654321" },
  ]);

  const [newContact, setNewContact] = useState({
    id: contacts.length + 1,
    name: "",
    telephone: "",
  });

  // return true on duplicate names
  const checkDuplicateNames = (name) => {
    const contactsNames = contacts.map((contact) => contact.name);
    return contactsNames.includes(name);
  };

  // return true on duplicate telephones
  const checkDulicateTelephones = (telephone) => {
    const contactsTelephones = contacts.map((contact) => contact.telephone);
    return contactsTelephones.includes(telephone);
  };

  // returns true on exact duplicates
  const isDuplicate = (contact) => {
    return (
      checkDuplicateNames(contact.name) &&
      checkDulicateTelephones(contact.telephone)
    ); // decoupled to allow scaling
  };

  const handleAddingContact = (event) => {
    if (newContact.name !== "" && newContact.telephone !== "") {
      event.preventDefault();

      if (isDuplicate(newContact))
        alert(`${newContact.name} is already added to phonebook`);
      else if (checkDulicateTelephones(newContact.telephone))
        alert(`${newContact.telephone} `);
      else {
        console.log(newContact.name);
        setContacts(contacts.concat(newContact));
        setNewContact({
          ...newContact,
          name: "",
          telephone: "",
        });
      }
    }
  };

  const handleNameInputChange = (event) => {
    setNewContact({ ...newContact, name: event.target.value });
  };

  const handleTelephoneInputChange = (event) => {
    setNewContact({ ...newContact, telephone: event.target.value });
  };

  return (
    <>
      <h1>Phonebook App</h1>
      <form>
        <div>
          name:{" "}
          <input
            value={newContact.name}
            onChange={handleNameInputChange}
            required
          />
        </div>
        <div>
          telephone:{" "}
          <input
            value={newContact.telephone}
            onChange={handleTelephoneInputChange}
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
