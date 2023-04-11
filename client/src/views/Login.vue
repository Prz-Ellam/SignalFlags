<template>
  <section class="container bg-accent my-4 rounded-3">
    <div class="row d-flex justify-content-center">
      <form @submit.prevent="loginUser" novalidate class="p-5 col-lg-5 col-md-7">
        <RouterLink to="/" class="d-flex justify-content-center">
          <img
            src="../assets/images/POI_SignalFalgs.png"
            alt="Logo"
            class="w-25 img-fluid"
          >
        </RouterLink>
        <h1 class="text-center mb-4">Inicia sesión</h1>
          
        <div class="mb-4">
          <label for="email" role="button" class="form-label">
            Correo electrónico
          </label>
          <input
            v-model="email"
            type="email"
            name="email"
            class="bg-secondary form-control rounded-4"
            placeholder="example@domain.com"
          >
          <small 
            class="text-danger" 
            v-if="v$.email.$dirty && v$.email.required.$invalid">
            El correo electrónico es requerido
          </small>
          <small 
            class="text-danger" 
            v-if="v$.email.$dirty && v$.email.email.$invalid">
            El correo electrónico no tiene el formato correcto
          </small>
        </div>

        <div class="mb-5">
          <label for="password" role="button" class="form-label">
            Contraseña
          </label>
          <input
            v-model="password"
            type="password"
            name="password"
            class="bg-secondary form-control rounded-4"
          >
          <small 
            class="text-danger" 
            v-if="v$.password.$dirty && v$.password.required.$invalid">
            La contraseña es requerida
          </small>
        </div>

        <div class="d-grid mb-4">
          <button type="submit" class="btn btn-primary rounded-pill text-light">
            Inicia sesión
          </button>
        </div>

        <div class="text-center">
          <p class="text-white mb-0">¿Aún no tienes cuenta?</p>
          <RouterLink to="/signup">
            ¡Registrate aquí!
          </RouterLink>
        </div>
        <hr>
        <a 
          href="#" 
          class="d-block text-center text-primary mt-3">
          ¿Olvidaste tu contraseña?
        </a>
      </form>
    </div>
  </section>
</template>

<script>
import { useVuelidate } from '@vuelidate/core';
import { required, email } from '@vuelidate/validators';
import { userLoginService } from '../services/user.service';
import io from 'socket.io-client';

export default {
  setup() {
		return { v$: useVuelidate() }
	},
  data() {
    return {
      email: '',
      password: ''
    }
  },
  validations() {
    return {
      email: {
        required,
        email
      },
      password: {
        required
      }
    }
  },
  methods: {
    async loginUser(event) {
      this.v$.$touch();
			if (this.v$.$error) {
        // SweetAlert
				return;
			}

      const response = await userLoginService({
        email: this.email,
        password: this.password
      });

      if (response?.status) {

        this.$store.dispatch('setToken', response.token);
        this.$store.dispatch('setUser', response.user);

        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));

        const token = response.token;
        const socket = io('/', { 
          auth: {
            token
          },
          transports: [ 'websocket' ]
        });
        window.socket = socket;

        this.$router.push('/');
      }
    }
  }
};
</script>
