export default async (req, res) => {
  let Pusher = require('pusher');


  console.log(req.query)

  res
  .status(200)
  .send("A-ok!")

  let pusher = new Pusher({
    appId: "1182518",
    key: "a992f09a2d49b2381347",
    secret: "08e6f586507e75889216",
    cluster: "ap2",
    useTLS: true
  })

  pusher.trigger('message-channel', 'message', {
    user: "jonas",
    content: "average"
  })
};
