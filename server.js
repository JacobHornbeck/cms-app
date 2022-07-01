// Get dependencies
var express = require('express');
var path = require('path');
var http = require('http');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const port = process.env.PORT || '3000';

// import the routing file to handle the default (index) route
var index = require('./server/routes/app');
const messageRoutes = require('./server/routes/messages')
const contactRoutes = require('./server/routes/contacts')
const documentRoutes = require('./server/routes/documents')


var expressApp = express(); // create an instance of express

// Tell express to use the following parsers for POST data
expressApp
    .use(express.json())
    .use(express.urlencoded({
        extended: false
    }))
    .use(cookieParser())
    .use(logger('dev')) // Tell express to use the Morgan logger
    // Add support for CORS
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept'
        );
        res.setHeader(
            'Access-Control-Allow-Methods',
            'GET, POST, PATCH, PUT, DELETE, OPTIONS'
        );
        next();
    })
    .use(express.static(path.join(__dirname, 'dist/cms')))
    .use('/', index)
    .use('/messages', messageRoutes)
    .use('/contacts', contactRoutes)
    .use('/documents', documentRoutes)


    // Tell express to map all other non-defined routes back to the index page
    .get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'dist/cms/index.html'));
    })
    .set('port', port);

// Create HTTP server.
const server = http.createServer(expressApp);

server.listen(port, function () {
    console.log('API running on localhost: ' + port)
});
