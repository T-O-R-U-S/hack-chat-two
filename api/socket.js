let Pusher = require("pusher");

let accounts = require("./accountdata.json");

let pusher = new Pusher({
  appId: "1182518",
  key: "a992f09a2d49b2381347",
  secret: "08e6f586507e75889216",
  cluster: "ap2",
  useTLS: true,
});

let commands = [

]

let commandRegex = new RegExp(/\\|\//)

export default async (req, res) => {
  if(req.body.content?.startsWith("\\")) {
    console.log("Command detected!")
  }



  let messageObj = {
    user: "Anonymous",
    content: req.body.content
  };

  if(req.body?.token?.length == 64) 
    messageObj.user = accounts.find(account => account.token == req.body.token).username;
  

  if (req.body?.reqType == "shout") 
    if (!req.query.user?.coins > 50) return;
  

  await pusher.trigger("message-channel", "message", messageObj);

  return;
};
