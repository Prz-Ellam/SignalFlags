<template>
	<section class="container bg-dark">
		<div class="row d-flex align-items-center justify-content-center vh-100">
			<form @submit.prevent="createUser" class="bg-light rounded-1 p-5 col-lg-5 col-md-9">
				<div class="mb-4">
					<label for="email" role="button" class="form-label text-white">Correo electrónico:</label>
					<input v-model="user.email" type="email" name="email" id="email" class="bg-secondary form-control border-0 shadow-none text-white"
						placeholder="example@domain.com">
				</div>
				<div class="mb-4">
					<label for="email" role="button" class="form-label text-white">Nombre de usuario:</label>
					<input v-model="user.username" type="text" name="text" id="text" class="bg-secondary form-control border-0 shadow-none text-white">
				</div>
				<div class="mb-4">
					<label for="email" role="button" class="form-label text-white">Contraseña:</label>
					<input v-model="user.password" type="password" name="password" id="password" class="bg-secondary form-control border-0 shadow-none text-white">
				</div>
				<div class="mb-4">
					<label for="email" role="button" class="form-label text-white">Confirmar contraseña:</label>
					<input v-model="confirmPassword" type="password" name="confirm-password" id="confirm-password"
						class="bg-secondary form-control border-0 shadow-none text-white">
				</div>
				<div class="d-grid mb-4">
					<button type="submit" class="btn btn-primary rounded-5">Registrarse</button>
				</div>
			</form>
		</div>
	</section>
</template>

<script>
import User from '../models/login';
import { createUser } from '../services/user.service';

export default {
	data() {
		return {
			user: new User('', '', ''),
			confirmPassword: ''
		}
	},
	methods: {
		async createUser(event) {
			console.log(await createUser(this.user));
		}
	}
};
</script>

<style scoped>

</style>