const mongoose = require("mongoose");

require("dotenv").config({ path: "./.env" });

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Item can't have an empty field name."]
    }
});

const listSchema = new mongoose.Schema({
    name: String,
    items: [itemSchema]
});


exports.List = mongoose.model(process.env.DB_COLLECTION_LIST, listSchema);
exports.Item = mongoose.model(process.env.DB_COLLECTION_ITEM, itemSchema);