[{
  id: "",
  name: "Kevin",
  room: "Room A"
}]

//addUser(id, name, room)
//removeUser(id)
//getUser(id)
//getUserList(room)

class Users {
  constructor() {
    this.users = [];
  }
  addUser(id, name, room) {
    var user = { id, name, room };
    this.users.push(user);
    return user;
  }
  removeUser(id) {
    //return user that was removed
    var user = this.users.filter((user) => user.id === id)[0];
    if (user) {
      this.users = this.users.filter((user) => user.id !== id);
    }
    return user;
  }
  getUser(id) {
    return this.users.filter((user) => user.id === id)[0];
  }
  getUserList(room) {
    var users = this.users.filter((user) => user.room === room);
    var namesArray = users.map((user) => user.name);

    return namesArray;
  }
  userNameExist(name, room) {
    var users = this.users.filter((user) => user.room === room);
    // console.log("users", users);
    const index = users.findIndex(function (user, index) {
      return user.name.trim().toLowerCase() === name;
    });
    // console.log("index", index);
    return index;
  }
  getRoomArray(users) {
    var arrRoom = [];
    users.forEach(function (user) {
      if (! arrRoom.includes(user.room)){
        arrRoom.push(user.room);
      }
    });
    return arrRoom;
  };
}

module.exports = { Users };

