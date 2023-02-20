import Contact from "./Contact";

const Display = ({ contacts, searchQuery }) => {
  const contactsToDisplay = () => {
    return searchQuery == ""
      ? contacts
      : contacts.filter((contact) =>
          contact.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
  };

  return (
    <>
      <h2>Contacts</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Telephone number</th>
          </tr>
        </thead>
        <tbody>
          {contactsToDisplay().map((contact) => (
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

export default Display;
