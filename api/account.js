const fs = require("fs");

let accounts = require("./accountdata.json");

let randomString =
  "12345567890-_ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()+=";

function randString(iterate) {
  let toReturn = "";
  for (let i = iterate; i > 0; i--) {
    toReturn += randomString[Math.floor(Math.random() * randomString.length)];
  }
  return toReturn;
}

export default (req, res) => {
  if (req.body?.login === true) {
    // Checks token length
    if (req.body.token.length !== 64)
      return res.status(400).send("Invalid token!");

    // Check if the account with the token actually exists
    if (!accounts.find((data) => data.token === req.body.token))
      return res.status(400).send("No such account!");
    // Success condition -- set a cookie with the UUID
    res.setHeader("Set-Cookie", [`login=${req.body.token}; HttpOnly`]);
    return res.status(200).send("You're logged in now!");
  }
  // Check if a username is provided since the request isn't to login a cookie
  if (!req.body?.username) return res.status(400).send("Invalid credentials");
  // Check for pre-existing username.
  if (accounts.find((user) => user.username == req.body.username))
    return res.status(400).send("Pre-existing username!");
  if(req.body.username == "SYSTEM") 
    return res.status(400).send("Nice try lol.")
  
  
  // Sets up a 64-character long string to be used as the token. 64^65 = impossible to bruteforce... in the event of a hack though :/
  let userToken = randString(64);

  accounts.push({
    username: req.body.username,
    token: userToken,
  });

  fs.writeFileSync(__dirname + "/accountdata.json", JSON.stringify(accounts));
  console.log("updating...");
  

  res.setHeader("Set-Cookie", [`login=${userToken}; HttpOnly`]);

  return res.status(200).send({
    token: userToken,
  });
};
