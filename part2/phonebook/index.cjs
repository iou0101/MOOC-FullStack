
const express = require('express');
const app = express();
app.use(express.json());

const contacts = [   
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "telephone": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "telephone": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "telephone": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "telephone": "39-23-6423122"
    }, 

    { 
      "id": 5,
      "name": "Mary Poppendieck", 
      "telephone": "39-23-6423122"
    }, 



];


app.get('/', (request, response) => {
    response.send('<h1>Testing!</h1>')
});


app.get('/api/contacts', (request, response) => {
    response.json(contacts);
});


app.get('/info', (request, response) => {

  const date = new Date();

  const infoHTML = `
    Phonebook has info for ${contacts.length}
    <br />
    ${date}
  `;
  response.send(infoHTML);
});


app.get('/api/contacts/:id', (request, response) => {
  const id = Number(request.params.id);
  const contact = contacts.find(contact => contact.id ===  id);

  if (contact) response.json(contact);
  else response.status(404).end();
});


app.get('/api/contacts/:id', (request, response) => {
  const id = Number(request.params.id);
  notes = notes.filter(contact => contact.id !== id);

  response.status(204).end();
});


app.post('/api/contacts', (request, response) => {
  const contact = requst.body;
  console.log(contact);
  response.json(contact);
})

const PORT = 3001;


app.listen(PORT, () => {
    console.log(`App is running on ${PORT}`);
});
