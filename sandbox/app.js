const express = require('express');
const mongoose = require('mongoose');
const Blog = require('./models/blog');


const app = express();



const dbURI = "mongodb+srv://ibrahimaldarra010101:ZDY4QYc7o0ibT75A@cluster0.rheprqk.mongodb.net/node-tutorial?retryWrites=true&w=majority";
mongoose.connect(dbURI) // an asynchronous task 
    .then((res) => {
        console.log('connected to db');
        app.listen(3000); // only listen for requests after db connection is complete 
    })
    .catch((err) => console.log(err));

const blogs = [
    {"title": "My first blog!", "body": "Eu pariatur et dolor laborum laborum commodo nostrud tempor occaecat esse enim. Qui aliqua dolore eu ea laboris cupidatat mollit ea cupidatat laborum ullamco laboris sit. Anim adipisicing tempor magna excepteur ad esse sint id minim."},
    {"title": "My second blog!", "body": "Eu pariatur et dolor laborum laborum commodo nostrud tempor occaecat esse enim. Qui aliqua dolore eu ea laboris cupidatat mollit ea cupidatat laborum ullamco laboris sit. Anim adipisicing tempor magna excepteur ad esse sint id minim."},
    {"title": "My third blog!", "body": "Eu pariatur et dolor laborum laborum commodo nostrud tempor occaecat esse enim. Qui aliqua dolore eu ea laboris cupidatat mollit ea cupidatat laborum ullamco laboris sit. Anim adipisicing tempor magna excepteur ad esse sint id minim."},
    {"title": "My fourth blog!", "body": "Eu pariatur et dolor laborum laborum commodo nostrud tempor occaecat esse enim. Qui aliqua dolore eu ea laboris cupidatat mollit ea cupidatat laborum ullamco laboris sit. Anim adipisicing tempor magna excepteur ad esse sint id minim."},
];

app.set('view engine','ejs');


// Express default middleware for allowing public access to specified server folders/files

app.use(express.static('public')); // i.e. the folder named: public
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, resp) => {
    resp.redirect("/blogs");
});


app.get("/blogs", (req, resp) => {
    Blog.find().sort({ createdAt: -1 }) // sorting blogs in descending order based on creation date
    .then((res) => {
        resp.render('index', { title: 'Home', blogs: res });
    }).catch((err) => console.log(err));
});

app.post("/blogs", (req, resp) => {

    console.log(req.body);


    const blog = new Blog(req.body);


    blog.save()
        .then(() => {
            resp.redirect("/blogs")
        })
        .catch((err) => console.log(err));
});


app.get("/blogs/:id", (req, resp) => {

    const id = req.params.id;

    Blog.findById(id)
    .then((result) => {
        console.log(result);
        resp.render('single', { blog: result, title: null });
    })
    .catch((err) => console.log(err));
})


app.delete("/blogs/:id", (req, resp) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
    .then(res => {
        res.redirect("/blogs");
    })
    .catch(err => console.log(err));

});

app.get("/about", (req, resp) => {
    resp.render('about', { title: 'About'});
});

app.get("/blogs/create", (req, resp) => {
    resp.render('create', { title: 'Create blog' });
});


app.use((req, resp) => {
    resp.status(404).render('404', { title: 'Page not found'});
});
