<template>
	<section class="container">
		<div class="row d-flex align-items-center justify-content-center vh-100">
			<form @submit.prevent="createUser" class="bg-light rounded-1 p-5 col-lg-5 col-md-9 shadow-lg">
				<div class="mb-4">
					<label for="email" role="button" class="form-label">Correo electrónico:</label>
					<input v-model="user.email" type="email" name="email" id="email" class="form-control shadow-none"
						placeholder="example@domain.com">
				</div>
				<div class="mb-4">
					<label for="email" role="button" class="form-label">Nombre de usuario:</label>
					<input v-model="user.username" type="text" name="text" id="text" class="form-control shadow-none">
				</div>
				<div class="mb-4">
					<label for="email" role="button" class="form-label">Contraseña:</label>
					<input v-model="user.password" type="password" name="password" id="password" class="form-control shadow-none">
				</div>
				<div class="mb-4">
					<label for="email" role="button" class="form-label">Confirmar contraseña:</label>
					<input v-model="confirmPassword" type="password" name="confirm-password" id="confirm-password"
						class="form-control shadow-none">
				</div>
				<div class="d-grid mb-4">
					<button type="submit" class="btn btn-primary">Registrarse</button>
				</div>
			</form>
		</div>
	</section>
</template>

<script>
import User from '../models/login';
import { createUser } from '../services/user.service';

export default {
	data: () => {
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