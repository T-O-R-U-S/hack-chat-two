<script>
  import "https://js.pusher.com/5.0/pusher.min.js";

  let messages = [
    {
      user: "idk",
      content: "idk man",
    },
  ];

  Pusher.logToConsole = true;

  let pusher = new Pusher("a992f09a2d49b2381347", {
    cluster: "ap2",
  });

  var channel = pusher.subscribe("message-channel");

  channel.bind("message", function (data) {
    appendMessage(data);
  });

  function appendMessage(newData) {
    messages=[...messages, {
      user: newData.user,
      content: newData.content,
      style: (newData?.style ? newData.style : "")
    }];
    console.log(messages);
  }
</script>

<main>
  <ol>
    {#each messages as message}
    <li>
      <p style={message.style}>
        {message.user} says :: {message.content}
      </p>
    </li>
      
    {/each}
  </ol>
</main>
