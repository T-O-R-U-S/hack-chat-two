<script>
  import "https://js.pusher.com/5.0/pusher.min.js";
  import Cookies from 'js-cookie';

  const privateChannelCode = Math.random().toString(18).substring(2);

  let localUsername = Cookies.get("uname");

  let messages = [
    {
      user: "SYSTEM",
      content: "use /uname <USERNAME> to get a username!",
      style: "color: yellow",
    },
  ];

  Pusher.logToConsole = true;

  let pusher = new Pusher("a6ca652978825c96706c", {
    cluster: "ap2",
  });

  const channel = pusher.subscribe("message-channel");

  channel.bind("message", function (data) {
    messages = [
      ...messages,
      {
        user: data.user,
        content: data.content,
        style: data.style,
      },
    ];
  });

  // Example POST method implementation:
  function postData(data = null) {
    // Default options are marked with *
    fetch("/api/socket", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        console.log(response.body);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  const commands = [
    {
      name:"uname",
      function: (commandData) => {localUsername = commandData[0]; Cookies.set("uname", commandData[0], {SameSite:"None",secure:true})}
    }
  ];

  function postMessage() {
    // Input prompt to send messages to chat
    let messageBox = document.getElementById("messageBox").value;
    // Guard clause to stop empty messages
    if (!messageBox)
      return (messages = [
        ...messages,
        {
          style: "color: blue",
          user: "SYSTEM",
          content: "You cannot send a blank message.",
        },
      ]);

    // Check for command
    if (messageBox.startsWith("/")) {
      // Format messageBox's value into an array for use with commands
      let msgBoxFmt = messageBox.substring(1).split(" ");

      let toFind = msgBoxFmt.shift();

      let command = commands.find((cmd) => toFind == cmd.name);
      if (!command)
        messages = [
          ...messages,
          {
            style: "color: red",
            content: "Not a command!",
            user: "SYSTEM",
          },
        ];
      command.function(msgBoxFmt);
      return;
    }

    postData({
      content: messageBox,
      username: localUsername,
    });
    document.getElementById("messageBox").value = null;
  }
</script>

<main>
  <ol>
    <!--Loop through array -- add each message as an item-->
    {#each messages as message}
      <li>
        <p style={message.style}>
          {message.user} says :: {message.content}
        </p>
      </li>
    {/each}
  </ol>
  <!--Input prompt to send messages to chat-->
  <input type="text" id="messageBox" /><button on:click={postMessage}
    >Send</button
  >
</main>
