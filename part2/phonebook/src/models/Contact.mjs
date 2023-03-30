import mongoose from "mongoose";


mongoose.set('strictQuery', false);


if (process.argv.length > 3) {
    console.log("give password as argument");
    process.exit(1);
}



const password = process.argv[2];






const url = process.env.MONGODB_URI;



console.log('connecting to ', url);

mongoose.connect(url)
    .then((res) => {
        console.log("Connected to Database")
    })
    .catch((err) => { 
      console.log(err)
    });

// defining the schema
const contactSchema = new mongoose.Schema({
    name: String,
    number: String
});


contactSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

// setting up the model
const Contact = mongoose.model('Contact', contactSchema);



export default Contact;