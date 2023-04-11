<template>
  <section class="container-fluid bg-dark group-scroll">
    <div
      class="bg-secondary row text-center align-items-center justify-content-center pb-5 vh-100"
      style="
        background: URL('https://static.vecteezy.com/system/resources/previews/003/235/606/original/abstract-elegant-dark-blue-wave-gold-lines-light-black-background-vector.jpg');
        background-size: cover;
      "
    >
      <div class="col-auto p-5 text-center">
        <img
          src="../assets/images/POI_SignalFalgs.png"
          width="300"
          height="300"
          class="img-fluid"
          alt=""
        />
        <h1 class="text-white">Bienvenido a Signal Flags</h1>
        <i class="bi bi-flag me-2"></i>
        <label class="text-white">
          Registrate o inicia sesión para chatear y llamar.
        </label>
        <i class="bi bi-flag ms-2"></i>
      </div>
      <div class="container px-5">
        <div class="row">
          <div class="col-6 d-flex bd-highlight">
            <RouterLink
              to="/login"
              class="flex-fill bd-highlight btn btn-primary rounded-4 text-white"
            >
              Iniciar sesión
            </RouterLink>
          </div>
          <div class="col-6 d-flex bd-highlight">
            <RouterLink
              to="/signup"
              class="flex-fill bd-highlight btn btn-yellow rounded-4"
            >
              Registrarse
            </RouterLink>
          </div>
        </div>
      </div>
    </div>

    <div class="text-center bg-accent mt-3 rounded-3">
      <h3 class="text-white p-3">Más sobre Signal Flags</h3>
      <div class="row justify-content-center">
        <div class="col-md-3 bg-dark py-5 rounded-3 m-2 infobox">
          <i
            style="color: white;"
            class="h1 bi bi-chat-dots-fill"
            viewBox="0 0 16 16"
          ></i>
          <h3 class="text-white">Chat</h3>
          <label class="text-white">
            Chatea con tus compañeros en chats 1 a 1 o en equipo.
          </label>
        </div>
        <div class="col-md-3 bg-yellow py-5 rounded-3 m-2 infobox">
          <i
            style="color: white;"
            class="h1 bi bi-people"
            viewBox="0 0 16 16"
          ></i>
          <h3>Grupos</h3>
          <label>
            Crea y únete a grupos públicos o privados e invita a más usuarios
            compartiendo el código del grupo.
          </label>
        </div>
        <div class="col-md-3 bg-dark py-5 rounded-3 m-2 infobox">
          <i
            style="color: white;"
            class="h1 bi bi-camera-video-fill"
            viewBox="0 0 16 16"
          ></i>
          <h3 class="text-white">Videollamadas</h3>
          <label class="text-white">
            Reunete y comunicate con tu equipo o tus compañeros a través de
            videollamadas ya sea para presentar un trabajo o compartir ideas.
          </label>
        </div>
        <div class="col-md-3 bg-yellow py-5 rounded-3 m-2 infobox">
          <i
            style="color: white;"
            class="h1 bi bi-journal-check"
            viewBox="0 0 16 16"
          ></i>
          <h3>Tareas</h3>
          <label>
            Crea asignaciones y cuando los usuarios las cumplan podrían recibir
            recompensas.
          </label>
        </div>
      </div>
    </div>

    <footer class="w-100">
      <div class="text-center p-3">
        © 2020 Copyright:
        <a class="text-white" href="https://mdbootstrap.com/">
          SignalFlags.com
        </a>
      </div>
    </footer>
  </section>
</template>

<script>
</script>

<style scoped>
.infobox {
  height: 300px;
  weight: 300px;
}
</style>
