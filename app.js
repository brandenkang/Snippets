const express = require('express'); 
const path = require('path'); 
const snippet = require('./snippet.js');
var fs = require('fs');

//where we will stash our static files
const publicPath = path.resolve(__dirname, 'public');

//use function to create application object
const app = express(); 

//set templating system for our express app
app.set('view engine', 'hbs');


/* middleware */ 
//express static middleware
app.use(express.static(publicPath));

//body parsing middleware
//allow access to the content of the request's body.
app.use(express.urlencoded({extended: false}));

//custom middleware function to print request method, path, query string
const customLog = (req, res, next) => {
    console.log("Method: " + req.method); 
    console.log("Route: " + req.route); 
    console.log("Query String: " + req.query); 
    next(); 
}; 
app.use(customLog); 

var snippetArr = []; 
function readFiles(files) {
    // const filesLength = files.length; 
    files.forEach(elem => {
        fs.readFile(path.resolve(dirPath,elem),(err,data) => {
            if(err) {console.log("Error while reading file");}
            else {
                const fileData = elem+'\n'+data; 
                const array = fileData.split('\n').splice(0,2); 
                array.push(fileData); 
                const name = array[0]; 
                const code = array[2];
                const tags = array[1].replace('//','').replace(/ /g, ''); 
                const snippet = new Snippet.Snippet(name, code, tags); 
                snippetArr.push(snippet);  
                if (snippetArr.length == 3) {
                    app.listen(3000); 
                    console.log("Server started; type CTRL+C to shut down");
                }
            }
        }); 
    });
}

fs.readdir(dirPath, (err, files) => {
    if(err) {console.log("Error while reading directory");}
    else {readFiles(files)}; 
});

//set up a route and a render call
//going to the root url via a GET request shows rendered template
app.get('/', (req, res)=> {
    const displayArr = []; 
    if (Object.keys(req.query) > 0) {
        for (const object in snippetArr) {
            //if statement: 
            displayArr.push(snippetArr[object]); 
        }
        res.render('home', {SnippetArr: displayArr}); 
    }
    else {
        res.render('home', {snippetArr: snippetArr}); 
    }
});