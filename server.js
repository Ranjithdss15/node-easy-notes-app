const express = require('express');
const bodyParser = require('body-parser');
var path = require('path');
var exphbs = require('express-handlebars');
var jsonParser = bodyParser.json();
// create express app
const app = express();


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())


app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
	useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// define a simple route
/*app.get('/', (req, res) => {
    //res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
    res.sendFile(path.join(__dirname,'pages','index.html'));
});
*/

app.get('/',(req,res,next) => {
    res.render('home');
});
app.get('/read',(req,res,next) => {
    res.render('read');
});

app.get('/new',(req,res,next) => {
    res.render('new');
});
app.get('/main.js', function (req, res) {
    res.sendFile(path.join(__dirname, 'pages', 'main.js'));
    });



require('./app/routes/note.routes.js')(app);

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
