<template>
  <section class="container bg-dark">
    <div class="row d-flex align-items-center justify-content-center vh-100">
      <form @submit.prevent="loginUser" class="rounded-1 p-5 col-lg-5 col-md-9 shadow-none">
        <div class="mb-4">
          <label for="email" role="button" class="form-label text-white">Correo electrónico:</label>
          <input v-model="login.email" type="email" name="email" id="email" class="bg-secondary form-control border-0 shadow-none text-white"
            placeholder="Correo electrónico">
        </div>
        <div class="mb-4">
          <label for="password" role="button" class="form-label text-white">Contraseña:</label>
          <input v-model="login.password" type="password" name="password" id="password"
            class="bg-secondary form-control border-0 shadow-none text-white"
            placeholder="">
        </div>
        <div class="d-grid mb-4">
          <button type="submit" class="btn btn-primary rounded-5 text-white">Registrarse</button>
        </div>
        <p>¿Aún no tienes cuenta?</p>
        <RouterLink to="/signup">Registrate aquí</RouterLink>
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