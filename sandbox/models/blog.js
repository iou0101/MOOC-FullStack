// schema and model for the "blog" document
const mongoose = require('mongoose');
const schema = mongoose.Schema;


const blogSchema = new schema({ // schema constructor
    title: {
        type: String, 
        required: true,
    },

    snippet: {
        type: String, 
        required: true,
    },

    body: {
        type: String, 
        required: true,
    },


    
}, { timestamps: true });


// the names of models are typically stated with a capital letter
// The first param the function takes allows mongoose to auto-pluralize the collection name based on the param.
// That can be overridden by passing the value { collection: "XYZ" } in the second argument for the 
// schema constructor.

const Blog = mongoose.model("Blog", blogSchema); // if collection doesn't exist, mogoose auto-creates it


module.exports = Blog;// allows other modules to have access to the CRUD functions that the model provides