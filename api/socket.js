let Pusher = require("pusher");

let pusher = new Pusher({
  appId: "1182518",
  key: process.env.pusher_key,
  secret: process.env.pusher_secret,
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
      return messageObj.user = req.body.username;
    else
      messageObj.user = "Absolute clown";
  

  await pusher.trigger("message-channel", "message", messageObj);


  // FIXME: Whenever a status IS returned, nothing gets written to Pusher. Why??
  return res.status(200);
};
