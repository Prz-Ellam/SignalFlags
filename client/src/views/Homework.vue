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

          <section class="col h-100 align-items-center p-3 text-center">
              <div class=" box bg-accent group-srcoll rounded-3 ">
              <ul
                class="nav nav-pills mb-3 pt-1 px-2 bg-accent rounded-1" id="pills-tab" role="tablist">
                <li class="nav-item" role="presentation">
                  <button class="nav-link active rounded-0 bg-accent" id="pills-asign_homework-tab" data-bs-toggle="pill" data-bs-target="#pills-asign_homework" type="button" role="tab" aria-controls="pills-asign_homework" aria-selected="true">
                    Asignadas
                  </button>
                </li>
                <li class="nav-item" role="presentation">
                  <button class="nav-link rounded-0 bg-accent" id="pills-completed-homework-tab" data-bs-toggle="pill" data-bs-target="#pills-completed-homework" type="button" role="tab" aria-controls="pills-completed-homework" aria-selected="false"> Completadas
                  </button>
                </li>
              </ul>
              <div class="tab-content" id="pills-tabContent">
                <div class="tab-pane fade show active" id="pills-asign_homework" role="tabpanel" aria-labelledby="pills-asign_homework-tab" tabindex="0">
                  <div id="homework_container group-srcoll">
                    <div class="box_button rounded-4 container py-2 px-3 mb-3">
                      <img
                        src="../assets/images/POI_SignalFalgs.png"
                        width="50"
                        height="50"
                        class="rounded float-left"
                        alt="..."/>
                      <label for="" class="text-white">
                        Proyecto BDM entrega
                      </label>
                      <br />
                      <label for="" class="text-white"> Info </label>
                    </div>

                    <div class="box_button rounded-4 container py-2 px-3 mb-3">
                      <img
                        src="../assets/images/POI_SignalFalgs.png"
                        width="50"
                        height="50"
                        class="rounded float-left"
                        alt="..."/>
                      <label for="" class="text-white">
                        Proyecto BDM entrega
                      </label>
                      <br />
                      <label for="" class="text-white"> Info </label>
                    </div>
                  </div>
                </div>
                <div class="tab-pane fade" id="pills-completed-homework" role="tabpanel" aria-labelledby="pills-completed-homework-tab" tabindex="0">
                  <div id="completed_container">
                    <div class="box_button rounded-4 container py-2 px-3 mb-3">
                      <img src="../assets/images/POI_SignalFalgs.png" width="50" height="50" class="rounded float-left" alt="..." />
                      <label for="" class="text-white">
                        Proyecto POI entrega
                      </label>
                      <br />
                      <label for="" class="text-white"> Info </label>
                    </div>          
                    <div class="box_button rounded-4 container py-2 px-3 mb-3">
                      <img src="../assets/images/POI_SignalFalgs.png" width="50" height="50" class="rounded float-left" alt="..." />
                      <label for="" class="text-white"> Avance 2 PI </label>
                      <br />
                      <label for="" class="text-white"> Info </label>
                    </div><div class="box_button rounded-4 container py-2 px-3 mb-3">
                      <img src="../assets/images/POI_SignalFalgs.png" width="50" height="50" class="rounded float-left" alt="..." />
                      <label for="" class="text-white"> Avance 2 PI </label>
                      <br />
                      <label for="" class="text-white"> Info </label>
                    </div><div class="box_button rounded-4 container py-2 px-3 mb-3">
                      <img src="../assets/images/POI_SignalFalgs.png" width="50" height="50" class="rounded float-left" alt="..." />
                      <label for="" class="text-white"> Avance 2 PI </label>
                      <br />
                      <label for="" class="text-white"> Info </label>
                    </div><div class="box_button rounded-4 container py-2 px-3 mb-3">
                      <img src="../assets/images/POI_SignalFalgs.png" width="50" height="50" class="rounded float-left" alt="..." />
                      <label for="" class="text-white"> Avance 2 PI </label>
                      <br />
                      <label for="" class="text-white"> Info </label>
                    </div><div class="box_button rounded-4 container py-2 px-3 mb-3">
                      <img src="../assets/images/POI_SignalFalgs.png" width="50" height="50" class="rounded float-left" alt="..." />
                      <label for="" class="text-white"> Avance 2 PI </label>
                      <br />
                      <label for="" class="text-white"> Info </label>
                    </div><div class="box_button rounded-4 container py-2 px-3 mb-3">
                      <img src="../assets/images/POI_SignalFalgs.png" width="50" height="50" class="rounded float-left" alt="..." />
                      <label for="" class="text-white"> Avance 2 PI </label>
                      <br />
                      <label for="" class="text-white"> Info </label>
                    </div><div class="box_button rounded-4 container py-2 px-3 mb-3">
                      <img src="../assets/images/POI_SignalFalgs.png" width="50" height="50" class="rounded float-left" alt="..." />
                      <label for="" class="text-white"> Avance 2 PI </label>
                      <br />
                      <label for="" class="text-white"> Info </label>
                    </div><div class="box_button rounded-4 container py-2 px-3 mb-3">
                      <img src="../assets/images/POI_SignalFalgs.png" width="50" height="50" class="rounded float-left" alt="..." />
                      <label for="" class="text-white"> Avance 2 PI </label>
                      <br />
                      <label for="" class="text-white"> Info </label>
                    </div><div class="box_button rounded-4 container py-2 px-3 mb-3">
                      <img src="../assets/images/POI_SignalFalgs.png" width="50" height="50" class="rounded float-left" alt="..." />
                      <label for="" class="text-white"> Avance 2 PI </label>
                      <br />
                      <label for="" class="text-white"> Info </label>
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
</style>
