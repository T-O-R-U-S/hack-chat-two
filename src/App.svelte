<script>
  import 'https://js.pusher.com/5.0/pusher.min.js';
  import { onMount } from "svelte";
  export let date;

  Pusher.logToConsole = true;
  
  let pusher = new Pusher('a992f09a2d49b2381347', {
      cluster: 'ap2'
    });

    var channel = pusher.subscribe('my-channel');
    
    channel.bind('my-event', function(data) {
      alert(JSON.stringify(data));
    });

  onMount(async () => {
    const res = await fetch("/api/date");
    const newDate = await res.text();
    date = newDate;
  });
</script>

<main>
  <ul>
    
  </ul>
</main>
