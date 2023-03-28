const ContactsForm = (props) => {
    const handleNameInputChange = (event) => {
      props.onNameChange(event.target.value);
    };
    const handleTelephoneInputChange = (event) => {
      props.onTelephoneChange(event.target.value);
    };
  
    const handleSubmitting = (event) => {
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
              <input
                className="telephoneInput"
                type="tel"
                value={props.telephone}
                pattern={props.regex}
                onChange={handleTelephoneInputChange}
                required
              />
            </label>
          </div>
        </div>
        <button type="submit" onClick={handleSubmitting}>
          {props.toUpdate ? "Update" : "Add"}
        </button>
      </form>
    );
  };
  
  export default ContactsForm;
  