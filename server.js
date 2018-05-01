//
// DEPENDENCIES
//

var bodyParser = require("body-parser");
var express = require("express");
var express_handlebars = require("express-handlebars");
var mysql = require("mysql");



//
// CONFIG
//

var app = express();

var PORT = process.env.PORT || 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.engine("handlebars", express_handlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "wishes_crud_app_db"
});

connection.connect((err) => {
    if (err) {
        console.error(err);
    } else {
        console.log("connected as " + connection.threadId);
    }
});



//
// ROUTES
//

app.get("/", (req, res) => {
    // res.end("Hello World.");
    data = [
        { id: 1, wish: "This is a test wish"},
        { id: 2, wish: "And so is this" },
        { id: 3, wish: "And also this third one"}
    ];
    res.render("index", { wishes: data });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
