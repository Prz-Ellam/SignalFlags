<template>
	<div class="d-flex flex-column vh-100">
		<div class="flex-grow-0 flex-shrink-1 header">
			<nav class="navbar navbar-expand-lg shadow-lg bg-accent">
				<div class="container-fluid">
					<RouterLink to="/home" class="navbar-brand text-light" href="#">
						<img src="../assets/images/Isotipo.png" alt="Bootstrap" width="30" height="30">
						SignalFlags
					</RouterLink>
					<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
						aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
						<span class="navbar-toggler-icon"></span>
					</button>
					<div class="collapse navbar-collapse" id="navbarSupportedContent">
						<form class="col-md-auto col-lg-6 col-xl-7 ms-auto " role="search" action="search.html">
							<div class="input-group">
								<input
									class="form-control bg-secondary shadow-none py-0"
									type="search"
									placeholder="Buscar..."
									aria-label="Buscar">
								<button class="btn btn-secondary border-0" type="button">
									<i class="h6 bi bi-search"></i>
								</button>
							</div>
						</form>
						<ul class="navbar-nav ms-auto d-lg-flex align-items-lg-center me-2">
							<li class="nav-item">
								<div class="nav-link dropdown">
									<button class="btn border-0 p-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
										<img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
											alt="Perfil" width="32" class="rounded-circle profile-picture">
									</button>
									<ul class="dropdown-menu dropdown-menu-end dropdown-menu-dark">
										<li>
											<a class="dropdown-item" href="instructor-profile.html">Mi perfil</a>
										</li>
										<li>
											<hr class="dropdown-divider">
										</li>
										<li>
											<a class="dropdown-item" href="#">Cerrar sesión</a>
										</li>
									</ul>
								</div>
							</li>

						</ul>
					</div>
				</div>
			</nav>
		</div>
		<div class="flex-grow-1 flex-shrink-1 overflow-auto">
			<div class="bg-dark container-fluid h-100">
				<div class="row h-100">
					<section class="col-auto d-none bg-accent d-sm-flex align-items-center text-center">
						<ul class="nav flex-column gap-5">
							<li class="nav-item">
								<a href="#" class="nav-icon">
									<i class="h2 bi bi-person-square"></i>
								</a>
							</li>
							<li class="nav-item">
								<a href="#" class="nav-icon">
									<i class="h2 bi bi-chat-dots"></i>
								</a>
							</li>
							<li class="nav-item">
								<a href="#" class="nav-icon">
									<i class="h2 bi bi-journal-check"></i>
								</a>
							</li>
							<li class="nav-item">
								<a href="#" class="nav-icon">
									<i class="h2 bi bi-gear"></i>
								</a>
							</li>
						</ul>
					</section>
					<section class="bg-dark d-none col-4 h-100 d-sm-flex align-items-center">

						<div class="bg-accent d-flex flex-column w-100 rounded-3 p-3" style="height: 95%;">
							<h2 class="text-center mb-0">Contactos</h2>
							<hr>
							<input type="search" name="search" class="bg-secondary form-control shadow-none text-white rounded-4 mb-1"
								placeholder="Buscar personas...">
							<div class="overflow-auto chat">
								<div v-for="i in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]" class="chat-drawer ps-1 py-2 pe-3 rounded-3">
									<a href="#" class="text-decoration-none d-flex justify-content-between align-items-center"
										data-bs-toggle="collapse" data-bs-target="chat-section" aria-expanded="false"
										aria-controls="collapseExample">
										<div class="d-flex flex-row flex-nowrap align-items-center overflow-hidden">
											<img src="https://i.kym-cdn.com/photos/images/facebook/001/884/907/c86.jpg" alt="avatar"
												class="rounded-circle d-flex align-self-center me-3 shadow-1-strong">
											<div class="overflow-hidden text-nowrap">
												<p class="h6 mb-0 text-light">Kevin Gold</p>
												<small class="text-primary mb-0 text-light">Hola, ¿cómo estas?</small>
											</div>
										</div>
										<div>
											<p class="small text-muted mb-1 text-end">23/02/21 04:00</p>
											<span class="badge rounded-pill bg-danger float-end">1</span>
										</div>
									</a>
								</div>
							</div>
						</div>
					</section>



					<section class="bg-dark col-sm-12 col-md h-100 d-flex align-items-center ps-0 pe-0 pe-md-2">
						<section class="bg-accent d-flex flex-column col w-100 rounded-3 my-3" style="height: 95%">

							<div class="d-flex justify-content-between align-items-center mt-3 px-3">

								<div class="d-flex align-items-center ">
									<img class="img-fluid rounded-circle actual-chat-user-image"
										src="https://i.kym-cdn.com/photos/images/facebook/001/884/907/c86.jpg" alt="Perfil">
									<span class="h5 ms-3 mb-0">Kevin Gold</span>
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
								<input type="text" id="message"
									class="bg-secondary form-control border-0 shadow-none text-white rounded-4"
									placeholder="Escribe un mensaje"
									aria-label="Enviar mensaje"
									aria-describedby="basic-addon2">
								
							</div>
						</section>
					</section>
				</div>
			</div>

		</div>
	</div>
	<!--
	<section class=" bg-dark container-fluid vh-100">
		<div class="row h-100">
			<div class="col-auto bg-secondary d-flex align-items-center text-center">
				<ul class="nav flex-column gap-5">
					<li class="nav-item">
						<a href="#" class="nav-icon">
							<i class="h2 bi bi-person-square"></i>
						</a>
					</li>
					<li class="nav-item">
						<a href="#" class="nav-icon">
							<i class="h2 bi bi-chat-dots"></i>
						</a>
					</li>
					<li class="nav-item">
						<a href="#" class="nav-icon">
							<i class="h2 bi bi-journal-check"></i>
						</a>
					</li>
					<li class="nav-item">
						<a href="#" class="nav-icon">
							<i class="h2 bi bi-gear"></i>
						</a>
					</li>
				</ul>
			</div>
			
			<section class="bg-dark col-4 h-100 d-flex align-items-center">

				<div class="bg-secondary d-flex flex-column w-100 rounded-3 p-3" style="height: 95%;">
					<h2 class="text-center pt-3 mb-0">Contactos</h2>
					<hr>
					<input type="search" name="search" class="bg-secondary form-control shadow-none text-white rounded-4 mb-1"
						placeholder="Buscar personas...">
					<div class="overflow-auto chat">
						<div v-for="i in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]" class="chat-drawer ps-1 py-2 pe-3 rounded-3">
							<a href="#" class="text-decoration-none d-flex justify-content-between align-items-center"
								data-bs-toggle="collapse" data-bs-target="chat-section" aria-expanded="false"
								aria-controls="collapseExample">
								<div class="d-flex flex-row flex-nowrap align-items-center overflow-hidden">
									<img src="https://i.kym-cdn.com/photos/images/facebook/001/884/907/c86.jpg" alt="avatar"
										class="rounded-circle d-flex align-self-center me-3 shadow-1-strong">
									<div class="overflow-hidden text-nowrap">
										<p class="h6 mb-0 text-white">Kevin Gold</p>
										<small class="text-primary mb-0 text-white">Hola, ¿cómo estas?</small>
									</div>
								</div>
								<div>
									<p class="small text-muted mb-1 text-end">23/02/21 04:00</p>
									<span class="badge rounded-pill bg-danger float-end">1</span>
								</div>
							</a>
						</div>
					</div>
					<br>
				</div>
			</section>



			<section class="bg-dark col h-100 d-flex align-items-center">
				<section class="bg-secondary d-flex flex-column col w-100 rounded-3 my-3" style="height: 95%">

					<div class="d-flex justify-content-between align-items-center mt-3 px-3">

						<div class="d-flex align-items-center ">
							<img class="img-fluid rounded-circle actual-chat-user-image"
								src="https://i.kym-cdn.com/photos/images/facebook/001/884/907/c86.jpg" alt="Perfil">
							<span class="h5 ms-3 mb-0">Kevin Gold</span>
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
					<hr>
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
					<div class="input-group mb-3">
						<input type="text" id="message" class="bg-secondary form-control border-0 shadow-none text-white rounded-4"
							placeholder="Escribe un mensaje" aria-label="Enviar mensaje" aria-describedby="basic-addon2">
						<button class="btn btn-primary shadow-none" id="send-message"><i class="bx bxs-send"></i></button>
					</div>
				</section>
			</section>
		</div>
	</section>
-->



	<!--
	<section class="bg-dark container-fluid">
		<div class="row vh-100">

			<section class="d-flex align-items-center col-auto h-100 bg-secondary text-center">
				<ul class="nav flex-column align-items-center">
					<li class="nav-item py-5">
						<a class="nav-link active" href="#">
							<svg xmlns="http://www.w3.org/2000/svg" width="24" fill="grey" class="nav-icon bi bi-person-square"
								viewBox="0 0 16 16">
								<path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
								<path
									d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12z" />
							</svg>
						</a>
					</li>
					<li class="nav-item py-5">
						<a class="nav-link" href="#">
							<svg xmlns="http://www.w3.org/2000/svg" width="24" fill="grey" class="nav-icon bi bi-chat-dots"
								viewBox="0 0 16 16">
								<path
									d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
								<path
									d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9.06 9.06 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.437 10.437 0 0 1-.524 2.318l-.003.011a10.722 10.722 0 0 1-.244.637c-.079.186.074.394.273.362a21.673 21.673 0 0 0 .693-.125zm.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6c0 3.193-3.004 6-7 6a8.06 8.06 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a10.97 10.97 0 0 0 .398-2z" />
							</svg>
						</a>
					</li>
					<li class="nav-item py-5">
						<a class="nav-link" href="#">
							<svg xmlns="http://www.w3.org/2000/svg" width="24" fill="grey" class="nav-icon bi bi-journal-check"
								viewBox="0 0 16 16">
								<path fill-rule="evenodd"
									d="M10.854 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 8.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
								<path
									d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z" />
								<path
									d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z" />
							</svg>
						</a>
					</li>
					<li class="nav-item py-5">
						<a class="nav-link" href="#">
							<svg xmlns="http://www.w3.org/2000/svg" width="24" fill="grey" class="nav-icon bi bi-gear"
								viewBox="0 0 16 16">
								<path
									d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
								<path
									d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
							</svg>
						</a>
					</li>
				</ul>
			</section>

			<section class="bg-dark col-4 h-100 d-flex align-items-center">

				<div class="bg-secondary d-flex flex-column w-100 rounded-3 p-3" style="height: 95%;">
					<h2 class="text-center pt-3 mb-0">Contactos</h2>
					<hr>
					<input type="search" name="search" class="bg-secondary form-control shadow-none text-white rounded-4 mb-1"
						placeholder="Buscar personas...">
					<div class="overflow-auto chat">
						<div v-for="i in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]" class="chat-drawer ps-1 py-2 pe-3 rounded-3">
							<a href="#" class="text-decoration-none d-flex justify-content-between align-items-center"
								data-bs-toggle="collapse" data-bs-target="chat-section" aria-expanded="false"
								aria-controls="collapseExample">
								<div class="d-flex flex-row flex-nowrap align-items-center overflow-hidden">
									<img src="https://i.kym-cdn.com/photos/images/facebook/001/884/907/c86.jpg" alt="avatar"
										class="rounded-circle d-flex align-self-center me-3 shadow-1-strong">
									<div class="overflow-hidden text-nowrap">
										<p class="h6 mb-0 text-white">Kevin Gold</p>
										<small class="text-primary mb-0 text-white">Hola, ¿cómo estas?</small>
									</div>
								</div>
								<div>
									<p class="small text-muted mb-1 text-end">23/02/21 04:00</p>
									<span class="badge rounded-pill bg-danger float-end">1</span>
								</div>
							</a>
						</div>
					</div>
					<br>
				</div>
			</section>

			<section class="bg-dark col h-100 d-flex align-items-center">
				<section class="bg-secondary d-flex flex-column col w-100 rounded-3 my-3" style="height: 95%">

					<div class="d-flex justify-content-between align-items-center mt-3 px-3">

						<div class="d-flex align-items-center ">
							<img class="img-fluid rounded-circle actual-chat-user-image"
								src="https://i.kym-cdn.com/photos/images/facebook/001/884/907/c86.jpg" alt="Perfil">
							<span class="h5 ms-3 mb-0">Kevin Gold</span>
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
					<hr>
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
					<div class="input-group mb-3">
						<input type="text" id="message" class="bg-secondary form-control border-0 shadow-none text-white rounded-4"
							placeholder="Escribe un mensaje" aria-label="Enviar mensaje" aria-describedby="basic-addon2">
						<button class="btn btn-primary shadow-none" id="send-message"><i class="bx bxs-send"></i></button>
					</div>
				</section>
			</section>
		</div>
	</section>
-->
</template>

<script>
export default {
	data() {
		return {

		}
	}
}
</script>

<style scoped>
.chat-drawer:hover {
	background-color: #2C2C2C;
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