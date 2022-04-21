const express = require("express");
const bodyParser = require("body-parser");

const app = express();

let items = ["Buy Food", "Cook Food", "Eat Food"];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {

    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    }

    res.render("list", {
        kindOfDay: new Date().toLocaleDateString("en-US", options),
        itemList: items
    });
});

app.post("/", function (req, res) {

    items.push(req.body.newItem);

    res.redirect("/");

})

app.listen(3000, () => console.log("Server started on port 3000"));