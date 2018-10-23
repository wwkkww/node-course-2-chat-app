var moment = require('moment');
// 1st Jan 1970 00:00:00 am

// var date = new Date();
// console.log(date.getMonth());
var someTimestamp = moment().valueOf();
console.log(someTimestamp)
var createdAt = 1234;
var date = moment(createdAt);
var someTImestamp
// date.add(100, "year").subtract(6, "months");
// console.log(date.format('ddd Do/MMMM/YYYY'));
// console.log(date.format('llll'));

console.log(date.format('h:mm A'));
