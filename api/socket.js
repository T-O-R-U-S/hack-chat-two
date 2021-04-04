let Pusher = require("pusher");

let pusher = new Pusher({
  appId: "1182518",
  key: "a992f09a2d49b2381347",
  secret: "08e6f586507e75889216",
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
