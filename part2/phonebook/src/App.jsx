import { useState, useEffect } from "react";
import ContactsForm from "./components/ContactsForm";
import Display from "./components/Display";
import Search from "./components/Search";
import contactsService from "./services/contactsService";

const App = (props) => {
  const [contacts, setContacts] = useState(null);

  const [newContact, setNewContact] = useState({
    name: "",
    telephone: "",
  });

  const [searchQuery, setSearchQuery] = useState("");

  const getContacts = () => {
    return contactsService
      .getAllContacts()
      .then((contacts) => setContacts(contacts));
  };
  useEffect(() => {
    console.log("use effect ran!");
    getContacts();
  }, []);

  // returns true on duplicate names
  const checkDuplicateNames = (name) => {
    const contactsNames = contacts.map((contact) => contact.name);
    return contactsNames.includes(name);
  };

  const addContact = (contact) => {
    contactsService.createContact(contact).then(() =>
      contactsService.getAllContacts().then((data) => {
        setContacts(data);
        // setContacts(contacts.concat(newContact));
        setNewContact({
          name: "",
          telephone: "",
        });
        getContacts();
      })
    );
  };

  const updateContact = (contact) => {
    if (
      window.confirm(
        `Do you really want to update ${contact.name}'s telephone to ${contact.telephone}?` // lol
      )
    ) {
      contactsService.getContactByName(newContact.name).then((oldContact) => {
        contactsService.updateContact(oldContact.id, contact).then(() =>
          contactsService.getAllContacts().then((data) => {
            setContacts(data);
            // setContacts(contacts.concat(newContact));
            setNewContact({
              name: "",
              telephone: "",
            });
            getContacts();
          })
        );
      });
    }
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
      } else if (checkDulicateTelephones(newContact.telephone)) {
        alert(
          `Telephone number "${newContact.telephone}" belongs to an already added contact. Check the telephone number again please!`
        );
      } else if (checkDuplicateNames(newContact.name)) {
        updateContact(newContact);
      }
    } else {
      addContact(newContact);
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

  const handleDeletingAContact = (id) => {
    contactsService.getContactById(id).then((nameOfContactToDelete) => {
      if (
        window.confirm(
          `Do you really want to delete ${nameOfContactToDelete.name}'s contact?`
        )
      )
        contactsService.deleteContact(id).then(() => getContacts());
    });
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
      {/* // conditional rendering to prevent calling .map() on null while waiting for the fetch request */}

      {/* // TODO : FIX THE NASTY BUG AFTER OF THE APP IMMEDIATELY CRASHING AFTER ANY POST REQUEST !! */}
      {contacts && (
        <Display
          contacts={contactsToDisplay()}
          handleDeletingAContact={handleDeletingAContact}
        />
      )}
    </>
  );
};

export default App;
