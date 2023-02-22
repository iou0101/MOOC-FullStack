import { useState, useEffect } from "react";
import ContactsForm from "./components/ContactsForm";
import Display from "./components/Display";
import Search from "./components/Search";

const App = (props) => {
  const [contacts, setContacts] = useState(null);

  const [newContact, setNewContact] = useState({
    name: "",
    telephone: "",
  });

  const [searchQuery, setSearchQuery] = useState("");

  const getAllContacts = () => {
    fetch("https://jdiqd7-5174.preview.csb.app/persons")
      .then((response) => response.json())
      .then((data) => setContacts(data));
  };
  useEffect(() => {
    console.log("use effect ran!");
    getAllContacts();
  }, []);

  // returns true on duplicate names
  const checkDuplicateNames = (name) => {
    const contactsNames = contacts.map((contact) => contact.name);
    return contactsNames.includes(name);
  };

  const postContact = (contact) => {
    fetch("https://jdiqd7-5174.preview.csb.app/persons", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contact),
    })
      .then((resp) => resp.json())
      .then((data) => console.log(data))
      .then(() => {
        setNewContact({
          name: "",
          telephone: "",
        });
      })
      .then(() => getAllContacts());
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

  const handleAddingSubmittedContact = (event) => {
    if (!telephoneRegex.test(newContact.telephone)) {
    } // does nothing on invalid telephone
    else if (newContact.name !== "" && newContact.telephone !== "") {
      event.preventDefault();

      if (isDuplicate(newContact)) {
        console.log("duplicate!");
        alert(`${newContact.name} is already added to phonebook`);
      } else if (checkDulicateTelephones(newContact.telephone))
        alert(
          `Telephone number "${newContact.telephone}" belongs to an already added contact. Check the telephone number again please!`
        );
      else {
        // setContacts(contacts.concat(newContact));
        console.log(newContact);

        postContact(newContact);
      }
    }
  };

  const handleNameInputFromCFComponent = (input) => {
    setNewContact({ ...newContact, name: input });
  };

  const handleTelephoneInputCFComponent = (input) => {
    setNewContact({ ...newContact, telephone: input });
  };

  const handleSearchBoxInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const DUTCH_PHONE_NUMBER_REGEX =
    "^(06[0-9]{8}|[+]{1}31[0]?[0-9]{9,10}|0031[0]?[0-9]{9,10})";
  const telephoneRegex = new RegExp(DUTCH_PHONE_NUMBER_REGEX);

  const contactsToDisplay = () => {
    return searchQuery == ""
      ? contacts
      : contacts.filter((contact) =>
          contact.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
  };

  return (
    <>
      <div>
        <h1>Phonebook App</h1>
        <Search
          handleSearchBoxInputChange={handleSearchBoxInputChange}
          searchQuery={searchQuery}
        />
      </div>
      <h2>Add a new contact</h2>
      <ContactsForm
        name={newContact.name}
        telephone={newContact.telephone}
        regex={DUTCH_PHONE_NUMBER_REGEX}
        onNameChange={handleNameInputFromCFComponent}
        onTelephoneChange={handleTelephoneInputCFComponent}
        onClick={handleAddingSubmittedContact}
      />
      <h2>Contacts</h2>
      <Display contacts={contactsToDisplay} />
    </>
  );
};

export default App;
