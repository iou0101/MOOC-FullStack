const http = require('http');
const fs = require('fs');


const server = http.createServer((request, response) => 
{
    console.log(request.url, request.method);

    response.setHeader('Content-Type', 'text/html');

    let path = './views/';
    // handling routing
    switch(request.url) {
        case "/":
            path += 'index.html';            
            response.statusCode = 200;
            break;
        case "/about":
            path += 'about.html';
            response.statusCode = 200;
            break;

        // a redirect case

        case "/about-me":
            response.setHeader("Location", "/about");
            response.statusCode = 301;
            response.end();
            break;
        default:
            path += '404.html';
            response.statusCode = 404;
            break;
    }

    const file = fs.readFile(path, (err, data) => {
        if (err) console.log(err);
        else response.write(data);
        
        response.end();
    });
    
});


server.listen('3000', 'localhost', () => {
    console.log('listening for requests on port 3000')
});