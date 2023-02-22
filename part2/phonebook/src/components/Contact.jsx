const Contact = (props) => {
  return (
    <tr>
      <th>{props.name}</th>
      <th>{props.number}</th>
      <th>
        <button
          onClick={() => {
            props.handleDeletingAContact(props.id);
          }}
        >
          Delete
        </button>
      </th>
    </tr>
  );
};

export default Contact;
