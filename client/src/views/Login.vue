<template>
  <section class="container">
    <div class="row d-flex align-items-center justify-content-center vh-100">
      <form @submit.prevent="loginUser" class="bg-light rounded-1 p-5 col-lg-5 col-md-9 shadow-lg">
        <div class="mb-4">
          <label for="email" role="button" class="form-label">Correo electrónico:</label>
          <input v-model="login.email" type="email" name="email" id="email" class="form-control shadow-none"
            placeholder="example@domain.com">
        </div>
        <div class="mb-4">
          <label for="password" role="button" class="form-label">Contraseña:</label>
          <input v-model="login.password" type="password" name="password" id="password"
            class="form-control shadow-none">
        </div>
        <div class="d-grid mb-4">
          <button type="submit" class="btn btn-primary">Registrarse</button>
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