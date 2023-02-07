<template>
  <div>
    <h1>Hello World</h1>
  </div>
</template>

<script>
  import io from 'socket.io-client';

  export default {
  data: () => ({
    
  }),
  setup() {
    const socket = io('http://localhost:3000');

    socket.on('message', message => {
      console.log(message);
    });
  }
};
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
