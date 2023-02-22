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
          {props.contacts() && // conditional rendering to prevent calling .map() on null while waiting for the fetch request
            props
              .contacts()
              .map((contact) => (
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
