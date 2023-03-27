import express from "express";

const app = express();

const contacts = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1,
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2,
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3,
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4,
  },
];

app.get("/", (req, resp) => {
  resp.send("<div>Hello World</div>");
});

app.get("/api/contacts/:id", (req, resp) => {
  const id = Number(req.params.id);

  const contact = contacts.find((contact) => {
    console.log();
    return contact.id === id;
  });

  console.log(contact);
  resp.json(contact);
});

app.post("/api/contacts", (req, resp) => {});

app.delete("/api/contacts/:id", (req, resp) => {});

app.get("/api/contacts", (req, resp) => {
  resp.json(contacts);
});

const PORT = 3001;
app.listen(PORT);
console.log(`App is listening on port ${PORT}`);
