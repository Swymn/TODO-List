let getDate = function () {

    const options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    }

    return new Date().toLocaleDateString("en-US", options);
}

let getDay = function () {

    const options = {
        weekday: "long",
    }

    return new Date().toLocaleDateString("en-US", options);
}

exports.getDate = getDate;
exports.getDay = getDay;
