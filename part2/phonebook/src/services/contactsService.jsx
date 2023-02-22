const baseUrl = "https://jdiqd7-5174.preview.csb.app/contacts";

const getAllContacts = () => {
  return fetch(baseUrl).then((response) => response.json());
};

const addContact = (contact) => {
  return fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contact),
  })
    .then((resp) => resp.json())
    .then((data) => console.log(data));
};

export default {
  getAllContacts: getAllContacts,
  addContact: addContact,
};
