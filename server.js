const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
//Middlewire
app.use((request, response, next) => {
    //we can call some database action to check if a user is authenticated
    //example
    var now = new Date().toString();
    var log = `${now} ${request.method} ${request.url}`;
    console.log(log);
    
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log');
        }
    });
    
    //if next is not called request will not go to next action
    next();
});

// app.use() requires a proper order
// app.use((request, response, next) => {
//     response.render('maintainance.hbs');
// });
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (request, response) => {
    // response.send('Hello Express');
    //response.send({ name: 'Sourav', likes: ['coding', 'travelling'] });
    response.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my website'
    });
});

app.get('/about', (request, response) => {
    response.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.listen(3000, () => {
    console.log('Server has started on port 3000');
});


/**
 * to start server nodemon server.js -e js,hbs
 */