const baseUrl = "https://jdiqd7-5174.preview.csb.app/contacts/";

const getContact = (id) => {
  const response = fetch(baseUrl + `${id}`);
  return response.then((response) => response.json());
};

const getAllContacts = () => {
  const request = fetch(baseUrl);
  return request.then((response) => response.json());
};

const createContact = (contact) => {
  const request = fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contact),
  });

  return request.then((response) => response.json());
};

const deleteContact = (id) => {
  const request = fetch(baseUrl + `${id}`, {
    method: "DELETE",
  });
  return request.then((response) => response.json());
};

export default {
  getContact,
  getAllContacts,
  createContact,
  deleteContact,
};
