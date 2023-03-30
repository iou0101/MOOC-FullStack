import './config.js';
import express, { response } from "express";
import morgan from "morgan";
import cors from 'cors';
import Contact from "./src/models/Contact.js";

const PORT = process.env.PORT;

const generateId = () => {
  // generating unique id
  // const maxId = (contacts.length > 0) 
  //     ? Math.max(...contacts.map(n => n.id)) 
  //     : 0;
  // return maxId + 1;


  // generates a random unique id
  const min = Math.ceil(1);
  const max = Math.floor(99999999999);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}



const app = express();

let contacts = [
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
 
// a custom morgan token
// takes in as parameters: 
// - a token name
// - and a callback function in which the request is passed as a parameter inorder to stringify its body
morgan.token('body', (req) => {
  return JSON.stringify(req.body);
});


app.use(express.json());
app.use(morgan('tiny'));
app.use(morgan(':method :url :body'));
app.use(cors());

app.get("/", (req, resp) => {
  resp.redirect("/api/contacts");
});

app.get("/api/contacts", (req, resp) => {

  // retrieving all contacts from database
  Contact.find({}).then((contacts) => {
    resp.json(contacts);
  });

});


app.get("/info", (req, resp) => {
  const response = `<div>
    <p>
      Phonebok has info for ${contacts.length} people
    </p>
    <p>
    ${new Date()}
    </p>
  </div>`;

  resp.send(response);

});

app.get("/api/contacts/:id", (req, resp) => {
  const id = req.params.id;


  Contact.findById(id)
    .then((contact) => {
      (contact) ? resp.json(contact) 
                : resp.status(404).end();
    })
    .catch((err) => {
      console.log(err)
      // resp.status(500).end();
      resp.status(400).send({ error: 'malinformatted id' });
    });
});

app.post("/api/contacts", (req, resp) => {
  const body = req.body;

  // the return statement is essential to prevent
  // the block from executing till its very end
  if (!body) return resp.status(400).json({
    error: "missing body content"
  });


  Contact.find({}).then((contacts) => {
    if (contacts.map(c => c.name).includes(body.name)) return resp.status(400).json({
      error: "name must be unique"
    });


    if (!body.name) return resp.status(400).json({
      error: "name may not be missing" 
    })

    if (!body.number) return resp.status(400).json({
      error: "number may not be missing" 
    })

    const contact = new Contact({
      name: body.name,
      number: body.number,
    });

    contact.save().then(savedContact => {
      resp.json(savedContact);
    });
  })

});



app.delete("/api/contacts/:id", (req, resp) => {
  const id = req.params.id;
  // contacts = contacts.filter(contact => contact.id !== id);
  // console.log(contacts);

  Contact.findOneAndRemove(id)
  .then((res) => {
    console.log(res)
    resp.send(res).status(404);
  })
  .catch((err) => console.log(err));
  

});



// middleware for non-existent routes
app.use((req, resp) => resp.status(404).send({error: "Unkown endpoint"}));

app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`)
});