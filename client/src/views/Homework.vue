<template>
  <section class="container-fluid h-100">
    <div class="h-100 p-3">
      <div class="box bg-accent rounded-3 ">
        <ul class="nav nav-pills mb-3 pt-1 px-2 bg-accent rounded-1" role="tablist">
          <li class="nav-item" role="presentation">
            <button class="nav-link active rounded-0 bg-accent" id="pills-asign_homework-tab" data-bs-toggle="pill"
              data-bs-target="#pills-asign-homework" type="button" role="tab" aria-controls="pills-asign-homework"
              aria-selected="true">
              Asignadas
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link rounded-0 bg-accent" id="pills-expired-tab" data-bs-toggle="pill"
              data-bs-target="#pills-expired-homework" type="button" role="tab" aria-controls="pills-expired-homework"
              aria-selected="false">
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
            <div class="tab-pane fade show active" 
              id="pills-asign-homework" 
              role="tabpanel"
              aria-labelledby="pills-asign-homework-tab" tabindex="0">
              
              <HomeworkCard v-for="homework in assignedHomeworks"
                :key="homework._id"
                :name="homework.name"
                :groupName="homework.groupName" 
                :groupAvatar="homework.groupAvatar"
                dueDate="12/12/12"
              />

            </div>
            <div class="tab-pane fade" id="pills-expired-homework" role="tabpanel"
              aria-labelledby="pills-asign_homework-tab" tabindex="1">
              
              <HomeworkCard v-for="homework in assignedHomeworks"
                :key="homework._id"
                :name="homework.name"
                :groupName="homework.groupName" 
                :groupAvatar="homework.groupAvatar"
                dueDate="12/12/12"
              />
            </div>
            <div class="tab-pane fade" id="pills-completed-homework" role="tabpanel"
              aria-labelledby="pills-completed-homework-tab" tabindex="2">
              <HomeworkCard v-for="homework in assignedHomeworks"
                :key="homework._id"
                :name="homework.name"
                :groupName="homework.groupName" 
                :groupAvatar="homework.groupAvatar"
                dueDate="12/12/12"
              />
            </div>
          </div>
        </div>
    </div>
  </section>
</template>

<script>
import HomeworkCard from '../components/HomeworkCard.vue';

export default {
  components: {
    HomeworkCard
  },
  data() {
    return {
      assignedHomeworks: [{
        _id: 1,
        name: 'Tarea',
        groupName: 'POI',
        groupAvatar: 'http://localhost:5173/src/assets/images/POI_SignalFalgs.png'
      },
      {
        _id: 2,
        name: 'Tarea',
        groupName: 'POI',
        groupAvatar: 'http://localhost:5173/src/assets/images/POI_SignalFalgs.png'
      },
      {
        _id: 3,
        name: 'Tarea',
        groupName: 'POI',
        groupAvatar: 'http://localhost:5173/src/assets/images/POI_SignalFalgs.png'
      },
      {
        _id: 4,
        name: 'Tarea',
        groupName: 'POI',
        groupAvatar: 'http://localhost:5173/src/assets/images/POI_SignalFalgs.png'
      },
      {
        _id: 5,
        name: 'Tarea',
        groupName: 'POI',
        groupAvatar: 'http://localhost:5173/src/assets/images/POI_SignalFalgs.png'
      },
      {
        _id: 6,
        name: 'Tarea',
        groupName: 'POI',
        groupAvatar: 'http://localhost:5173/src/assets/images/POI_SignalFalgs.png'
      },
      {
        _id: 7,
        name: 'Tarea',
        groupName: 'POI',
        groupAvatar: 'http://localhost:5173/src/assets/images/POI_SignalFalgs.png'
      },
      {
        _id: 8,
        name: 'Tarea',
        groupName: 'POI',
        groupAvatar: 'http://localhost:5173/src/assets/images/POI_SignalFalgs.png'
      }],
      completeHomeworks: [1, 2, 3, 4, 5, 6, 7, 8, 9]
    }
  }
}
</script>

<style scoped>
</style>
