<script>
  import "https://js.pusher.com/5.0/pusher.min.js";

  const privateChannelCode = Math.random().toString(18).substring(2);

  let messages = [
    {
      user: "SYSTEM",
      content: "use /signup <USERNAME> to get a username!",
      style: "color: yellow"
    },
  ];

  Pusher.logToConsole = true;

  let pusher = new Pusher("a992f09a2d49b2381347", {
    cluster: "ap2",
  });

  const channel = pusher.subscribe("message-channel");

  channel.bind("message", function (data) {
    appendMessage(data);
  });

  function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  // Example POST method implementation:
  function postData(data = null) {
    // Default options are marked with *
    fetch("http://localhost:3000/api/socket", {
      method: "POST",
      headers: {
        cookie:
          "login=-4NHic%2BjApI8jGbW%3DE(1iR8En)nbAf5(-ERUSDGFW%24JGhkPudkZP4K*T)55rP3BK",
        "Content-Type": "application/json",
      },
      body:
        JSON.stringify(data),
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function appendMessage(newMessage) {
    messages = [
      ...messages,
      {
        user: newMessage.user,
        content: newMessage.content,
        style: newMessage.style,
      },
    ];
  }

  const commands = [
    {
      name: "signup",
      function: signUp(command)
    }
  ]

  function postMessage() {
    let messageBox = document.getElementById("messageBox");

    if(messageBox.value.startsWith("\\")) {
      let command = commands.find(cmd => messageBox.value.substring(1) == cmd.name);
      if(!command) messages = [...messages, {
        style: "color: red",
        content: "Not a command!",
        user: "SYSTEM"
      }]
      command.function();
    }

    postData({
      "content": messageBox.value,
      "token": getCookie("login"),
    });
    messageBox.value = null;
  }
  function signUp(command){
    // Default options are marked with *
    fetch("http://localhost:3000/api/account", {
      method: "POST",
      headers: {
        cookie:
          "login=-4NHic%2BjApI8jGbW%3DE(1iR8En)nbAf5(-ERUSDGFW%24JGhkPudkZP4K*T)55rP3BK",
        "Content-Type": "application/json",
      },
      body:
        JSON.stringify(data),
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.error(err);
      });
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
  <input type="text" id="messageBox"><button on:click={postMessage}>Send</button>
</main>
