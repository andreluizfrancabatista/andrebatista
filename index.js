const express = require('express');
const app = express();
const path = require('path');

// Send message for default URL
//app.get('/', (req, res) => res.send('Hello World with Express'));
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/views/index.html'));
});

app.get('/about', function (req, res) {
    res.sendFile(path.join(__dirname + '/views/about.html'));
});

// Use Api routes in the App
//app.use('/api', apiRoutes);

//Statics files (CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

//404 error page
app.use(function (req, res, next) {
    res.status(404).sendFile(path.join(__dirname + '/views/404.html'));
});

//500 error page
app.use(function (req, res, next) {
    res.status(500).sendFile(path.join(__dirname + '/views/500.html'));
});

// Launch app to listen to specified port
app.listen(port, function () {
    console.log("Running RestHub on port " + port);
});