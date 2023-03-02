<template>
  <section class="container bg-dark my-4 rounded-3">
    <div class="row d-flex justify-content-center">
      <form @submit.prevent="loginUser" class="p-5 col-lg-5 col-md-7">
        <RouterLink to="/home" class="d-flex justify-content-center">
          <img
            src="../assets/images/POI_SignalFalgs.png"
            alt="Logo"
            class="w-50 img-fluid"
          >
        </RouterLink>
        <h1 class="text-center mb-4">Inicia sesión</h1>
          
        <div class="mb-4">
          <label for="email" role="button" class="form-label text-white">Correo electrónico:</label>
          <input
            v-model="login.email"
            type="email"
            name="email"
            id="email"
            class="bg-secondary form-control text-white rounded-4"
            placeholder="example@domain.com"
          >
        </div>
        <div class="mb-5">
          <label for="password" role="button" class="form-label text-white">Contraseña:</label>
          <input
            v-model="login.password"
            type="password"
            name="password"
            id="password"
            class="bg-secondary form-control border-0 shadow-none rounded-4"
          >
        </div>
        <div class="d-grid mb-4">
          <button type="submit" class="btn btn-primary rounded-pill text-white">Inicia sesión</button>
        </div>

        <div class="text-center">
          <p class="text-white mb-0">¿Aún no tienes cuenta?</p>
          <RouterLink
            to="/signup"
          >
            ¡Registrate aquí!
          </RouterLink>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import User from '@/models/login';

export default {
  data() {
    return {
      login: new User('', '')
    }
  },
  methods: {
    loginUser(event) {
      console.log(this.login.email);
    }
  }
};
</script>

<style scoped>

</style>