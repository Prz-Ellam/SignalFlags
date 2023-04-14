<template>
  <div class="bg-dark container-fluid h-100 overflow-auto">
    <div class="row h-100">
      <section class="col h-100 align-items-center p-3 text-center">
        <div class="box bg-accent group-srcoll rounded-3 ">
          <ul class="nav nav-pills mb-3 pt-1 px-2 bg-accent rounded-1" role="tablist">
            <li class="nav-item" role="presentation">
              <button class="nav-link active rounded-0 bg-accent" id="pills-asign_homework-tab" data-bs-toggle="pill"
                data-bs-target="#pills-asign_homework" type="button" role="tab" aria-controls="pills-asign_homework"
                aria-selected="true">
                Asignadas
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link active rounded-0 bg-accent" id="pills-expired-tab" data-bs-toggle="pill"
                data-bs-target="#pills-expired-homework" type="button" role="tab" aria-controls="pills-expired-homework"
                aria-selected="true">
                Vencidas
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link rounded-0 bg-accent" id="pills-completed-homework-tab" data-bs-toggle="pill"
                data-bs-target="#pills-completed-homework" type="button" role="tab"
                aria-controls="pills-completed-homework" aria-selected="false"> Completadas
              </button>
            </li>
          </ul>
          <div class="tab-content" id="pills-tabContent">
            <div class="tab-pane fade show active" id="pills-asign_homework" role="tabpanel"
              aria-labelledby="pills-asign_homework-tab" tabindex="0">
              <div>

                <div v-for="homework in assignedHomeworks" class="box_button rounded-4 container py-2 px-3 mb-3"
                  role="button">
                  <img src="../assets/images/POI_SignalFalgs.png" width="50" height="50" class="rounded float-left"
                    alt="..." />
                  <label for="" class="text-white">
                    Proyecto POI entrega
                  </label>
                  <br />
                  <label for="" class="text-white"> Info </label>
                </div>

              </div>
            </div>
            <div class="tab-pane fade show active" id="pills-expired-homework" role="tabpanel"
              aria-labelledby="pills-asign_homework-tab" tabindex="0">
              <div>

                <div v-for="homework in assignedHomeworks" class="box_button rounded-4 container py-2 px-3 mb-3"
                  role="button">
                  <img src="../assets/images/POI_SignalFalgs.png" width="50" height="50" class="rounded float-left"
                    alt="..." />
                  <label for="" class="text-white">
                    Proyecto POI entrega
                  </label>
                  <br />
                  <label for="" class="text-white"> Info </label>
                </div>

              </div>
            </div>
            <div class="tab-pane fade" id="pills-completed-homework" role="tabpanel"
              aria-labelledby="pills-completed-homework-tab" tabindex="0">
              <div id="completed_container">

                <div v-for="homework in completeHomeworks" class="box_button rounded-4 container py-2 px-3 mb-3"
                  role="button">
                  <img src="../assets/images/POI_SignalFalgs.png" width="50" height="50" class="rounded float-left"
                    alt="..." />
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
      </section>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      assignedHomeworks: [{
        _id: 1,
        name: 'Tarea',
        groupName: 'POI',
        groupAvatar: 'imagen'
      }, 2, 3],
      completeHomeworks: [1, 2, 3, 4, 5, 6, 7, 8, 9]
    }
  }
}
</script>

<style>
.box_button {
  height: 100%;
}
</style>
