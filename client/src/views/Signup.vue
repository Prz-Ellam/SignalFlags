<template>
	<section class="container bg-accent my-3 rounded-3">
		<div class="row d-flex justify-content-center">
			<form @submit.prevent="createUser" novalidate class="p-5 col-lg-5 col-md-9 shadow-none">
				<div class="d-flex justify-content-center">
          <img
          src="../assets/images/POI_SignalFalgs.png"
          alt=""
          class="w-25 img-fluid"
          >
        </div>
        <h1 class="text-center mb-4">Registrate</h1>

				<div class="form-group text-center mb-4">
          <div class="position-relative">
            <label for="profile-picture" role="button"
              class="profile-picture-label text-white position-absolute rounded-circle"></label>
            <img class="img img-fluid rounded-circle mb-1" id="picture-box" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              alt="Profile picture">
          </div>
          <input type="file" accept="image/png, image/gif, image/jpeg, image/jpg"
            class="form-control position-absolute" 
            name="profile-picture" id="profile-picture"
            autocomplete="off"
						@change="uploadProfilePicture"
          >
          <label for="profile-picture" role="button">Foto de perfil</label>
        </div>

				<input
					type="hidden"
					name=""
					v-model="profilePicture"
				>
				<small class="text-danger" v-if="v$.profilePicture.$dirty && v$.profilePicture.required.$invalid">La foto de perfil es requerida</small>
				
				<div class="mb-4">
					<label for="email" role="button" class="form-label text-white">
						Correo electrónico
					</label>
					<input
						v-model="email"
						type="email"
						name="email"
						id="email"
						class="bg-secondary form-control text-white rounded-4"
						placeholder="example@domain.com"
					>
					<small class="text-danger" v-if="v$.email.$dirty && v$.email.required.$invalid">El corre electrónico es requerido</small>
					<small class="text-danger" v-if="v$.email.$dirty && v$.email.email.$invalid">El corre electrónico no es válido</small>
				</div>
				<div class="mb-4">
					<label for="username" role="button" class="form-label">Nombre de usuario</label>
					<input
						v-model="username"
						type="text"
						name="username"
						id="username"
						class="bg-secondary form-control text-white rounded-4"
					>
					<small class="text-danger" v-if="v$.username.$dirty && v$.username.required.$invalid">El nombre de usuario es requerido</small>
					<small class="text-danger" v-if="v$.username.$dirty && v$.username.minLength.$invalid">El nombre de usuario debe tener al menos 3 caracteres</small>
				</div>
				
				<div class="mb-4">
					<label for="password" role="button" class="form-label text-white">Contraseña</label>
					<input
						v-model="password"
						type="password"
						name="password"
						id="password"
						class="bg-secondary form-control text-white rounded-4"
					>
					<small class="text-danger" v-if="v$.password.$dirty && v$.password.required.$invalid">La contraseña es requerida</small>
					<small class="text-danger" 
					v-if="v$.password.$dirty && 
					(v$.password.containsUpper.$invalid || v$.password.containsLower.$invalid ||
					v$.password.containsNumber.$invalid || v$.password.containsSpecialChars.$invalid ||
					v$.password.minLength.$invalid) && password !== ''">La contraseña no cumple con los parametros solicitados</small>
				</div>
				<ul>
					<li :class="(password !== '') ? (v$.password.containsUpper.$invalid) ? 'text-danger' : 'text-success' : ''">Contiene mayúsculas</li>
					<li :class="(password !== '') ? (v$.password.containsLower.$invalid) ? 'text-danger' : 'text-success' : ''">Contiene minúsculas</li>
					<li :class="(password !== '') ? (v$.password.containsNumber.$invalid) ? 'text-danger' : 'text-success' : ''">Contiene números</li>
					<li :class="(password !== '') ? (v$.password.containsSpecialChars.$invalid) ? 'text-danger' : 'text-success' : ''">Contiene carácteres especiales</li>
					<li :class="(password !== '') ? (v$.password.minLength.$invalid) ? 'text-danger' : 'text-success' : ''">Contiene más de 8 caracteres</li>
				</ul>

				<div class="mb-5">
					<label for="confirm-password" role="button" class="form-label text-white">Confirmar contraseña:</label>
					<input
						v-model="confirmPassword"
						type="password"
						name="confirm-password"
						id="confirm-password"
						class="bg-secondary form-control text-white rounded-4"
					>
					<small class="text-danger" v-if="v$.confirmPassword.$dirty && v$.confirmPassword.required.$invalid">La contraseña es requerida</small>
					<small class="text-danger" v-if="v$.confirmPassword.$dirty && (v$.confirmPassword.sameAsPassword.$invalid && confirmPassword !== '')">La confirmación de contraseña no coincide con la contraseña</small>
				</div>
				<div class="d-grid mb-4">
					<button type="submit" class="btn btn-primary rounded-pill text-white">Registrarse</button>
				</div>

				<div class="text-center">
          <p class="text-white mb-0">¿Ya tienes una cuenta?</p>
          <RouterLink
            to="/login"
            class=""
          >
            ¡Inicia sesión aquí!
          </RouterLink>
        </div>
			</form>
		</div>
	</section>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength, sameAs } from '@vuelidate/validators'

import User from '../models/login';
import { createUser } from '../services/user.service';

const mustBeCool = (value) => value.indexOf('cool') >= 0;
const containsUpper = (value) => /[A-Z]/.test(value);
const containsLower = (value) => /[a-z]/.test(value);
const containsNumber = (value) => /[0-9]/.test(value);
const containsSpecialChars = (value) => /[°|¬!"#$%&/()=?¡'¿¨*\]´+}~`{[^;:_,.\-<>@]/.test(value);

export default {
	setup() {
    return { v$: useVuelidate() }
  },
	data() {
		return {
			profilePicture: '',
			username: '',
			email: '',
			password: '',
			confirmPassword: ''
		}
	},
	validations() {
		return {
			profilePicture: {
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
		async createUser(event) {
			this.v$.$touch();
			if (this.v$.$error) {
				console.log(this.v$);
			}
			else {
				alert('No fallo');
			}

			//console.log(await createUser(this.user));
		},
		readFileAsync(file) {
			return new Promise((resolve, reject) => {
					const fileReader = new FileReader();
					fileReader.onload = () => {
							resolve(fileReader.result);
					};
					fileReader.onerror = reject;
					fileReader.readAsDataURL(file);
			});
		},
		async uploadProfilePicture(event) {
			const pictureBox = document.getElementById('picture-box');
			const defaultImage = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';
			try {
					const files = Array.from(event.target.files);
					if (files.length === 0) {
							pictureBox.src = defaultImage;
							this.profilePicture = null;
							return;
					}
					const file = files[0];

					const size = parseFloat((file.size / 1024.0 / 1024.0).toFixed(2));
					if (size > 8.0) {
							pictureBox.src = defaultImage;
							this.profilePicture = null;
							return;
					}

					const allowedExtensions = /(jpg|jpeg|png|gif)$/i;
					if (!allowedExtensions.exec(file.type)) {
							pictureBox.src = defaultImage;
							this.profilePicture = null;
							return;
					}
					const dataUrl = await this.readFileAsync(file);
					pictureBox.src = dataUrl;
					this.profilePicture = file;
			}
			catch (exception) {
					console.log(exception);
					pictureBox.src = defaultImage;
					this.profilePicture = null;
			}
		}
	}
};
</script>

<style scoped>
.img {
    width: 128px;
    height: 128px;
    object-fit: cover;
}

.profile-picture-label {
    width: 128px; 
    height: 128px;
    line-height: 128px;
}

.profile-picture-label:hover::after {
    content: 'Foto de perfil'
}

.profile-picture-label:hover {
    background-color: rgba(48, 133, 214, 0.5);
}

#profile-picture, #edit-profile-picture, #upload-image {
    scale: 0.01;
}
</style>