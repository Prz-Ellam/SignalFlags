<template>
  <section class="container-fluid h-100">
    <div class="hero row h-100">
      <div class="row align-items-center justify-content-center g-0 h-100" data-aos="fade-up">
        <div class="text-center px-3">
          <img
            src="../assets/images/POI_SignalFalgs.png"
            width="264"
            height="264"
            class="img-fluid"
            alt="Signal Flags"
          />
          <h1>Bienvenido a Signal Flags</h1>
          <h5>
            <i class="text-light bi bi-flag-fill me-2"></i>
            <span>Registrate o inicia sesión para chatear y llamar.</span>
            <i class="text-light bi bi-flag-fill ms-2"></i>
          </h5>
        </div>
        <div class="row px-5">
          <div class="d-grid col-md-6 col-12 mb-3 mb-md-0">
            <RouterLink to="/login" class="btn btn-primary rounded-pill text-light">
              Iniciar sesión
            </RouterLink>
          </div>
          <div class="d-grid col-md-6 col-12">
            <RouterLink to="/signup" class="btn btn-yellow rounded-pill text-light">
              Registrarse
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
    <div class="row text-center bg-accent py-5">
      <h3 class="py-4">🏁 Más sobre Signal Flags 🏁</h3>
      <div class="row mx-0 pb-4">
        <div class="col-md-6 col-lg-3 py-3" data-aos="fade-up" data-aos-duration="1000">
          <div class="bg-dark px-3 py-5 rounded-3 h-100">
            <i class="text-light h1 bi bi-chat-dots-fill"></i>
            <h3>Chat</h3>
            <p class="mb-0">
              Chatea con tus compañeros en chats 1 a 1 o en equipo.
            </p>
          </div>
        </div>
        <div class="col-md-6 col-lg-3 py-3" data-aos="fade-up"  data-aos-duration="1100">
          <div class="bg-yellow px-3 py-5 rounded-3 h-100">
            <i class="text-light h1 bi bi-people-fill"></i>
            <h3>Grupos</h3>
            <p class="mb-0">
              Crea y únete a grupos y comparte publicaciones interesantes.
            </p>
          </div>
        </div>
        <div class="col-md-6 col-lg-3 py-3" data-aos="fade-up" data-aos-duration="1200">
          <div class="bg-dark px-3 py-5 rounded-3 h-100">
            <i class="text-light h1 bi bi-camera-video-fill"></i>
            <h3>Videollamadas</h3>
            <p class="mb-0">
              Reunete y comunicate con tu equipo a través de
              videollamadas.
            </p>
          </div> 
        </div>
        <div class="col-md-6 col-lg-3 py-3" data-aos="fade-up" data-aos-duration="1300">
          <div class="bg-yellow px-3 py-5 rounded-3 h-100">
            <i class="text-light h1 bi bi-journal-check"></i>
          <h3>Tareas</h3>
          <p class="mb-0">
            Crea asignaciones y cuando los usuarios las cumplan podrán recibir
            recompensas.
          </p>
          </div>
        </div>
      </div>
    </div>
    <footer class="w-100">
      <p class="text-center p-3 mb-0">© 2023 Copyright: SignalFlags.com</p>
    </footer>
  </section>
</template>

<style scoped>
.hero {
  background: url('../../src/assets/images/abstract-elegant-dark-blue-wave-gold-lines-light-black-background-vector.png');
  background-size: cover;
}
</style>