<template>
  <div class="d-flex flex-column vh-100">
    <div class="flex-grow-0 flex-shrink-1 header">
      <nav
        class="navbar navbar-expand-lg shadow-sm bg-accent"
      >
        <div class="container-fluid">
          <a class="navbar-brand text-light" href="#">
            <img
              src="../assets/images/Isotipo.png"
              alt="Bootstrap"
              width="30"
              height="30"
            />
            SignalFlags
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <form
              class="col-md-auto col-lg-6 col-xl-7 ms-auto"
              role="search"
              action="search.html"
            >
              <div class="input-group">
                <input
                  class="form-control bg-secondary shadow-none py-0"
                  type="search"
                  placeholder="Buscar..."
                  aria-label="Buscar"
                />
                <button class="btn btn-secondary border-0" type="button">
                  <i class="h6 bi bi-search"></i>
                </button>
              </div>
            </form>
            <ul class="navbar-nav ms-auto d-lg-flex align-items-lg-center me-2">
              <li class="nav-item">
                <div class="nav-link dropdown">
                  <button
                    class="btn border-0 p-0"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img
                      src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                      alt="Perfil"
                      width="32"
                      class="rounded-circle profile-picture"
                    />
                  </button>
                  <ul class="dropdown-menu dropdown-menu-end">
                    <li>
                      <a class="dropdown-item" href="instructor-profile.html"
                        >Mi perfil</a
                      >
                    </li>
                    <li>
                      <hr class="dropdown-divider" />
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
          <section
            class="col-auto bg-secondary d-flex align-items-center text-center"
          >
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
          <section class="bg-dark col h-100  align-items-center ps-5 pe-5 text-center py-5">
              <div class=" box bg-secondary group-srcoll py-3 px-5 rounded-3">
                <div>
                  <h3>Mis grupos</h3>
                  <hr>
                  <div class="row" id="group-container">
                    <div class="col-md-3">
                        <div
                          class="mb-5 mt-5  rounded-3 box_button" style="height: 250px">
                          <img src="../assets/images/POI_SignalFalgs.png" width="150" height="150" class="rounded mt-3" alt="..." />
                          <h6 class="fw-bolder">Nombre grupo</h6>
                          <label for=""> Admin </label>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div
                          class="mb-5 mt-5  rounded-3 box_button" style="height: 250px">
                          <img src="../assets/images/POI_SignalFalgs.png" width="150" height="150" class="rounded mt-3" alt="..." />
                          <h6 class="fw-bolder">Nombre grupo</h6>
                          <label for=""> Admin </label>
                        </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3>Unirse a un grupo</h3>
                  <hr>
                  <div class="row" id="group-container">
                    <div class="col-md-3">
                      <div
                        class="mb-5 mt-5 rounded-3 box_button"
                        style="height: 300px"
                      >
                        <img
                          src="../assets/images/POI_SignalFalgs.png"
                          width="150"
                          height="150"
                          class="rounded float-left"
                          alt="..."
                        />
                        <h6 class="text-white pb-5 fw-bolder">Crea un grupo.</h6>
                        <button
                          type="button"
                          class="
                            flex-fill
                            bd-highlight
                            btn btn-primary
                            rounded-5
                          "
                        >
                          Crear
                        </button>
                      </div>
                    </div>
                    <div class="col-md-3">
                      <div class="mb-5 mt-5 rounded-3 box_button" style="height: 300px">
                        <img
                          src="../assets/images/POI_SignalFalgs.png"
                          width="150"
                          height="150"
                          class="rounded float-left"
                          alt="..."
                        />
                        <h6 class="text-white fw-bolder">Unete a un grupo privado.</h6>
                        
                        <input
                          type="text"
                          name="code"
                          id="code"
                          class="bg-secondary border-0 shadow-none text-white"
                          placeholder="código"
                        />
                        <br />
                        <br /><button
                          type="button" class="flex-fill bd-highlight btn btn-primary rounded-5 ">
                          Unirse
                        </button>
                      </div>
                    </div>
                    
                    <div class="col-md-3">
                        <div
                          class="mb-5 mt-5  rounded-3 box_button" style="height: 250px">
                          <img src="../assets/images/POI_SignalFalgs.png" width="150" height="150" class="rounded mt-3" alt="..." />
                          <h6 class="fw-bolder">Nombre grupo público</h6>
                          <label for=""> Admin </label>
                        </div>
                    </div>
                    
                    <div class="col-md-3">
                        <div
                          class="mb-5 mt-5  rounded-3 box_button" style="height: 250px">
                          <img src="../assets/images/POI_SignalFalgs.png" width="150" height="150" class="rounded mt-3" alt="..." />
                          <h6 class="fw-bolder">Nombre grupo público</h6>
                          <label for=""> Admin </label>
                        </div>
                    </div>

                    <div class="col-md-3">
                        <div
                          class="mb-5 mt-5  rounded-3 box_button" style="height: 250px">
                          <img src="../assets/images/POI_SignalFalgs.png" width="150" height="150" class="rounded mt-3" alt="..." />
                          <h6 class="fw-bolder">Nombre grupo público</h6>
                          <label for=""> Admin </label>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script></script>

<style>

.box {
  position: static;
  overflow-y: scroll;
  height: 90%;
}

.box_button {
  background-color: #2c2c2c;
}

.box_button:hover {
  background-color: #6d6f7d;
}

.group-srcoll::-webkit-scrollbar {
	width: 8px;
	border-radius: 1em;
	background-color: #6D6F7D;
	border-radius: 1em;
}


.group-srcoll::-webkit-scrollbar-thumb {

	border-radius: 1em;
	background-color: #6D6F7D;
	background: #FFB800;
	border-radius: 1em;
}

.group-srcoll::-webkit-scrollbar-thumb:hover {
	visibility: visible;
	background: #FFB800;
}


</style>
