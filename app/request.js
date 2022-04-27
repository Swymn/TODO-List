const mongoose = require("mongoose");
const { Item } = require("../model/Item");

require("dotenv").config({ path: "./.env" });

const defaultItemsArray = [
    {
        name: "Welcome to your todo-list!"
    },
    {
        name: "Hit the + button to add a new item."
    },
    {
        name: "<-- Hit this to delete an item."
    }
];

const openConnexion = () => {

    mongoose.connect(process.env.URI)
        .then(() => {
            console.log("Connected!");
        })
        .catch((err) => {
            console.log("Something went wrong when trying to connect to the DB." + err);
        });
}

const closeConnexion = () => {
    mongoose.disconnect()
        .then(() => {
            console.log("Disconnect!");
        })
        .catch(() => {
            console.log("Something went wrong when trying to disconnect to the DB.");
        });
}

const defaultItems = (model) => {

    model.find({}, function (err, items) {
        if (items.length === 0)
            model.insertMany(defaultItemsArray, function (err) {
                if (err)
                    console.log(err);
                else
                    console.log("Successfully saved default items to DB.");
            });
    });
}

const deleteItem = (itemID) => {
    Item.findByIdAndRemove(itemID).then(() => {
        console.log("Item successfully deleted!");
    });
}

const getItemNameArray = async (model) => {
    const request = await model.find({});

    let res = [];

    request.forEach((item) => {
        res.push(item);
    })

    return res;
}

exports.defaultItemsArray = defaultItemsArray
exports.getItemNameArray = getItemNameArray;
exports.openConnexion = openConnexion;
exports.closeConnexion = closeConnexion;
exports.defaultItems = defaultItems;
exports.deleteItem = deleteItem;