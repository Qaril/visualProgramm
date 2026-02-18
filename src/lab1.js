"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = exports.TrimStr = exports.UpperFirst = void 0;
exports.createUser = createUser;
exports.createBook = createBook;
exports.calculateArea = calculateArea;
exports.getStatusColor = getStatusColor;
exports.getFirstElement = getFirstElement;
exports.findById = findById;
function createUser(id, name, email) {
    return {
        id: id,
        name: name,
        email: email,
        isActive: true
    };
}
function createBook(book) {
    return book;
}
createBook({
    title: "book 1",
    autor: "eto ya",
    year: 1232,
    genre: 'fiction',
});
createBook({
    title: "book 2",
    autor: "eto ya2",
    genre: 'non-fiction',
});
function calculateArea(shape, num) {
    if (shape === 'circle') {
        return Math.PI * num * num;
    }
    else {
        return num * num;
    }
}
console.log(calculateArea('circle', 15));
console.log(calculateArea('square', 34));
function getStatusColor(status) {
    if (status === "active")
        return "green";
    else if (status === "new")
        return "yellow";
    else
        return "red";
}
console.log("active", getStatusColor("active"));
console.log("inactive", getStatusColor("inactive"));
console.log("new", getStatusColor("new"));
var UpperFirst = function (string, uppercase) {
    if (uppercase === void 0) { uppercase = false; }
    if (string.length == 0)
        return string;
    var result = string[0].toUpperCase() + string.slice(1, string.length).toLowerCase();
    return uppercase ? result.toUpperCase() : result;
};
exports.UpperFirst = UpperFirst;
var TrimStr = function (string, uppercase) {
    if (uppercase === void 0) { uppercase = false; }
    if (string.length == 0)
        return string;
    var trimmed = string.trim();
    return uppercase ? trimmed.toUpperCase() : trimmed;
};
exports.TrimStr = TrimStr;
console.log((0, exports.UpperFirst)("формат1"));
console.log((0, exports.TrimStr)("формат2"));
function getFirstElement(arr) {
    if (arr.length == 0) {
        return undefined;
    }
    return arr[0];
    // const num = [1,2,13];
    // const strings = ['privet','nerefe','fsdas'];
    // const emty: number[] = [];
    // console.log('1 num', getFirstElement(num));
    // console.log('1 str',getFirstElement(strings));
    // console.log('void arr', getFirstElement(emty));
}
exports.user = [
    { id: 1, name: 'Валера', email: 'valerchik@gmail.com' },
    { id: 2, name: 'dssds', email: 'sdffasd@msfd.ru' },
    { id: 3, name: 'privet', email: 'eqrqefeqd@rfd.sp' },
    { id: 4, name: 'qq' }
];
function findById(items, id) {
    for (var i = 0; i < items.length; i++) {
        if (items[i].id === id) {
            return items[i];
        }
    }
    return undefined;
}
console.log('id 4', findById(exports.user, 4));
console.log('id 1', findById(exports.user, 1));
console.log('id 15', findById(exports.user, 15));
