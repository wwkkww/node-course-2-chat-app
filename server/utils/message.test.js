var expect = require("expect");
var { generateMessage, generateLocationMessage } = require("./message");

describe("generateMessage", () => {
  it("should generate correct message object", () => {
    var from = "Jen";
    var text = "Some message";
    var message = generateMessage(from, text);

    // expect(message.createdAt).toBeA("number");
    expect(typeof message.createdAt).toBe("number");
    expect(message).toMatchObject({
      from,
      text
    });
  });
});

describe("generateLocationMessage", () => {
  it("should generate correct location object", () => {
    var from = "Amy";
    var latitude = "20";
    var longitude = "30";
    var url = "https://www.google.com/maps?q=20,30";
    var message = generateLocationMessage(from, latitude, longitude);

    expect(typeof message.createdAt).toBe("number");
    expect(message).toMatchObject({from,url});
  });
})