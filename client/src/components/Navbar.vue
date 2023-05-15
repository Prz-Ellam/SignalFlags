<template>
  <nav class="navbar navbar-expand-lg shadow-lg bg-accent">
    <div class="container-fluid">
      <RouterLink to="/" class="navbar-brand text-light">
        <img src="../assets/images/isotipo.png" alt="Signal Flags" width="30" height="30">
        <span>SignalFlags</span>
      </RouterLink>
      <button class="navbar-toggler shadow-none border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <i class="h4 bi bi-list"></i>
      </button>
      <div class="collapse navbar-collapse row" id="navbarSupportedContent">
        <!--form class="col col-lg-8 ms-auto" role="search">
          <div class="input-group">
            <input class="form-control bg-secondary shadow-none py-0" type="search" 
              placeholder="Buscar..." aria-label="Buscar">
            <button class="btn btn-secondary border-0" type="button">
              <i class="h6 bi bi-search"></i>
            </button>
          </div>
        </form-->
        <ul class="col-auto navbar-nav ms-auto d-flex align-items-lg-center me-2">
          <li class="nav-item">
            <div class="nav-link dropdown text-end">
              <button class="btn border-0 p-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <img
                  :src="user?.avatar ? user?.avatar : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'"
                  alt="Perfil" width="30" height="30" class="object-fit-cover rounded-circle">
              </button>
              <ul id="dropdown" class="dropdown-menu dropdown-menu-end dropdown-menu-dark bg-secondary m-0">
                <li>
                  <RouterLink class="dropdown-item" to="/profile">Mi perfil</RouterLink>
                </li>
                <li>
                <hr class="dropdown-divider">
                </li>
                <li role="button">
                  <a class="dropdown-item" @click="logout">Cerrar sesión</a>
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
import UserService from '@/services/user.service';

export default {
  data() {
    return {
      user: JSON.parse(localStorage.getItem('user'))
    }
  },
  methods: {
    async logout() {
      await UserService.logout();
      localStorage.clear();
      this.$router.push('/home');
      //window.socket.disconnect();
    }
  }
}
</script>

<style scoped>
.object-fit-cover {
  object-fit: cover;
}

@media (max-width: 991px) {
  #dropdown {
    position: absolute !important;
  }
}
</style>