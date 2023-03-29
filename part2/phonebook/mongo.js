import mongoose from "mongoose";


if (process.argv.length > 3) {
    console.log("give password as argument");
    process.exit(1);
}



const password = process.argv[2];



const url = `mongodb+srv://ibrahimaldarra010101:${password}@cluster0.rheprqk.mongodb.net/mooc-phonebook?retryWrites=true&w=majority`; 


mongoose.set('strictQuery', false);
mongoose.connect(url)
    .then((res) => {
        console.log("Connected to Database")
    })
    .catch((err) => console.log(err));

// defining the schema
const contactSchema = new mongoose.Schema({
    name: String,
    number: String
});


// setting up the model
const Contact = mongoose.model('Contact', contactSchema);

const contact = new Contact({
    name: "Jan Smith",
    number: "06234234234234",
});



contact.save()
       .then((res) => {
        console.log("contact saved!");
        mongoose.connection.close();
       })







