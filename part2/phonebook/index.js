
import http from 'http';


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

const header = {
    "Content-Type": "application/json",
};

const app = http.createServer((request, response) => {
    response.writeHead(200, header);
    response.end(JSON.stringify(contacts));
});


const PORT = 3001;
app.listen(PORT);

console.log(`App is running on ${PORT}`);