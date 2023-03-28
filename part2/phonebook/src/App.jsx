import { useState, useEffect } from "react";
import ContactsForm from "./components/ContactsForm.jsx";
import Display from "./components/Display";
import Search from "./components/Search";
import Notification from "./components/Notification";
import contactsService from "./services/contactsService";
import "./styling/index.css";

const App = (props) => {
  const [contacts, setContacts] = useState(null);
  const [newContact, setNewContact] = useState({
    name: "",
    telephone: "",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [toUpdate, setToUpdate] = useState(false);
  const [prompt, setPrompt] = useState({
    message: "",
    isError: false,
  });

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
    return contactsNames.includes(name.trim());
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

        showPromptMessage(
          `Contact ${contact.name} successfully added to list!`
        );
      })
    );
  };

  const showPromptMessage = (message) => {
    setPrompt({
      message: message,
      isError: false,
    });
    setTimeout(() => {
      setPrompt({
        message: "",
        isError: false,
      });
    }, 5000);
  };

  const showErrorMessage = (message) => {
    setPrompt({
      message: message,
      isError: true,
    });
    setTimeout(() => {
      setPrompt({
        message: "",
        isError: false,
      });
    }, 5000);
  };

  const updateContact = (contact) => {
    if (
      window.confirm(
        `Do you really want to update ${contact.name}'s telephone to ${contact.telephone}?` // lol
      )
    ) {
      // todo: check if this .then nesting is necessary
      contactsService
        .getContactByName(newContact.name)
        .then((oldContact) => {
          contactsService.updateContact(oldContact.id, contact).then(() =>
            contactsService.getAllContacts().then((data) => {
              setContacts(data);
              // setContacts(contacts.concat(newContact));
              setNewContact({
                name: "",
                telephone: "",
              });
              getContacts();

              showPromptMessage(
                `Contact ${contact.name} successfully updated its number to ${contact.telephone}!`
              );
            })
          );
        })
        .catch((error) => {
          console.log(error);
          showErrorMessage(
            `Information over contact ${contact.name} has already been removed.`
          );
        });
    }
  };

  // returns true on duplicate telephones
  const checkDulicateTelephones = (telephone) => {
    const contactsTelephones = contacts.map((contact) => contact.telephone);
    return contactsTelephones.includes(telephone.trim());
  };

  // returns true on exact duplicates
  const isDuplicate = (contact) => {
    return contacts.find((c) => {
      console.log(c);
      c.telephone == contact.telephone.trim() && c.name == contact.name.trim();
    }) == undefined
      ? false
      : true;
  };

  const handleAddingSubmittedContact = (event) => {
    if (!telephoneRegex.test(newContact.telephone)) {
      console.log("nothing happened");
    } // does nothing on invalid telephone
    else if (newContact.name !== "" && newContact.telephone !== "") {
      event.preventDefault();
      if (isDuplicate(newContact)) {
        console.log("duplicate!");
        // alert(`${newContact.name} is already added to phonebook`);
        showErrorMessage(`${newContact.name} is already added to phonebook`);
      } else if (checkDulicateTelephones(newContact.telephone)) {
        console.log("hii");
        // alert(`Telephone number "${newContact.telephone}" belongs to an already added contact. Check the telephone number again please!`);
        showErrorMessage(
          `Telephone number "${newContact.telephone}" belongs to an already added contact. Check the telephone number again please!`
        );
      } else if (toUpdate) {
        updateContact(newContact);
      } else {
        addContact(newContact);
      }
    }
  };

  useEffect(() => {
    if (contacts !== null)
      // ugly, but works
      checkDuplicateNames(newContact.name)
        ? setToUpdate(true)
        : setToUpdate(false);
  }, [newContact]);

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
        contactsService.deleteContact(id).then(() => {
          getContacts();
          showPromptMessage("Successfully deleted the contact!");
        });
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
      <Notification message={prompt.message} isError={prompt.isError} />
      <ContactsForm
        name={newContact.name}
        telephone={newContact.telephone}
        regex={DUTCH_PHONE_NUMBER_REGEX}
        onNameChange={handleNameInputFromCFComponent}
        onTelephoneChange={handleTelephoneInputCFComponent}
        onClick={handleAddingSubmittedContact}
        toUpdate={toUpdate}
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
