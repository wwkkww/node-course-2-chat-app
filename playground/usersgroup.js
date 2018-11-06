const users = [{
  id: "1",
  name: "Mike",
  room: "Node Course"
}, {
  id: "2",
  name: "Jane",
  room: "React Course"
}, {
  id: "3",
  name: "Kevin",
  room: "Node Course"
}, {
  id: "4",
  name: "Sky",
  room: "Node Course"
}, {
  id: "5",
  name: "Angel",
  room: "React Course"
}, {
  id: "6",
  name: "Andrew",
  room: "Node Course"
}, {
  id: "7",
  name: "Kim",
  room: "JS Course"
}];


const sortByName = function (users) {
  users.sort(function (a, b) {
    if (a.name.toLowerCase() < b.name.toLowerCase()) {
      return -1;
    } else if (b.name.toLowerCase() < a.name.toLowerCase()) {
      return 1;
    } else {
      return 0;
    }
  });
};

const sortByRoom = function (users) {
  users.sort(function (a, b) {
    if (a.room.toLowerCase() < b.room.toLowerCase()) {
      return -1;
    } else if (b.room.toLowerCase() < a.room.toLowerCase()) {
      return 1;
    } else {
      return 0;
    }
  });
};


function getRoomArray(users) {
  var arrRoom = [];
  users.forEach(function (user) {
    if (! arrRoom.includes(user.room)){
      arrRoom.push(user.room);
    }
  });
  return arrRoom;
};


// function groupByRoom(users, room) {
//   return rooms = users.reduce(function(newArr, user) {
//     var arr =[];
//     if (newArr.room !== user.room) {
//       // console.log("newArr", newArr);
//       arr.push(user.room);
//     }
//     return arr;
//   });
// }; 

const arr = getRoomArray(users);
console.log("arr", arr);
// sortByRoom(users);
// console.log(users);