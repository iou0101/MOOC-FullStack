import Contact from "./Contact";

const Display = ({ contacts }) => {
  return (
    <>
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
