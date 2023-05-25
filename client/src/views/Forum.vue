<template>
  <section class="container-fluid h-100">
    <div class="h-100 p-3 d-flex col text-center">
      <div class="bg-accent text-start w-25 p-3 rounded-3 h-100 me-2 overflow-hidden">
        <img 
          class="img-fluid bg-primary rounded-2 mb-2 img75" 
          width="75" height="75" 
          :src="group.avatar" alt="..."
        >
        <h2 class="h4 text-nowrap text-truncate">{{ group.name }}</h2>
        <hr>
        <p class="d-flex justify-content-between align-items-center fw-bold mb-1">
          <span class="">Subgrupos</span>
          <button v-if="isAdmin" class="btn btn-primary rounded-pill text-light" data-bs-toggle="modal" data-bs-target="#CreateSubgroup">
            <small>Agregar subgrupo</small>
          </button>
        </p>
       
        <ul class="list-group">
          <li role="button" 
            @click="selectGroup($route.params.id)"
            :class="{ 'bg-accent': $route.params.id !== groupId, 'bg-primary': $route.params.id === groupId }" 
            class="text-light py-1 rounded-2 border-0 list-group-item"
          >
            General
          </li>
          <li v-for="subgroup in subgroups" role="button"
            :bind="subgroup._id"
            :class="{ 'bg-accent': subgroup._id !== groupId, 'bg-primary': subgroup._id === groupId }" 
            class="text-light py-1 rounded-2 border-0 list-group-item"
            @click="selectGroup(subgroup._id)"
          >
            {{ subgroup.name }}
          </li>
        </ul>
      </div>
      <div class="d-flex flex-column w-75 bg-accent p-3 rounded-3 h-100 overflow-hidden">
        <div class="d-flex align-items-center">
          <img class="img-fluid bg-primary rounded-2 imgXD" width="50" height="50"
            :src="group.avatar"
            alt="Avatar">
          <span class="h5 ms-3 mb-0">General</span>
          <ul class="nav nav-pills ms-3 mb-0 rounded-1" id="pills-tab" role="tablist">
            <li class="nav-item" role="presentation">
              <button class="nav-link active rounded-0 bg-accent" id="pills-posts-tab" data-bs-toggle="pill"
                data-bs-target="#pills-posts" type="button" role="tab" aria-controls="pills-posts" aria-selected="true">
                Publicaciones
              </button>
            </li>
            <!--li class="nav-item" role="presentation">
              <button class="nav-link rounded-0 bg-accent" id="pills-homework-tab" data-bs-toggle="pill"
                data-bs-target="#pills-homework" type="button" role="tab" aria-controls="pills-homework"
                aria-selected="false">
                Tareas
              </button>
            </li-->
          </ul>
          <!-- Estos botones se muestran al admin del grupo  -->
          <button v-if="isAdmin" 
            class="btn border-0 bg-primary" data-bs-toggle="modal" data-bs-target="#CreateHomework">
            Nueva Tarea
            <i class="ms-1 bi bi-flag text-light"></i>
          </button>
          <button v-if="isAdmin" 
            class="btn border-0 bg-primary ms-2" data-bs-toggle="modal" data-bs-target="#CreateEmail">
            Correo
            <i class="ms-1 bi bi-flag text-light"></i>
          </button>
         
        </div>
        <hr>
        <div class="tab-content h-100 overflow-hidden" id="pills-tabContent">
          <!-- Grupo -->
          <div class="d-flex flex-column tab-pane fade h-100 overflow-hidden show active" id="pills-posts" role="tabpanel"
          aria-labelledby="pills-posts-tab" tabindex="0">
            
            <div class="overflow-auto h-100 py-2 px-3" ref="postBox" id="post-box">
              <div v-if="groupId === $route.params.id">
                <h5>Bienvenido a {{ group.name }}</h5>
                <p>{{ group.description }}</p>
                <img 
                  :src="group.avatar" 
                  width="200" height="200"
                  class="rounded-2 img200 bg-primary"
                  alt="Foto de grupo" 
                />
              </div>
              <div class="row">  
                <PostCard
                  v-for="post in posts" 
                  :post="post"
                />
              </div>
            </div>
           
            <!-- <button @click="sendEmail">Correo</button> -->
            <div v-if="files.length > 0" class="w-100" 
              style="height: 120px; white-space: nowrap; overflow-x: scroll;overflow-y:hidden; list-style: none;">
              <div id="filesContainer" class="d-flex pb-3">
                <div
                  v-for="(file, i) in files"
                  class="position-relative bg-dark rounded-3 m-1 p-3">
                  <i class="bi bi-file-earmark-text"></i> 
                  <small>{{ file.name }}</small>
                  <span role="button" 
                    class="badge bg-danger position-absolute top-0 end-0"
                    @click="deleteFile(i)">
                    &times;
                  </span>
                </div>
              </div> 
            </div>
            <div class="input-group p-2 my-1">
              <Buttons 
                @onClickFile="onUploadFiles"
                @onClickGeolocalization="onClickGeolocalization"
              />
              <input class="form-control bg-secondary text-white shadow-none py-0" 
                type="text" placeholder="Inicia una conversación..."
                id="message" 
                v-model="text"
                @keydown="
                (e) => {
                  if (e.key == 'Enter') sendPost()
                }"
                />
              <button class="btn border-0 bg-yellow" @click="sendPost">
                <i class="bi bi-flag"></i>
              </button>
            </div>
              
           
          </div>
          <!-- Tareas -->
          <div class="tab-pane fade h-100 overflow-hidden" id="pills-homework" role="tabpanel"
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
                    
                    <!-- <HomeworkCard v-for="homework in assignedHomeworks"
                      :key="homework._id"
                      :homeworkId="homework._id"
                      :name="homework.name"
                      :groupName="homework.group.name" 
                      :groupAvatar="homework.group.avatar"
                      :dueDate="homework.dueDate"
                    /> -->

                  </div>
                  <div class="tab-pane fade" id="pills-completed-homework" role="tabpanel"
                    aria-labelledby="pills-completed-homework-tab" tabindex="0">

                    <!-- <HomeworkCard v-for="homework in completeHomeworks"
                      :key="homework._id"
                      :homeworkId="homework._id"
                      :name="homework.name"
                      :groupName="homework.group.name" 
                      :groupAvatar="homework.group.avatar"
                      :dueDate="homework.dueDate"
                    /> -->
                    
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
  <CreateSubgroup />
  <CreateEmail />
</template>

<script>
import CreateHomework from '@/components/CreateHomework.vue';
import CreateSubgroup from '@/components/CreateSubgroup.vue';
import CreateEmail from '@/components/CreateEmail.vue';
import Buttons from '@/components/Buttons.vue';
import Homework from '@/views/Homework.vue';
import HomeworkCard from '@/components/HomeworkCard.vue';
import PostCard from '@/components/PostCard.vue';

import GroupService from '@/services/group.service';
import PostService from '@/services/post.service';
import SubgroupService from '@/services/subgroup.service';
import HomeworkService from '../services/homework.service';
import { ToastTopEnd } from '../utils/toast';

export default {
  components: {
    CreateHomework,
    CreateSubgroup,
    CreateEmail,
    Buttons,
    HomeworkCard,
    Homework,
    PostCard
  },
  data() {
    return {
      id: '',
      groupId: '',
      group: [],
      posts: [],
      subgroups: [],
      assignedHomeworks: [],
      completeHomeworks: [],
      expiredHomeworks: [],
      files: [],
      text: '',
      isAdmin: false
    }
  },
  async created() {
    this.id = JSON.parse(localStorage.getItem('user'))._id;
    this.groupId = this.$route.params.id;
    this.group = await GroupService.findById(this.groupId);
    
    this.isAdmin = this.group.admins.includes(this.id)

    this.posts = await PostService.findByGroup(this.groupId);
    this.subgroups = await SubgroupService.findByGroup(this.groupId);
    this.$nextTick(() => {
      const postBox = this.$refs.postBox;
      postBox.scrollTo({
        left: 0,
        top: postBox.scrollHeight,
      });
    });

    window.socket.on('groupNotification', async () => {
      const groupId = this.$route.params.id;
      this.subgroups = await SubgroupService.findByGroup(groupId);
    });

    window.socket.on('postNotification', async () => {
      this.posts = await PostService.findByGroup(this.groupId);
      this.$nextTick(() => {
        const postBox = this.$refs.postBox;
        postBox.scrollTo({
          left: 0,
          top: postBox.scrollHeight,
        })
      });
      this.text = '';
    });

    //this.assignedHomeworks = await HomeworkService.findByGroupPending(this.groupId);
    //this.completeHomeworks = await HomeworkService.findByGroup(this.groupId);
    //this.expiredHomeworks = await HomeworkService.findByGroupExpired(this.groupId);
  },
  beforeUnmount() {
    window.socket.off('groupNotification');
    window.socket.off('postNotification');
  },
  methods: {
    onClickGeolocalization(url) {
      this.text = url;
    },
    async onUploadFiles(event) {
      const newFiles = Array.from(event.target.files);
      if (this.files.length + newFiles.length > 5) {
        ToastTopEnd.fire({
          icon: 'error',
          title: 'Solo 5 archivos por mensaje'
        });
        return;
      }
      
      for (const file of newFiles) {
        if (file.size > 8 * 1024 * 1024) {
          ToastTopEnd.fire({
            icon: 'error',
            title: 'Archivo muy pesado'
          });
          return;
        }
      }

      this.files = this.files.concat(newFiles);
      console.log(this.files);
    },
    deleteFile(i) {
      this.files.splice(i, 1);
      console.log(this.files);
    },
    async sendPost() {
      if (this.text.trim().length < 1 && this.files.length < 1) {
        ToastTopEnd.fire({
          icon: 'error',
          title: 'Mensaje vacío'
        });
        return;
      }

      const post = {
        content: this.text
      }
      
      if (this.files.length > 0) {
        const formData = new FormData();
        formData.append('payload', JSON.stringify(post));
        for (const file of this.files) {
          formData.append('files', file);
        }
        await PostService.createUploads(formData, this.groupId);
      }
      else {
        await PostService.create(post, this.groupId);
      }

      this.text = '';
      this.files = [];
    },
    async selectGroup(subgroup) {
      this.groupId = subgroup;
      this.posts = await PostService.findByGroup(subgroup);
    },
    async sendEmail() {
      const id = this.$route.params.id;
      await GroupService.sendEmail(id);
    }
  }
}
</script>

<style scoped>
.box2 {
  position: static;
  overflow-y: scroll;
  overflow-x: unset;
  height: 100%;
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

.imgXD {
  width: 50px; 
  height: 50px; 
  object-fit: cover;
}

.img75 {
  width: 75px; 
  height: 75px; 
  object-fit: cover;
}

.img200 {
  width: 200px; 
  height: 200px; 
  object-fit: cover;
}
</style>
