<template>
  <main>
    <RouterLink to="/login">Login</RouterLink>
    <RouterLink to="/signup">Registrarse</RouterLink>
    <RouterLink to="/chat">Chat</RouterLink>
    <RouterView />
  </main>
</template>

<script>
import Login from './views/Login.vue';
import Signup from './views/Signup.vue';
import Chat from './views/Chat.vue';
//import io from 'socket.io-client';

export default {
  components: {
    Login,
    Signup,
    Chat
  },
  data: () => ({

  }),
  setup() {
    // const socket = io('http://localhost:3000');

    // socket.on('message', message => {
    //   console.log(message);
    // });
  }
};
</script>

<style scoped>
main {
  background-color: #232323;
}
</style>