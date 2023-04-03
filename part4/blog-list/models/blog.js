const mongoose = require('mongoose');


const blogSchema = new mongoose.Schema({
    title: String, 
    snippet: String, 
    body: String, 
    tags: Array,
});


blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject.id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

const model = mongoose.model('Blog', blogSchema);


module.exports = model; 