const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");

const appDir = __dirname + "/app/";
const date = require(appDir + "date.js");
const request = require(appDir + "request.js");

const PORT = process.env.PORT || 3000;

const { Item, List } = require(__dirname + "/model/Item.js");

require("dotenv").config({ path: "./.env" });

request.openConnexion();
request.defaultItems(Item);

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {

    const day = date.getDate();
    const items = await request.getItemNameArray(Item);

    res.render("list", {
        listTitle: day,
        itemList: items
    });
});

app.get("/:customList", async (req, res) => {

    const name = _.capitalize(req.params.customList);

    List.findOne({ name: name}, (err, foundList) => {
        if (!foundList) {
            new List({
                name: name,
                items: request.defaultItemsArray
            }).save();
            res.redirect("/" + name);
        } else {
            res.render("list", {
                listTitle: foundList.name,
                itemList: foundList.items
            });
        }
    });
});

app.post("/", (req, res) => {

    const { newItem } = req.body;
    const list = req.body.list;
    const day = date.getDate();

    const item = new Item({
        name: newItem
    });

    if (list === day) {
        item.save();
        res.redirect("/");
    } else {
        List.findOne({ name: list }, (err, foundList) => {
            if (err)
                console.log(err)
            else {
                foundList.items.push(item);
                foundList.save();
                res.redirect("/" + list);
            }
        });
    }

    console.log("Item successfully added!");
});

app.post("/delete", (req, res) => {
    const { item, list } = req.body;
    const day = date.getDate();

    if (list === day) {
        request.deleteItem(item);
    } else {
        List.findOneAndUpdate({ name: list}, {$pull: {items: {_id: item}}}, (err) => {
            if (err)
                console.log(err);
            else{
                console.log("Item successfully deleted!");
                res.redirect("/" + list);
            }
        })
    }

});

app.listen(PORT, () => console.log("Server started on port" + PORT));