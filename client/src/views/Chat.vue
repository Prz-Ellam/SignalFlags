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
					
					<section class="py-2 col-auto bg-accent d-sm-flex justify-content-center align-items-center">
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
											<div class="position-relative d-inline-block">

												<img src="https://i.kym-cdn.com/photos/images/facebook/001/884/907/c86.jpg" alt="avatar"
												class="rounded-circle d-flex align-self-center me-3 shadow-1-strong">
												<span class="dot"></span>
											</div>
											<div class="overflow-hidden text-nowrap">
												<p class="h6 mb-0 text-light">Jimmy McGuill</p>
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