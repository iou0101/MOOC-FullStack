import { useState } from "react";
import ContactsForm from "./components/ContactsForm";
import Display from "./components/Display";
import Search from "./components/Search";
import ContactsForm from "./components/ContactsForm";

// TODO: maintain ALL state management and event handlers in
// 'App' while refactoring the rest of the funtionality to
// other components

const App = ({ contactsLog }) => {
  const [contacts, setContacts] = useState(contactsLog);

  const [newContact, setNewContact] = useState({
    id: contacts.length + 1,
    name: "",
    telephone: "",
  });

  const [data, setData] = useState("");

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

  // testing out
  const childToParent = (childData) => {
    setData(childData);
  };

  return (
    <>
      <div>
        <h1>Phonebook App</h1>
        <Search />
      </div>
      <h2>Add a new contact</h2>
      <ContactsForm />
      <h2>Contacts</h2>
      <Display contacts={contacts} searchQuery={searchQuery} />
    </>
  );
};

export default App;
