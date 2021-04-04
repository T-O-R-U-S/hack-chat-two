let Pusher = require("pusher");

// I got the keys mixed up so pusher_key == pusher secret. Too lazy to fix.

let pusher = new Pusher({
  appId: "1182518",
  key: process.env.pusher_secret,
  secret: process.env.pusher_key,
  cluster: "ap2",
  useTLS: true,
});

export default async (req, res) => {
  let messageObj = {
    user: "Anonymous",
    content: req.body.content
  };

  if(req.body?.username) 
    if(req.body.username.toUpperCase() !== "SYSTEM")
      messageObj.user = req.body.username;
    else
      messageObj.user = "Absolute clown";
  

  if (req.body?.reqType == "shout") 
    if (!req.query.user?.coins > 50) return;
  

  await pusher.trigger("message-channel", "message", messageObj);

  return;
};
