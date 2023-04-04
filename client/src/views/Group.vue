<template>
  <div class="bg-dark container-fluid h-100 overflow-auto">
      <section class="col h-100 align-items-center p-3 text-center">
      <div class=" box  bg-accent group-srcoll py-3 px-5 rounded-3">
        <div>
          <h3>Mis grupos</h3>
          <hr>
          <div class="row" id="group-container">
           
            <div v-for="i in [1,2,3,4,5,6]" class="col-sm-6 col-md-4 col-lg-3" role="button">
              <div class="mb-4 d-flex flex-column justify-content-center align-items-center shadow-sm rounded-3 box_button" 
              style="height: 240px; min-width: 200px;">
                <div class="d-flex align-items-center" style="height: 66%">
                  <img
                  src="https://upload.wikimedia.org/wikipedia/commons/d/d3/Syd_barrett.jpg"
                  alt="Foto de grupo"
                  class="rounded group-img"
                  />
                </div>
                <div class="d-flex align-items-start px-3" style="height: 33%">
                  <h6 class="text">003 E2023 Programación orientada a la internet CLASE ORDINARIA</h6>
                </div>
               
              </div>
            </div>

          </div>
        </div>

        <div>
          <h3>Unirse a un grupo</h3>
          <hr>
          <div class="row" id="group-container">
            <div class="col-md-3">
              <div class="mb-5 mt-5 rounded-3 box_button" style="height: 300px">
                <img src="../assets/images/POI_SignalFalgs.png" width="150" height="150" class="rounded float-left"
                  alt="..." />
                <h6 class="text-white pb-5 fw-bolder">Crea un grupo.</h6>
                <button
                  type="button"
                  class="flex-fill bd-highlight btn btn-primary rounded-3"
                  data-bs-toggle="modal"
                  data-bs-target="#modal-g"
                >
                  Crear
                </button>
              </div>
            </div>
            <div class="col-md-3">
              <div class="mb-5 mt-5 rounded-3 box_button" style="height: 300px">
                <img src="../assets/images/POI_SignalFalgs.png" width="150" height="150" class="rounded float-left"
                  alt="..." />
                <h6 class="text-white fw-bolder">Unete a un grupo privado.</h6>

                <input
                  type="text"
                  name="code"
                  id="code"
                  class="bg-accent border-0 rounded-2 shadow-none text-white"
                  placeholder="código"
                />
                <br />
                <br />
                <button
                  type="button"
                  class="flex-fill bd-highlight btn btn-primary rounded-3">
                  Unirse
                </button>
              </div>
            </div>

            <div class="col-md-3">
              <div class="mb-5 mt-5  rounded-3 box_button" style="height: 250px">
                <img src="../assets/images/POI_SignalFalgs.png" width="150" height="150" class="rounded mt-3" alt="..." />
                <h6 class="fw-bolder">Nombre grupo público</h6>
                <label for=""> Admin </label>
              </div>
            </div>

            <div class="col-md-3">
              <div class="mb-5 mt-5  rounded-3 box_button" style="height: 250px">
                <img src="../assets/images/POI_SignalFalgs.png" width="150" height="150" class="rounded mt-3" alt="..." />
                <h6 class="fw-bolder">Nombre grupo público</h6>
                <label for=""> Admin </label>
              </div>
            </div>

            <div class="col-md-3">
              <div class="mb-5 mt-5  rounded-3 box_button" style="height: 250px">
                <img src="../assets/images/POI_SignalFalgs.png" width="150" height="150" class="rounded mt-3" alt="..." />
                <h6 class="fw-bolder">Nombre grupo público</h6>
                <label for=""> Admin </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
          <CreateGroup titles="Crear grupo."/>
  </div>
</template>

<script>
import CreateGroup from '../components/CreateGroup.vue'

export default {
  components: {
    CreateGroup
  }
}

</script>

<style>
.text {
  overflow: hidden;
text-overflow: ellipsis;
display: -webkit-box;
-webkit-line-clamp: 2;
-webkit-box-orient: vertical;
}


.group-img {
  width: 100px;
  height: 100px;
  object-fit: cover;
}


.box {
  position: static;
  overflow-y: scroll;
  overflow-y: scroll;
  height: 100%;
}

.box_button {
  background-color: #38393b;
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
