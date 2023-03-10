const express = require('express')


const app = express();


const blogs = [
    {"title": "My first blog!", "body": "Eu pariatur et dolor laborum laborum commodo nostrud tempor occaecat esse enim. Qui aliqua dolore eu ea laboris cupidatat mollit ea cupidatat laborum ullamco laboris sit. Anim adipisicing tempor magna excepteur ad esse sint id minim."},
    {"title": "My second blog!", "body": "Eu pariatur et dolor laborum laborum commodo nostrud tempor occaecat esse enim. Qui aliqua dolore eu ea laboris cupidatat mollit ea cupidatat laborum ullamco laboris sit. Anim adipisicing tempor magna excepteur ad esse sint id minim."},
    {"title": "My third blog!", "body": "Eu pariatur et dolor laborum laborum commodo nostrud tempor occaecat esse enim. Qui aliqua dolore eu ea laboris cupidatat mollit ea cupidatat laborum ullamco laboris sit. Anim adipisicing tempor magna excepteur ad esse sint id minim."},
    {"title": "My fourth blog!", "body": "Eu pariatur et dolor laborum laborum commodo nostrud tempor occaecat esse enim. Qui aliqua dolore eu ea laboris cupidatat mollit ea cupidatat laborum ullamco laboris sit. Anim adipisicing tempor magna excepteur ad esse sint id minim."},
];

app.set('view engine','ejs');

app.listen(3000);


app.get("/", (req, resp) => {
    resp.render('index', { title: 'Home', blogs });
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
