const ContactsForm = (props) => {
  const handleNameInputChange = (event) => {
    props.onNameChange(event.target.value);
  };
  const handleTelephoneInputChange = (event) => {
    props.onTelephoneChange(event.target.value);
  };

  const handleSubmitting = (event) => {
    // event.preventDefault();
    props.onClick(event);
  };

  return (
    <form>
      <div>
        <div>
          <label>
            name:
            <input
              className="nameInput"
              value={props.name}
              onChange={handleNameInputChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            telephone:
            {/* i have no clue why input validation isn't working */}
            {/* UPDATE: i know now, it's namely due to event.preventDefault() omiting form checks/valdiations */}
            <input
              className="telephoneInput"
              type="tel"
              // todo: replace by var from props
              value={props.telephone}
              pattern={props.regex}
              onChange={handleTelephoneInputChange}
              required
            />
          </label>
        </div>
      </div>
      <button type="submit" onClick={handleSubmitting}>
        Add
      </button>
    </form>
  );
};

export default ContactsForm;
