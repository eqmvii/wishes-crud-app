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

const PORT = process.env.PORT || 4000;
const ON_HEROKU = process.env.PORT ? true : false

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.engine("handlebars", express_handlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

if (ON_HEROKU) {
    console.log("Hey! I'm on Heroku!");
    var connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    var connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "password",
        database: "wishes_crud_app_db"
    });
}

connection.connect((err) => {
    if (err) {
        console.error(err);
    } else {
        console.log("connected as " + connection.threadId);
        connection.query(`SELECT * FROM wishes`, (err, res) => {
            if (err) {
                // create the table
                connection.query("CREATE TABLE wishes (id int NOT NULL AUTO_INCREMENT, PRIMARY KEY (id), wish varchar(255) NOT NULL);", (err, res) => {
                        if (err) {
                            console.log("This was hacky and it FAILED");
                            console.log(err);
                        } else {
                            console.log("% % % % % % % % % This was incredibly dumb but it actually worked! % % % % % % % % % ");
                        }
                    });
            } else {
                console.log(`Table exists and has ${res.length} entries`);
            }
        });
    }
});



//
// ROUTES
//

app.get("/", (req, res) => {
    var query_string = 'SELECT * FROM wishes;';
    connection.query(query_string, (err, data) => {
        if (err) { console.log(err); res.send("Error querying DB, sorry..."); }
        else {
            res.render("index", { wishes: data });
        }
    });
});

app.post("/", (req, res) => {
    console.log(req.body);
    var query_string = "INSERT INTO wishes (wish) VALUES (?)";
    connection.query(query_string, [req.body.wish], () => {
        res.redirect("/");
    });
});



//
// SERVER
//

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

