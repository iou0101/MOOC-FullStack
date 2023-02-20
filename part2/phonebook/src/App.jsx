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
        alert(
          `Telephone number "${newContact.telephone}" belongs to an already added contact. Check the telephone number again please!`
        );
      else {
        // setNewContact({
        //   ...newContact,
        //   id: contacts.length + 1,
        // });
        setContacts(contacts.concat(newContact));
        setNewContact({
          id: newContact.id + 1,
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
          <div>
            <label>
              name:
              <input
                value={newContact.name}
                onChange={handleNameInputChange}
                required
              />
            </label>
          </div>
          <div>
            <label>
              telephone:
              <input
                type="tel"
                pattern="(^\+[0-9]{2}|^\+[0-9]{2}\(0\)|^\(\+[0-9]{2}\)\(0\)|^00[0-9]{2}|^0)([0-9]{9}$|[0-9\-\s]{10}$)"
                value={newContact.telephone}
                onChange={handleTelephoneInputChange}
                required
              />
            </label>
          </div>
        </div>
        <button type="submit" onClick={handleAddingContact}>
          Add
        </button>
      </form>
      <h2>Contacts</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Telephone number</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <Contact
              key={contact.id}
              name={contact.name}
              number={contact.telephone}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default App;
