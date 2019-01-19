import FileOperations from "./src/utils/FileOperations";
var express = require('express');
var path = require('path');
var session = require('cookie-session'); // Loads the piece of middleware for sessions
/*var bodyParser = require('body-parser'); // Loads the piece of middleware for managing the settings
var urlencodedParser = bodyParser.urlencoded({
    extended: false
});*/
//var fileOperations = require("./src/utils/FileOperations");

var app = express();
/* Using sessions */

app.use(session({
        secret: 'todotopsecret'
    }))
    app.set('views', path.join(__dirname, 'views/billSeparator'))
    /* If there is no to do list in the session, 
    we create an empty one in the form of an array before continuing */
    .use(function(req, res, next) {
        if (typeof(req.session.todolist) == 'undefined') {
            req.session.todolist = [];
        }
        next();
    })
    .use(express.static(path.join(__dirname, 'public')))
    .use(express.json())
    .use(express.urlencoded({ extended: false }))
    /* The to do list and the form are displayed */
    .post('/login', function(req, res){
        if(req.body.userId == "TEST"){
            var userId = "P1@p.pop.json";
            var content = FileOperations.getFileContent("src/models/mock/"+userId);
            let userObj = {data:{}};
            if(content){
                userObj.data = JSON.parse(content);
            }
            res.setHeader('Content-Type', 'application/json');
            res.json(JSON.stringify(userObj));
            //res.sendFile(path.join(__dirname, 'public', 'index.html'));
        } else {
            res.sendFile(path.join(__dirname, 'public', 'error.html'));
        }
    })
    .get('/todo', function(req, res) {
        var userId = "P1@p.pop.json";
        var content = FileOperations.getFileContent("src/models/mock/"+userId);
        let userObj = {data:{}};
        if(content){
            userObj.data = JSON.parse(content);
        }
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(userObj));
        //res.render('home.ejs', userObj);
    })
    /* Adding an item to the to do list */
    .post('/todo/add/', function(req, res) {
        if (req.body.newtodo != '') {
            req.session.todolist.push(req.body.newtodo);
        }
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ a: 1 }));
        //res.redirect('/todo');
    })
    /* Deletes an item from the to do list */
    .get('/todo/delete/:id', function(req, res) {
        if (req.params.id != '') {
            req.session.todolist.splice(req.params.id, 1);
        }
        res.redirect('/todo');
    })
    /* Redirects to the to do list if the page requested is not found */
    /*.use(function(req, res, next) {
        //res.redirect('/todo');
    })*/
    .get('/*', (req, res)=>{
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
        
    })
.listen(8080);