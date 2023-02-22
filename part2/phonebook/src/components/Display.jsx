import Contact from "./Contact";

const Display = (props) => {
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
          {console.log(props.contacts)}
          {props.contacts &&
            props.contacts.map((contact) => (
              <Contact
                key={contact.id}
                name={contact.name}
                number={contact.telephone}
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
