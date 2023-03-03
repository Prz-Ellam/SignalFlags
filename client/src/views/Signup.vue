<template>
	<section class="container bg-accent my-3 rounded-3">
		<div class="row d-flex justify-content-center">
			<form @submit.prevent="createUser" class="p-5 col-lg-5 col-md-9 shadow-none">
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
				
				<div class="mb-4">
					<label for="email" role="button" class="form-label text-white">
						Correo electrónico
					</label>
					<input
						v-model="user.email"
						type="email"
						name="email"
						id="email"
						class="bg-secondary form-control text-white rounded-4"
						placeholder="example@domain.com"
						required
					>
				</div>
				<div class="mb-4">
					<label for="username" role="button" class="form-label">Nombre de usuario</label>
					<input
						v-model="user.username"
						type="text"
						name="username"
						id="username"
						minlength="3"
						class="bg-secondary form-control text-white rounded-4"
						required
					>
				</div>
				<div class="mb-4">
					<label for="password" role="button" class="form-label text-white">Contraseña</label>
					<input
						v-model="user.password"
						type="password"
						name="password"
						id="password"
						class="bg-secondary form-control text-white rounded-4"
						required
						maxlength="20"
						pattern="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[\W_])\S{8,20}$" 
					>
				</div>
				<div class="mb-5">
					<label for="confirm-password" role="button" class="form-label text-white">Confirmar contraseña:</label>
					<input
						v-model="confirmPassword"
						type="password"
						name="confirm-password"
						id="confirm-password"
						class="bg-secondary form-control text-white rounded-4"
						required
						maxlength="20"
						pattern="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[\W_])\S{8,20}$" 
					>
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
							return;
					}
					const file = files[0];

					const size = parseFloat((file.size / 1024.0 / 1024.0).toFixed(2));
					if (size > 8.0) {
							pictureBox.src = defaultImage;
							return;
					}

					const allowedExtensions = /(jpg|jpeg|png|gif)$/i;
					if (!allowedExtensions.exec(file.type)) {
							pictureBox.src = defaultImage;
							return;
					}
					const dataUrl = await this.readFileAsync(file);
					pictureBox.src = dataUrl;
			}
			catch (exception) {
					console.log(exception);
					pictureBox.src = defaultImage;
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