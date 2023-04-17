<template>
  <section class="bg-dark container-fluid h-100 overflow-auto">
    <div class="d-flex col h-100 align-items-center p-3 text-center">
      <div class="text-start w-25 bg-accent p-3 rounded-3 h-100 overflow-hidden me-2">
        <img class="img-fluid bg-primary rounded-2 mb-2" 
          width="75" height="75" style="width: 75px; height: 75px; object-fit: cover" 
          :src="group.avatar" alt="...">
        <h2 class="h4 text-nowrap text-truncate">{{ group.name }}</h2>
        <hr>
        <p class="fw-bold mb-1">Subgrupos</p>
        <ul class="list-group">
          <li role="button" class="bg-accent text-light py-1 rounded-0 border-0 list-group-item">General</li>
          <li v-for="subgroup in subgroups" role="button" 
            class="bg-primary text-light py-1 rounded-0 border-0 list-group-item">
            {{ subgroup.name }}
          </li>
        </ul>
      </div>
      <div class="w-75 bg-accent p-3 rounded-3 h-100 overflow-hidden">
        <div class="d-flex align-items-center">
          <img class="img-fluid bg-primary rounded-2" width="50" height="50" 
            style="width: 50px; height: 50px; object-fit: cover"
            :src="group.avatar"
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
              <span class="h5">Bienvenido a {{ group.name }}</span>
              <p>{{ group.description }}</p>
              <img :src="group.avatar" width="200" height="200"
                class="rounded-circle"
                style="width: 200px; height: 200px; object-fit: cover"
                alt="Foto de grupo" />
              <div class="row" id="forum-container">
                
                <PostCard
                  v-for="post in posts" 
                  :post="post"
                />

<!--
                <div class="d-flex mt-3 px-3">
                  <div class="d-flex align-items-start pt-3 mt-3">
                    <img :src="group.avatar" width="50" height="50"
                      class="img-fluid bg-primary rounded-circle" alt=""
                      style="width: 50px; height: 50px; object-fit: cover" />
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
                      <img 
                        src="https://d500.epimg.net/cincodias/imagenes/2019/11/04/lifestyle/1572892359_005767_1572892909_noticia_normal.jpg"
                        class="img-fluid"
                      />
                      <img 
                        src="data:image/jpeg;base64,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"
                        class="img-fluid"
                      />
                      <img
                        src="https://cdn.urbantecno.com/urbantecno/2022/07/De-esta-forma-podras-saber-de-donde-viene-una-imagen-en-internet.jpg"
                        class="img-fluid"
                      />
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
                      class="img-fluid bg-primary rounded-circle" alt=""
                      style="width: 50px; height: 50px; object-fit: cover" />
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
                    <div class="d-flex pt-3 bg-secondary px-3">
                      
                      <div class=" me-2">
                        <img src="../assets/images/POI_SignalFalgs.png" width="40" height="40"
                          class="img-fluid bg-primary rounded-circle" alt="" />
                      </div>
                      <div class="text-start rounded-3 pb-3 w-100">
                        <span class="ms-1 mb-0">Saul Goodman</span>
                        <small class="ms-1 mb-0">lunes 6:08pm</small>
                        <p class="ms-1 m-1 mb-0">
                          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, esse porro! Est molestiae vero vitae eius nemo? Ipsam molestiae hic beatae incidunt exercitationem obcaecati quis, at ab fuga. Voluptate, optio..
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
-->
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
                    
                    <HomeworkCard v-for="homework in assignedHomeworks"
                      :key="homework._id"
                      :homeworkId="homework._id"
                      :name="homework.name"
                      :groupName="homework.group.name" 
                      :groupAvatar="homework.group.avatar"
                      :dueDate="homework.dueDate"
                    />

                  </div>
                  <div class="tab-pane fade" id="pills-completed-homework" role="tabpanel"
                    aria-labelledby="pills-completed-homework-tab" tabindex="0">

                    <HomeworkCard v-for="homework in completeHomeworks"
                      :key="homework._id"
                      :homeworkId="homework._id"
                      :name="homework.name"
                      :groupName="homework.group.name" 
                      :groupAvatar="homework.group.avatar"
                      :dueDate="homework.dueDate"
                    />
                    
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
import PostCard from '@/components/PostCard.vue';

import GroupService from '@/services/group.service';
import PostService from '@/services/post.service';
import SubgroupService from '@/services/subgroup.service';
import HomeworkService from '../services/homework.service';

export default {
  components: {
    CreateHomework,
    AddUser,
    Buttons,
    HomeworkCard,
    Homework,
    PostCard
  },
  data() {
    return {
      groupId: '',
      group: [],
      posts: [],
      subgroups: [],
      assignedHomeworks: [],
      completeHomeworks: [],
      expiredHomeworks: []
    }
  },
  async created() {
    this.groupId = this.$route.params.id;
    this.group = await GroupService.findById(this.groupId);
    this.posts = await PostService.findByGroup(this.groupId);
    this.subgroups = await SubgroupService.findByGroup(this.groupId);
    
    this.assignedHomeworks = await HomeworkService.findByGroupPending(this.groupId);
    this.completeHomeworks = await HomeworkService.findByGroup(this.groupId);
    this.expiredHomeworks = await HomeworkService.findByGroupExpired(this.groupId);
  }
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

.bg:hover {
  background-color: #6d6f7d !important;
}
</style>
