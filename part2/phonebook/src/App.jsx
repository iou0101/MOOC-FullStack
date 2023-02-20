import { useState } from "react";
import Display from "./components/Display";

const App = ({ contactsLog }) => {
  // TODO: contacts state needs to be reworked
  const [contacts, setContacts] = useState(contactsLog);

  const [newContact, setNewContact] = useState({
    id: contacts.length + 1,
    name: "",
    telephone: "",
  });

  const [searchQuery, setSearchQuery] = useState("");

  // returns true on duplicate names
  const checkDuplicateNames = (name) => {
    const contactsNames = contacts.map((contact) => contact.name);
    return contactsNames.includes(name);
  };

  // returns true on duplicate telephones
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

  const handleSearchBoxInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <>
      <div>
        <h1>Phonebook App</h1>{" "}
        <span>
          <label>
            Search box:
            <input
              className="searchBox"
              value={searchQuery}
              onChange={handleSearchBoxInputChange}
            />
          </label>
        </span>
      </div>
      <form>
        <div>
          <div>
            <label>
              name:
              <input
                className="nameInput"
                value={newContact.name}
                onChange={handleNameInputChange}
                required
              />
            </label>
          </div>
          <div>
            <label>
              telephone:
              {/* i have no clue why input validation isn't working */}
              <input
                className="telephoneInput"
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
      <Display contacts={contacts} searchQuery={searchQuery} />
    </>
  );
};

export default App;
