const express = require("express");
const bodyParser = require("body-parser");

const appDir = __dirname + "/app/";
const date = require(appDir + "date.js");

const app = express();

const ITEMS = ["Buy Food", "Cook Food", "Eat Food"];
const WORK_ITEMS = [];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {

    const day = date.getDate();

    res.render("list", {
        listTitle: day,
        itemList: ITEMS
    });
});

app.get("/work", function (req, res) {

    res.render("list", {
        listTitle: "Work List",
        itemList: WORK_ITEMS
    });
});

app.post("/", function (req, res) {

    const list = req.body.list;
    const item = req.body.newItem;

    function addItemAndRedirect(list, routes) {
        list.push(item);
        res.redirect(routes);
    }

    switch (list) {
        case "Work List":
            addItemAndRedirect(WORK_ITEMS, "/work");
            break;

        default:
            addItemAndRedirect(ITEMS, "/");
            break;
    }
});

app.listen(3000, () => console.log("Server started on port 3000"));