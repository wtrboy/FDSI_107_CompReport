var express = require('express');
var server = express();

/************************************/
/*** Search using CMD + P ****/
/************************************/
/************************************/



// render HTML from endpoints
var ejs = require('ejs');
server.set('views', __dirname + "/public");
server.engine('html', ejs.renderFile);
server.set('view engine', ejs);

// *** Load Server STATIC files (js, css, img, pdf, doc) *** //

server.use(express.static(__dirname + "/public"));


// body-parser to read payload (ajax data) directly to object

var bparser = require('body-parser');
server.use(bparser.json());

// MongoDB connection //
var mongoose = require('mongoose');
mongoose.connect('mongodb://ThiIsAPassword:TheRealPassword@cluster0-shard-00-00-euadh.mongodb.net:27017,cluster0-shard-00-01-euadh.mongodb.net:27017,cluster0-shard-00-02-euadh.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin');
var mongoDb = mongoose.connection;
var itemConstructor;


/************************************/
// *** WEB SERVER *** Start server by typing "NODEMON SERVER.JS" *** //
/************************************/

server.get('/', function (req, res) {
    res.render("index.html");
});

server.get('/admin', function (req, res) {
    res.render("admin.html");
});

server.get('/about', function (req, res) {
    res.render('about.html');
});

server.get('/Contact', function (req, res) {
    res.send("<h1>Contact (Page coming soon...)</h1>");
});

// *** REST API (Applicaiton Programming Interface) *** //

var data = [];
var cnt = 1;

server.post('/api/items', function (req, res) {
    //code here to save the item
    console.log("Request Received!");
    var item = req.body;

    if (!item.price) {
        res.status(400); // bad request
        res.send("Price is required on the Item");
    } else {

        var itemFormDB = itemConstructor(item);
        itemFormDB.save((error, savedItem) => {
            if (error) {
                res.status(500);
                res.send(error);
            }

            //res.status(201);
            res.json(savedItem);
        });
    }
});
/**********************************************/

/*** Get All Endpoint ***/

server.get('/api/items', (req, res) => {
    itemConstructor.find({}, (error, data) => {
        if (error) {
            res.status(500);
            res.send(error);
        }

        //res.status(200);
        res.json(data);

    });
});

/*** Get By Name Endpoint ***/

server.get('/api/items/:user', (req, res) => {
    let name = req.params.user;

    itemConstructor.find({
        user: name
    }, (error, data) => {
        if (error) {
            res.status(500);
            res.send(error);
        }

        //res.status(200);
        res.json(data);

    });
});

server.delete('/api/items', (req, res) => {
    var id2Remove = req.body.id;
    itemConstructor.deleteOne({ _id: id2Remove}, (error) => {
        if(error){
            res.status(500);
            res.send(error);
        }

        res.send("Removed");

    });
});

server.get('/test/1', (req, res) => {
    // solve the problem and reply with the result
    // data
    var nums = [81, 3, 1, 543, -2, 53, -28, 897123, 1, 2, -9487745, 99];
    // problem: find the greatest number in the array
    // your code:
    var max = Math.max(...nums);
    // problem: return back only positive numbers (USING filter fn)
    // your code:
    var positives = nums.filter(n => n >= 0);
    // result
    res.send("Res:" + max);
});

mongoDb.on('error', (error) => {
    console.log("Error connecting to database");
});

mongoDb.on('open', () => {
    console.log("Connected to database");

    // predefined schema for mongoDb
    var itemSchema = mongoose.Schema({
        code: String,
        title: String,
        price: Number,
        category: String,
        image: String,
        user: String,
    });

    itemConstructor = mongoose.model('itemsCh10', itemSchema);

});

// Start Server
server.listen(8080, function () {
    console.log("Server running at http://localhost:8080");
});