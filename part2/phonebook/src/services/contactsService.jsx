const baseUrl = "https://jdiqd7-5174.preview.csb.app/contacts/";

const getContactById = (id) => {
  const response = fetch(baseUrl + `${id}`);
  return response.then((response) => response.json());
};

const getContactByName = (name) => {
  return getAllContacts().then((contacts) =>
    contacts.find((contact) => contact.name === name)
  );
};

const getAllContacts = () => {
  const request = fetch(baseUrl);
  return request.then((response) => response.json());
};

const createContact = (contact) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contact),
  };
  const request = fetch(baseUrl, requestOptions);
  return request.then((response) => response.json());
};

const deleteContact = (id) => {
  const request = fetch(baseUrl + `${id}`, {
    method: "DELETE",
  });
  return request.then((response) => response.json());
};

const updateContact = (id, updatedContact) => {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedContact),
  };
  const request = fetch(baseUrl + `${id}`, requestOptions);
  return request
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export default {
  getContactById,
  getContactByName,
  getAllContacts,
  createContact,
  updateContact,
  deleteContact,
};
