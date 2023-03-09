const express = require('express')


const app = express();


app.listen(3000);


app.get("/", (req, resp) => {
    resp.sendFile("./views/index.html", { root: __dirname });
});

app.get("/about", (req, resp) => {
    resp.sendFile("./views/about.html", { root: __dirname });
});

app.get("/about-me", (req, resp) => {
    resp.redirect("/about");
})

app.get("/*", (req, resp) => {
    resp.status(404).sendFile("./views/404.html", { root: __dirname });
});
