const ContactsForm = (props) => {
    const handleNameInputChange = (event) => {
      props.onNameChange(event.target.value);
    };
    const handleNumberInputChange = (event) => {
      props.onNumberChange(event.target.value);
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
              number:
              <input
                className="numberInput"
                type="tel"
                value={props.number}
                pattern={props.regex}
                onChange={handleNumberInputChange}
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
  