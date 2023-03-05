<template>
	<div class="bg-dark container-fluid h-100 ">
		<div class="row h-100">
			<section class="col-md-4 col-sm-12 bg-dark h-100 d-flex align-items-center">
				 <div class="bg-accent d-flex flex-column w-100 rounded-3 p-3" style="height: 95%;">
					<h2 class="text-center mb-0">Contactos</h2>
					<hr>
					<input type="search" name="search" class="bg-secondary form-control shadow-none text-white rounded-4 mb-1"
						placeholder="Buscar personas...">
					<div class="overflow-auto chat">
						<ChatContact 
							v-for="i in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
							image="https://i.kym-cdn.com/photos/images/facebook/001/884/907/c86.jpg" 
							@click="sendAlert"
						/>	
					</div>
				</div>
			</section>

			<section class="bg-dark col-sm-12 col-md h-100 d-flex align-items-center ps-0 pe-0 pe-md-2">
				<section class="bg-accent d-flex flex-column col w-100 rounded-3 my-3" style="height: 95%">

					<div class="d-flex justify-content-between align-items-center mt-3 px-3">

						<div class="d-flex align-items-center ">
							<img class="img-fluid rounded-circle actual-chat-user-image"
								src="https://i.kym-cdn.com/photos/images/facebook/001/884/907/c86.jpg" alt="Perfil">
							<span class="h5 ms-3 mb-0">Saul Goodman</span>
						</div>
						<div>
							<button class="btn border-0 position-relative me-3">
								<i class="h4 bi bi-telephone" style="color: #6D6F7D"></i>
							</button>
							<button class="btn border-0 position-relative fw-bold">
								<i class="h4 bi bi-camera-video" style="color: #6D6F7D"></i>
							</button>
						</div>
					</div>
					<hr class="mx-3">
					<div class="overflow-auto p-2 h-100 chat">

						<div v-for="i in [1, 2, 3, 4, 5, 6, 7, 8, 9]" class="d-flex justify-content-end my-3">
							<small class="bg-primary text-light p-2 rounded-pill overflow-auto" data-bs-toggle="tooltip"
								data-bs-placement="left" data-bs-title="26 de enero de 2023 a las 02:21">
								message
							</small>
						</div>

						<div class="d-flex justify-content-start my-3">
							<small class="bg-dark text-light p-2 rounded-pill overflow-auto" data-bs-toggle="tooltip"
								data-bs-placement="right" data-bs-title="26 de enero de 2023 a las 02:21">
								message
							</small>
						</div>

					</div>
					<hr class="mb-1 text-light">
					<div class="input-group mb-1 p-2">
						<button class="btn border-0" style="transform: rotateY(0deg) rotate(45deg);">
							<i class="h4 mb-0 me-1 bi bi-paperclip" style="color: #6D6F7D"></i>
						</button>
						<input type="text" id="message" class="bg-secondary form-control border-0 shadow-none text-white rounded-4"
							placeholder="Escribe un mensaje" aria-label="Enviar mensaje" aria-describedby="basic-addon2">

					</div>
				</section>
			</section>
		</div>
	</div>
</template>

<script>
import ChatContact from '../components/ChatContact.vue';

export default {
	components: {
		ChatContact
	},
	data() {
		return {

		}
	},
	methods: {
		sendAlert(num) {
			console.log(num);
		}
	}
}
</script>

<style scoped>
.dot {
	position: absolute;
	bottom: 0;
	left: 50%;
	height: 10px;
	width: 10px;
	background-color: #00ff00;
	border-radius: 50%;
	display: inline-block;
}

.chat-drawer:hover {
	background-color: #232323;
	cursor: pointer;
}

.chat-drawer a div img {
	width: 40px;
	height: 40px;
	object-fit: cover;
}

.chat-drawer a div div {
	text-overflow: ellipsis;
}

.chat-drawer adiv div small {
	overflow: hidden;
	text-overflow: ellipsis;
}

.chat-drawer a div div p {
	overflow: hidden;
	text-overflow: ellipsis;
}



.actual-chat-user-image {
	width: 38px;
	height: 38px;
	object-fit: cover;
}



.visibility-hidden {
	visibility: hidden;
}

.chat {
	scrollbar-color: #FFB800 #6D6F7D !important;
	scrollbar-width: thin !important;

}

.chat::-webkit-scrollbar {
	width: 8px;
	border-radius: 1em;
	background-color: #6D6F7D;
	border-radius: 1em;
}


.chat::-webkit-scrollbar-thumb {

	border-radius: 1em;
	background-color: #6D6F7D;
	background: #FFB800;
	border-radius: 1em;
}

.chat::-webkit-scrollbar-thumb:hover {
	visibility: visible;
	background: #FFB800;
}
</style>