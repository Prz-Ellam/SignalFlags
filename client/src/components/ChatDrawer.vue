<template>
	<div class="bg-accent d-flex flex-column w-100 rounded-3 p-3" style="height: 95%;">
		<h2 class="text-center mb-0">Contactos</h2>
		<hr>
		<input type="search" name="search" class="bg-secondary form-control shadow-none text-white rounded-4 mb-1"
			placeholder="Buscar personas...">
		<div class="overflow-auto chat">
			<div v-for="i in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]" class="chat-drawer ps-1 py-2 pe-3 rounded-3">
				<a href="#" class="text-decoration-none d-flex justify-content-between align-items-center"
					data-bs-toggle="collapse" data-bs-target="chat-section" aria-expanded="false" aria-controls="collapseExample">
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
</template>

<script>
</script>

<style scoped></style>