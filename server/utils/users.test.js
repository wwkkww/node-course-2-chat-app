const expect = require("expect");

const {Users} = require("./users");

describe("Users", ()=> {
  var usersTemp;

  beforeEach(()=> {
    usersTemp = new Users();
    usersTemp.users=[{
      id: "1",
      name: "Mike",
      room: "Node Course"
    }, {
      id: "2",
      name: "Jane",
      room: "React Course"
    }, {
      id: "3",
      name: "Julie",
      room: "Node Course"
    }];
  });

  it("should add new user", ()=> {
    var usersObj = new Users();
    var user = {
      id: "123",
      name: "WKW",
      room: "Office 1"  
    };

    var resUser = usersObj.addUser(user.id, user.name, user.room);
    expect(usersObj.users).toEqual([user]);
  });

  it("should remove a user", ()=> {
    var userId = "1";
    var user = usersTemp.removeUser(userId);

    expect(user.id).toBe(userId);
    expect(usersTemp.users.length).toBe(2);
  });

  it("should not remove a user", ()=> {
    var userId = "99";
    var user = usersTemp.removeUser(userId);

    expect(user).toBeFalsy();
    expect(usersTemp.users.length).toBe(3);
  });

  it("should find user", ()=> {
    var userId = "2";
    var user = usersTemp.getUser(userId);
    expect(user.id).toBe(userId);
  });

  it("should not find user", ()=> {
    var userId = "99";
    var user = usersTemp.getUser(userId);
    expect(user).toBeFalsy();
  });

  it("should return names for node course", () => {
    var userList = usersTemp.getUserList("Node Course");
    expect(userList).toEqual(["Mike", "Julie"]);
  });

  it("should return names for react course", () => {
    var userList = usersTemp.getUserList("React Course");
    expect(userList).toEqual(["Jane"]);
  });

});