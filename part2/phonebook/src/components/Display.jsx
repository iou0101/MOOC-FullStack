import Contact from "./Contact";

const Display = (props) => {
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone number</th>
          </tr>
        </thead>
        <tbody>
          {props.contacts.map((contact) => (
            <Contact
              key={contact.id}
              name={contact.name}
              number={contact.number}
              id={contact.id}
              handleDeletingAContact={props.handleDeletingAContact}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Display;
