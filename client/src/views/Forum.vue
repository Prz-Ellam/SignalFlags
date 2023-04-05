<template>
  <div class="d-flex flex-column h-100">
    <div class="flex-grow-1 flex-shrink-1 overflow-auto">
      <div class="bg-dark container-fluid h-100">
        <div class="row h-100 ">
            <section class="col h-100 align-items-center p-3 text-center">
                <div class="bg-accent rounded-3 h-100 ">
                    <div class="pt-3 px-3 h-100  overflow-hidden">
                        <div class="d-flex align-items-center">
                            <img class="img-fluid bg-primary rounded-2" width="50" height="50" src="../assets/images/POI_SignalFalgs.png" alt="...">
                            <span class="h5 ms-3 mb-0">Nombre Equipo</span>
                            <ul class="nav nav-pills ms-3 mb-0 rounded-1" id="pills-tab" role="tablist" >
                                <li class="nav-item" role="presentation">
                                    <button class="nav-link active rounded-0 bg-accent" id="pills-posts-tab" data-bs-toggle="pill" data-bs-target="#pills-posts" type="button" role="tab" aria-controls="pills-posts" aria-selected="true" > Publicaciones </button>
                                </li>
                                <li class="nav-item" role="presentation">
                                    <button class="nav-link rounded-0 bg-accent" id="pills-homework-tab" data-bs-toggle="pill" data-bs-target="#pills-homework"
                                    type="button" role="tab" aria-controls="pills-homework" aria-selected="false"> Tareas </button>
                                </li>
                            </ul>
                        </div>
                        <hr>
                        <div class="tab-content h-100" id="pills-tabContent">
                            <div class="tab-pane fade show active box2 group-srcoll" id="pills-posts" role="tabpanel" aria-labelledby="pills-posts-tab" tabindex="0">
                                <div class="py-2 px-3 w-100">
                                    <span class="h5"> Bienvenido a Nombre del grupo </span>
                                    <p>Descripcion de grupo.</p>
                                    <img src="../assets/images/POI_SignalFalgs.png" width="200" height="200" class="img-fluid bg-primary rounded-circle  m-3" alt="">    
                                    <div class="row" id="forum-container">
                                        <div class="d-flex mt-3 px-3" >
                                            <div class="d-flex align-items-start pt-3 mt-3">
                                                <img src="../assets/images/POI_SignalFalgs.png" width="50" height="50" class="img-fluid bg-primary rounded-circle" alt="">                                 
                                            </div>
                                            <div class="text-start bg-dark m-4 w-100 rounded-3">
                                                <div class="p-3">
                                                    <span class="h5 ms-3 me-3 mb-0">Saul Goodman</span>
                                                    <span class="ms-1 me-3 "> lunes 6:08pm</span>
                                                    <p class="ms-3 me-3 m-1 "> textotextotextotextotextotextotextotextotextotexto. </p>
                                                </div>
                                                <div class="bg-secondary px-3 rounded-bottom">
                                                    <button class="btn text-start" style="width: 100%;">
                                                        <i class="h6 bi bi-arrow-90deg-up"></i> <span class="ms-3 mb-0"> Responder</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row ">
                                            <div class="col-5">
                                                <hr>
                                            </div>
                                            <div class="col-2">
                                                <span> lunes 6:08pm</span>
                                            </div>
                                            <div class="col-5">
                                                <hr>
                                            </div>
                                        </div>

                                        <div class="d-flex mt-3 px-3" >
                                            <div class="d-flex align-items-start pt-3 mt-3">
                                                <img src="../assets/images/POI_SignalFalgs.png" width="50" height="50" class="img-fluid bg-primary rounded-circle" alt="">                                 
                                            </div>
                                            <div class="text-start bg-dark m-4 w-100 rounded-3">
                                                <div class="p-3">
                                                    <span class="h5 ms-3 me-3 mb-0">Saul Goodman</span>
                                                    <span class="ms-1 me-3 "> lunes 6:08pm</span>
                                                    <p class="ms-3 me-3 m-1 "> textotextotextotextotextotextotextotextotextotexto. </p>
                                                </div>
                                                <div class="d-flex bg-secondary px-3">
                                                    <div class="d-flex align-items-start pt-3 mt-3">
                                                        <img src="../assets/images/POI_SignalFalgs.png" width="40" height="40" class="img-fluid bg-primary rounded-circle" alt="">                                 
                                                    </div>
                                                    <div class="text-start rounded-3 pt-3 pb-3  w-100">
                                                        <span class="h5 ms-3">Saul Goodman</span>
                                                        <span class="ms-1 mb-0"> lunes 6:08pm</span>
                                                        <p class="ms-3 m-1"> textotextotextotextotextotextotextotextotextotexto. </p>
                                                    </div>
                                                </div>
                                                <div class="bg-secondary px-3 rounded-bottom">
                                                    <button class="btn text-start" style="width: 100%;">
                                                        <i class="h6 bi bi-arrow-90deg-up"></i> <span class="ms-3 mb-0"> Responder</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row ">
                                            <div class="col-5">
                                                <hr>
                                            </div>
                                            <div class="col-2">
                                                <span> lunes 6:08pm</span>
                                            </div>
                                            <div class="col-5">
                                                <hr>
                                            </div>
                                        </div>

                                        <div class="d-flex mt-3 px-3" >
                                            <div class="d-flex align-items-start pt-3 mt-3">
                                                <img src="../assets/images/POI_SignalFalgs.png" width="50" height="50" class="img-fluid bg-primary rounded-circle" alt="">                                 
                                            </div>
                                            <div class="text-start bg-dark m-4 w-100 rounded-3">
                                                <div class="p-3">
                                                    <span class="h5 ms-3 me-3 mb-0">Saul Goodman</span>
                                                    <span class="ms-1 me-3 "> lunes 6:08pm</span>
                                                    <p class="ms-3 me-3 m-1 "> textotextotextotextotextotextotextotextotextotexto. </p>
                                                </div>
                                                <div class="d-flex bg-secondary px-3">
                                                    <div class="d-flex align-items-start pt-3 mt-3">
                                                        <img src="../assets/images/POI_SignalFalgs.png" width="40" height="40" class="img-fluid bg-primary rounded-circle" alt="">                                 
                                                    </div>
                                                    <div class="text-start rounded-3 pt-3 pb-3  w-100">
                                                        <span class="h5 ms-3">Saul Goodman</span>
                                                        <span class="ms-1 mb-0"> lunes 6:08pm</span>
                                                        <p class="ms-3 m-1"> textotextotextotextotextotextotextotextotextotexto. </p>
                                                    </div>
                                                </div>
                                                <div class="bg-secondary px-3 rounded-bottom">
                                                    <button class="btn text-start" style="width: 100%;">
                                                        <i class="h6 bi bi-arrow-90deg-up"></i> <span class="ms-3 mb-0"> Responder</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row ">
                                            <div class="col-5">
                                                <hr>
                                            </div>
                                            <div class="col-2">
                                                <span> lunes 6:08pm</span>
                                            </div>
                                            <div class="col-5">
                                                <hr>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div class="w-100 pe-4 ps-5 mb-3 position-absolute bottom-0 start-50 translate-middle-x">
                                    <div class="bg-secondary d-flex px-3 ms-3" >
                                        <div class="input-group m-3">
                                            <input class="form-control bg-secondary text-white shadow-none py-0" type="text" placeholder="Inicia una conversación..."/>
                                            <button class="btn border-0 bg-yellow">
                                            <i class="bi bi-flag"></i>
                                            </button>
                                        </div>                                    
                                    </div>
                                </div>
                            </div>
                            <div class="tab-pane fade box3 group-srcoll" id="pills-homework" role="tabpanel" aria-labelledby="pills-homework-tab" tabindex="0">
                                <div class="col h-100 align-items-center p-3 text-center">
                                    <div class=" bg-accent rounded-3 ">
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
                                        <div id="homework_container">
                                            <div class="box_button  rounded-4 container py-2 px-3 mb-3">
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
                                            <label for="" class="text-white">
                                                Proyecto POI entrega
                                            </label>
                                            <br />
                                            <label for="" class="text-white"> Info </label>
                                            </div>                       
                                        </div>
                                        </div>
                                    </div>
                                    </div>
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

<script>
</script>

<style>
.box {
  position: static;
  overflow-y: scroll;
  overflow-x:unset;
  height: 100%;
}
.box2 {
  position: static;
  overflow-y: scroll;
  overflow-x:unset;
  height: 70%;
}
.box3 {
  position: static;
  overflow-y: scroll;
  overflow-x:unset;
  height: 80%;
}
</style>
