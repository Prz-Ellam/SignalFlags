<template>
  <nav class="navbar navbar-expand-lg shadow-lg bg-accent">
    <div class="container-fluid">
      <RouterLink to="/" class="navbar-brand text-light" href="#">
        <img src="../assets/images/isotipo.png" alt="Bootstrap" width="30" height="30">
        SignalFlags
      </RouterLink>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <form class="col-md-auto col-lg-6 col-xl-7 ms-auto " role="search" action="search.html">
          <div class="input-group">
            <input class="form-control bg-secondary shadow-none py-0" type="search" placeholder="Buscar..."
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
                <img
                  :src="user?.avatar ? `/api/v1/images/${user?.avatar}` : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'"
                  alt="Perfil" width="30" class="rounded-circle profile-picture">
              </button>
              <ul class="dropdown-menu dropdown-menu-end dropdown-menu-dark">
                <li>
                  <RouterLink class="dropdown-item" to="/profile">Mi perfil</RouterLink>
                </li>
                <li>
                  <hr class="dropdown-divider">
                </li>
                <li>
                  <a class="dropdown-item" href="#" @click="logout">Cerrar sesión</a>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      user: JSON.parse(localStorage.getItem('user'))
    }
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push('/');
      window.socket.disconnect();
    }
  }
}
</script>

<style></style>