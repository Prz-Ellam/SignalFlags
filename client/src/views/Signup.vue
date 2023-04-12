<template>
  <section class="container bg-accent my-3 rounded-3">
    <div class="row d-flex justify-content-center">
      <form @submit.prevent="submitSignup" novalidate class="p-5 col-lg-5 col-md-9">
        <RouterLink to="/" class="d-flex justify-content-center">
          <img
            src="@/assets/images/POI_SignalFalgs.png"
            alt="Logo"
            class="w-25 img-fluid"
          >
        </RouterLink>
        <h1 class="text-center mb-4">Registrate</h1>

        <ProfilePicture 
          @update="update"  
        />
        <small class="d-block text-center text-danger mb-4" v-if="v$.avatar.$dirty && v$.avatar.required.$invalid">La foto de
          perfil es requerida</small>

        <input type="hidden" name="" v-model="avatar">

        <div class="mb-4">
          <label for="email" role="button" class="form-label">
            Correo electrónico
          </label>
          <input v-model="email" type="email" name="email"
            class="bg-secondary form-control rounded-4" placeholder="example@domain.com">
          <small class="text-danger" v-if="v$.email.$dirty && v$.email.required.$invalid">El corre electrónico es
            requerido</small>
          <small class="text-danger" v-if="v$.email.$dirty && v$.email.email.$invalid">El corre electrónico no es
            válido</small>
        </div>
        <div class="mb-4">
          <label for="username" role="button" class="form-label">Nombre de usuario</label>
          <input v-model="username" type="text" name="username"
            class="bg-secondary form-control rounded-4">
          <small class="text-danger" v-if="v$.username.$dirty && v$.username.required.$invalid">El nombre de
            usuario es
            requerido</small>
          <small class="text-danger" v-if="v$.username.$dirty && v$.username.minLength.$invalid">El nombre de
            usuario debe
            tener al menos 3 caracteres</small>
        </div>

        <div class="mb-4">
          <label for="password" role="button" class="form-label">Contraseña</label>
          <input v-model="password" type="password" name="password"
            class="bg-secondary form-control rounded-4">
          <small class="text-danger" v-if="v$.password.$dirty && v$.password.required.$invalid">La contraseña es
            requerida</small>
          <small class="text-danger" v-if="v$.password.$dirty &&
            (v$.password.containsUpper.$invalid || v$.password.containsLower.$invalid ||
              v$.password.containsNumber.$invalid || v$.password.containsSpecialChars.$invalid ||
              v$.password.minLength.$invalid) && password !== ''">La contraseña no cumple con los parametros
            solicitados</small>

          <ul class="mt-2">
            <li :class="(password !== '') ? (v$.password.containsUpper.$invalid) ? 'text-danger' : 'text-success' : ''">
              Contiene mayúsculas</li>
            <li :class="(password !== '') ? (v$.password.containsLower.$invalid) ? 'text-danger' : 'text-success' : ''">
              Contiene minúsculas</li>
            <li :class="(password !== '') ? (v$.password.containsNumber.$invalid) ? 'text-danger' : 'text-success' : ''">
              Contiene números</li>
            <li
              :class="(password !== '') ? (v$.password.containsSpecialChars.$invalid) ? 'text-danger' : 'text-success' : ''">
              Contiene carácteres especiales</li>
            <li :class="(password !== '') ? (v$.password.minLength.$invalid) ? 'text-danger' : 'text-success' : ''">
              Contiene más de 8 caracteres</li>
          </ul>
        </div>

        <div class="mb-5">
          <label for="confirm-password" role="button" class="form-label">Confirmar contraseña</label>
          <input v-model="confirmPassword" type="password" name="confirm-password"
            class="bg-secondary form-control rounded-4">
          <small class="text-danger" v-if="v$.confirmPassword.$dirty && v$.confirmPassword.required.$invalid">La
            contraseña es requerida</small>
          <small class="text-danger"
            v-if="v$.confirmPassword.$dirty && (v$.confirmPassword.sameAsPassword.$invalid && confirmPassword !== '')">La
            confirmación de contraseña no coincide con la contraseña</small>
        </div>
        <div class="d-grid mb-4">
          <button type="submit" class="btn btn-primary rounded-pill text-white">Registrarse</button>
        </div>

        <div class="text-center">
          <p class="text-white mb-0">¿Ya tienes una cuenta?</p>
          <RouterLink to="/login">
            ¡Inicia sesión aquí!
          </RouterLink>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import Swal from 'sweetalert2';
import { useVuelidate } from '@vuelidate/core';
import { required, email, minLength, sameAs } from '@vuelidate/validators';
import { createUser } from '@/services/user.service';
import io from 'socket.io-client';
import UserService from '@/services/user.service';

import ProfilePicture from '@/components/ProfilePicture.vue';

const containsUpper = (value) => /[A-Z]/.test(value);
const containsLower = (value) => /[a-z]/.test(value);
const containsNumber = (value) => /[0-9]/.test(value);
const containsSpecialChars = (value) => /[°|¬!"#$%&/()=?¡'¿¨*\]´+}~`{[^;:_,.\-<>@]/.test(value);

export default {
  components: {
    ProfilePicture
  },
  setup() {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      avatar: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  },
  validations() {
    return {
      avatar: {
        required
      },
      username: {
        required,
        minLength: minLength(3)
      },
      email: {
        required,
        email
      },
      password: {
        required,
        containsUpper,
        containsLower,
        containsNumber,
        containsSpecialChars,
        minLength: minLength(8)
      },
      confirmPassword: {
        required,
        sameAsPassword: sameAs(this.password)
      }
    }
  },
  methods: {
    update(image) {
      console.log(image);
      this.avatar = image;
    },
    async submitSignup(event) {
      this.v$.$touch();
      if (this.v$.$error) {
        await Swal.fire({
            icon: 'error',
            title: '...Opps',
            html: '<span class="text-light">Faltan parametros</span>',
            confirmButtonColor: "#F23F43",
            background: "#38393B",
            customClass: {
                title: 'text-light',
                text: 'text-light',
                confirmButton: 'btn btn-danger text-light shadow-none rounded-pill'
            },
        });
        return;
      }

      const user = {
        avatar: this.avatar,
        email: this.email,
        username: this.username,
        password: this.password,
        confirmPassword: this.confirmPassword
      }
      //await UserService.create(user);
      const response = await createUser(user);
      if (response?.status) {
        this.$store.dispatch('setToken', response.token);
        this.$store.dispatch('setUser', response.user);
        localStorage.setItem('token', response.token);
        
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
      else {
        await Swal.fire({
            icon: 'error',
            title: response.message,
            confirmButtonColor: "#F23F43",
            background: "#38393B",
            customClass: {
                title: 'text-white',
                text: 'text-white',
                confirmButton: 'btn btn-danger text-white shadow-none rounded-pill'
            },
        });
      }
    }
  }
};
</script>

<style scoped>
</style>