const ContactsForm = ({ childToParent }) => {
  // TODO: make own state for each component to store user input
  // then, send input to App where main state in manged via an event (?)
  // thereby, ex2.10 is done. At last.

  return (
    <form>
      <div>
        <div>
          <label>
            name:
            <input
              className="nameInput"
              value={newContact.name}
              onChange={handleNameInputChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            telephone:
            {/* i have no clue why input validation isn't working */}
            <input
              className="telephoneInput"
              type="tel"
              pattern="(^\+[0-9]{2}|^\+[0-9]{2}\(0\)|^\(\+[0-9]{2}\)\(0\)|^00[0-9]{2}|^0)([0-9]{9}$|[0-9\-\s]{10}$)"
              value={newContact.telephone}
              onChange={handleTelephoneInputChange}
              required
            />
          </label>
        </div>
      </div>
      {/* <button type="submit" onClick={handleAddingContact}> */}
      <button type="submit" onClick={() => childToParent(data)}>
        Add
      </button>
    </form>
  );
};

export default ContactsForm;
