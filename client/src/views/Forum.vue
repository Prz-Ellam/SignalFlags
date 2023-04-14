<template>
  <section class="bg-dark container-fluid h-100 overflow-auto">
    <div class="d-flex col h-100 align-items-center p-3 text-center">
      <div class="text-start w-25 bg-accent p-3 rounded-3 h-100 overflow-hidden me-2">
        <img class="img-fluid bg-primary rounded-2 mb-2" width="75" height="75" src="../assets/images/POI_SignalFalgs.png"
          alt="...">
        <h2 class="h4 text-nowrap text-truncate">Programación Orientada a la Internet</h2>
        <hr>
        <p class="fw-bold mb-1">Subgrupos</p>
        <ul class="list-group">
          <li role="button" class="bg-primary text-light py-1 rounded-0 border-0 list-group-item">General</li>
          <li role="button" class="bg-accent text-light py-1 rounded-0 border-0 list-group-item">POI 001</li>
          <li role="button" class="bg-accent text-light py-1 rounded-0 border-0 list-group-item">POI 002</li>
          <li role="button" class="bg-accent text-light py-1 rounded-0 border-0 list-group-item">POI 003</li>
          <li role="button" class="bg-accent text-light py-1 rounded-0 border-0 list-group-item">POI 004</li>
        </ul>
      </div>
      <div class="w-75 bg-accent p-3 rounded-3 h-100 overflow-hidden">
        <div class="d-flex align-items-center">
          <img class="img-fluid bg-primary rounded-2" width="50" height="50" src="../assets/images/POI_SignalFalgs.png"
            alt="...">
          <span class="h5 ms-3 mb-0">General</span>
          <ul class="nav nav-pills ms-3 mb-0 rounded-1" id="pills-tab" role="tablist">
            <li class="nav-item" role="presentation">
              <button class="nav-link active rounded-0 bg-accent" id="pills-posts-tab" data-bs-toggle="pill"
                data-bs-target="#pills-posts" type="button" role="tab" aria-controls="pills-posts" aria-selected="true">
                Publicaciones
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link rounded-0 bg-accent" id="pills-homework-tab" data-bs-toggle="pill"
                data-bs-target="#pills-homework" type="button" role="tab" aria-controls="pills-homework"
                aria-selected="false">
                Tareas
              </button>
            </li>
          </ul>
          <!-- Estos botones se muestran al admin del grupo  -->
          <button class="btn border-0 bg-primary" data-bs-toggle="modal" data-bs-target="#createHomeworkModal">
            Nueva Tarea
            <i class="ms-1 bi bi-flag"></i>
          </button>
          <button class="btn border-0 bg-primary ms-2" data-bs-toggle="modal" data-bs-target="#modalAddUsers">
            <i class="ms-1 bi-person-plus-fill"></i>
          </button>
        </div>
        <hr>
        <div class="tab-content h-100" id="pills-tabContent">
          <!-- Grupo -->
          <div class="tab-pane fade show active box2 group-srcoll" id="pills-posts" role="tabpanel"
            aria-labelledby="pills-posts-tab" tabindex="0">
            <div class="py-2 px-3 w-100">
              <span class="h5">Bienvenido a Nombre del grupo</span>
              <p>Descripcion de grupo.</p>
              <img src="../assets/images/POI_SignalFalgs.png" width="200" height="200"
                class="img-fluid bg-primary rounded-circle m-3" alt="" />
              <div class="row" id="forum-container">
                
                <div class="d-flex mt-3 px-3">
                  <div class="d-flex align-items-start pt-3 mt-3">
                    <img src="../assets/images/POI_SignalFalgs.png" width="50" height="50"
                      class="img-fluid bg-primary rounded-circle" alt="" />
                  </div>
                  <div class="text-start bg-dark mx-3 my-4 w-100 rounded-3">
                    <div class="p-3">
                      <span class="ms-1 mb-0">
                        Saul Goodman
                      </span>
                      <small class="ms-1 me-3">23/3, 16:34</small>
                      <p class="ms-1 me-3 m-1">
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nulla dolore, quas minima quo voluptate molestias animi quaerat delectus, aut natus voluptas fugiat cupiditate consequatur maiores rem temporibus debitis rerum hic?.
                      </p>
                    </div>
                    <div class="bg-secondary px-3 rounded-bottom">
                      <input type="text" name="" id="" 
                        class="form-control bg-secondary border-0 shadow-none"
                        placeholder="Escribe algo..."
                        style="outline: none !important; border: none !important">
                      <hr class=" text-primary py-0 my-0" style="border-width: 3px !important">
                      <button class="btn text-start" style="width: 100%;">
                        <i class="h6 bi bi-arrow-90deg-up"></i>
                        <span class="ms-3 mb-0">Responder</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-5">
                    <hr />
                  </div>
                  <div class="col-2">
                    <span>lunes 6:08pm</span>
                  </div>
                  <div class="col-5">
                    <hr />
                  </div>
                </div>

                <div class="d-flex mt-3 px-3">
                  <div class="d-flex align-items-start pt-3 mt-3">
                    <img src="../assets/images/POI_SignalFalgs.png" width="50" height="50"
                      class="img-fluid bg-primary rounded-circle" alt="" />
                  </div>
                  <div class="text-start bg-dark mx-3 my-4 w-100 rounded-3">
                    <div class="p-3">
                      <span class="ms-1 mb-0">
                        Saul Goodman
                      </span>
                      <small class="ms-1 me-3">23/3, 16:34</small>
                      <p class="ms-1 me-3 m-1">
                        textotextotextotextotextotextotextotextotextotexto.
                      </p>
                    </div>
                    <div class="d-flex bg-secondary px-3">
                      
                      <div class="d-flex align-items-start pt-3 mt-3">
                        <img src="../assets/images/POI_SignalFalgs.png" width="40" height="40"
                          class="img-fluid bg-primary rounded-circle" alt="" />
                      </div>
                      <div class="text-start rounded-3 pt-3 pb-3 w-100">
                        <span class="ms-1 mb-0">Saul Goodman</span>
                        <small class="ms-1 mb-0">lunes 6:08pm</small>
                        <p class="ms-1 m-1 mb-0">
                          textotextotextotextotextotextotextotextotextotexto.
                        </p>
                      </div>

                    </div>
                    <div class="bg-secondary px-3 rounded-bottom">
                      <button class="btn text-start" style="width: 100%;">
                        <i class="h6 bi bi-arrow-90deg-up"></i>
                        <span class="ms-3 mb-0">Responder</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-5">
                    <hr />
                  </div>
                  <div class="col-2">
                    <span>lunes 6:08pm</span>
                  </div>
                  <div class="col-5">
                    <hr />
                    Inicio
                  </div>
                </div>

                <div class="d-flex mt-3 px-3">
                  <div class="d-flex align-items-start pt-3 mt-3">
                    <img src="../assets/images/POI_SignalFalgs.png" width="50" height="50"
                      class="img-fluid bg-primary rounded-circle" alt="" />
                  </div>
                  <div class="text-start bg-dark m-4 w-100 rounded-3">
                    <div class="p-3">
                      <span class="h5 ms-3 me-3 mb-0">
                        Saul Goodman
                      </span>
                      <span class="ms-1 me-3">lunes 6:08pm</span>
                      <p class="ms-3 me-3 m-1">
                        textotextotextotextotextotextotextotextotextotexto.
                      </p>
                    </div>
                    <div class="d-flex bg-secondary px-3">
                      <div class="d-flex align-items-start pt-3 mt-3">
                        <img src="../assets/images/POI_SignalFalgs.png" width="40" height="40"
                          class="img-fluid bg-primary rounded-circle" alt="" />
                      </div>
                      <div class="text-start rounded-3 pt-3 pb-3 w-100">
                        <span class="h5 ms-3">Saul Goodman</span>
                        <span class="ms-1 mb-0">lunes 6:08pm</span>
                        <p class="ms-3 m-1">
                          textotextotextotextotextotextotextotextotextotexto.
                        </p>
                      </div>
                    </div>
                    <div class="bg-secondary px-3 rounded-bottom">
                      <button class="btn text-start" style="width: 100%;">
                        <i class="h6 bi bi-arrow-90deg-up"></i>
                        <span class="ms-3 mb-0">Responder</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-5">
                    <hr />
                  </div>
                  <div class="col-2">
                    <span>lunes 6:08pm</span>
                  </div>
                  <div class="col-5">
                    <hr />
                  </div>
                </div>
              </div>
            </div>
            <div class="w-100 bottom-0 start-50 mb-3">
              <div class="bg-secondary d-flex ms-3">
                <div class="input-group m-3">
                  <Buttons />
                  <input class="form-control bg-secondary text-white shadow-none py-0" type="text"
                    placeholder="Inicia una conversación..." />
                  <button class="btn border-0 bg-yellow">
                    <i class="bi bi-flag"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <!-- Tareas -->
          <div class="tab-pane fade box3 group-srcoll" id="pills-homework" role="tabpanel"
            aria-labelledby="pills-homework-tab" tabindex="0">
            <div class="col h-100 align-items-center p-3 text-center">
              <div class="bg-accent rounded-3">
                <ul class="nav nav-pills mb-3 pt-1 px-2 bg-accent rounded-1" id="pills-tab" role="tablist">
                  <li class="nav-item" role="presentation">
                    <button class="nav-link active rounded-0 bg-accent" id="pills-asign_homework-tab"
                      data-bs-toggle="pill" data-bs-target="#pills-asign_homework" type="button" role="tab"
                      aria-controls="pills-asign_homework" aria-selected="true">
                      Asignadas
                    </button>
                  </li>
                  <li class="nav-item" role="presentation">
                    <button class="nav-link rounded-0 bg-accent" id="pills-completed-homework-tab" data-bs-toggle="pill"
                      data-bs-target="#pills-completed-homework" type="button" role="tab"
                      aria-controls="pills-completed-homework" aria-selected="false">
                      Completadas
                    </button>
                  </li>
                </ul>
                <div class="tab-content" id="pills-tabContent">
                  <div class="tab-pane fade show active" id="pills-asign_homework" role="tabpanel"
                    aria-labelledby="pills-asign_homework-tab" tabindex="0">
                    <HomeworkCard name="Proyecto BDM entrega" groupName="Bases de Datos Multimedia"
                      groupAvatar="http://localhost:5173/src/assets/images/POI_SignalFalgs.png" dueDate="12/12/12" />
                  </div>
                  <div class="tab-pane fade" id="pills-completed-homework" role="tabpanel"
                    aria-labelledby="pills-completed-homework-tab" tabindex="0">

                    <HomeworkCard name="Proyecto BDM entrega" groupName="Bases de Datos Multimedia"
                      groupAvatar="http://localhost:5173/src/assets/images/POI_SignalFalgs.png" dueDate="12/12/12" />

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <CreateHomework />
  <AddUser />
</template>

<script>
import CreateHomework from '@/components/CreateHomework.vue';
import AddUser from '@/components/AddUser.vue';
import Buttons from '@/components/Buttons.vue';
import Homework from '@/views/Homework.vue';
import HomeworkCard from '@/components/HomeworkCard.vue';

export default {
  components: {
    CreateHomework,
    AddUser,
    Buttons,
    HomeworkCard,
    Homework
  },
}
</script>

<style>
.box {
  position: static;
  overflow-y: scroll;
  overflow-x: unset;
  height: 100%;
}

.box2 {
  position: static;
  overflow-y: scroll;
  overflow-x: unset;
  height: 80%;
}

.box3 {
  position: static;
  overflow-y: scroll;
  overflow-x: unset;
  height: 80%;
}
</style>
