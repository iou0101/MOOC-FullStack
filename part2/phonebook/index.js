
import express from 'express';

const app = express();

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
    }
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

const PORT = 3001;


app.listen(PORT, () => {
    console.log(`App is running on ${PORT}`);
});
