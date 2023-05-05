<template>
  <section class="h-100 d-md-flex align-items-center px-3 ps-md-0 pe-md-3 overflow-hidden">
    <div class="bg-accent d-flex flex-column w-100 rounded-3 p-md-0 my-3" style="height: 95%">
      <div v-if="selectedChat.name" class="d-flex justify-content-between align-items-center mt-3 px-3">
        <div class="d-flex align-items-center">
          <button class="btn border-0 ps-1 pe-2 d-md-none d-block" @click="deselectChat">
            <i class="bi fa-solid fa-chevron-left"></i>
          </button>
          <img v-if="selectedChat.avatar" class="img-fluid rounded-circle actual-chat-user-image"
            :src="selectedChat.avatar" alt="Perfil">
          <span class="h5 ms-3 mb-0">{{ selectedChat.name }}</span>
        </div>
        <div>
          <a v-if="selectedChat.type === 'group'" 
            data-bs-toggle="modal" data-bs-target="#members"
            class="btn border-0 position-relative fw-bold">
            <i class="h4 bi bi-people"></i>
          </a>
          <RouterLink :to="`/videocall/${ selectedChat?.chatId }`" 
            class="btn border-0 position-relative fw-bold">
            <i class="h4 bi bi-camera-video"></i>
          </RouterLink>
        </div>
      </div>
      <hr v-if="selectedChat.name" class="mx-3">
      <div v-if="selectedChat.name" class="overflow-auto p-2 h-100 chat" id="message-box">
        <ChatMessage v-for="message in messages" 
          :key="message._id" :automaticMessage="message.sender === null"
          :ownMessage="message.sender?._id === user._id" :content="message.text" 
          :avatar="message.sender?.avatar"
          :message="message"
          :date="message.createdAt" />
      </div>
      <hr v-if="selectedChat.name" class="mb-1 text-light" />
      
      <div v-if="selectedChat.name && files.length > 0" class="w-100" 
          style="height: 120px; white-space: nowrap; overflow-x: scroll;overflow-y:hidden; list-style: none;">
          <div id="filesContainer" class="d-flex pb-3">
            <div
              v-for="(file, i) in files"
              class="position-relative bg-dark rounded-3 m-1 p-3">
              <i class="bi bi-file-earmark-text"></i> 
              <small> {{ file.name }} </small>
              <span role="button" 
                class="badge bg-danger position-absolute top-0 end-0"
                @click="deleteFile(i)">
                &times;
              </span>
            </div>
            
            
          </div> 
        </div>
      <div v-if="selectedChat.name" class="input-group mb-1 p-2">
        <Buttons 
          @onClickFile="onUploadFiles"
          @onClickGeolocalization="onClickGeolocalization"
        />
        <input type="text" id="message" class="bg-secondary form-control border-0 shadow-none text-white"
          v-model="content" placeholder="Escribe un mensaje" aria-label="Enviar mensaje" aria-describedby="basic-addon2"
          @keydown="
            (e) => {
              if (e.key == 'Enter') sendMessage()
            }
          " />
        <button class="btn btn-dark input-group-text" @click="sendMessage">
          <i class="fa-solid fa-paper-plane-top"></i>Enviar
        </button>
      </div>
    </div>

    <div class="modal fade" id="members" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content bg-accent">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Miembros</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div v-for="user in members"
              class="d-flex align-items-center justify-content-between alert bg-dark my-1 py-2" 
              role="alert">
              <div>
                <img width="40" height="40" class="me-2 rounded-circle"
                  style="object-fit: cover;"
                  :src="`/api/v1/images/${ user.avatar }`" />
                  <span>{{ user.username }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </section>
</template>

<script>
import ChatMessage from '@/components/ChatMessage.vue'
import Buttons from '@/components/Buttons.vue'
import MessageService from '@/services/message.service';
import ChatService from '@/services/chat.service';
import Swal from 'sweetalert2';

export default {
  components: {
    ChatMessage,
    Buttons
  },
  props: {
    selectedChat: {
      type: Object
    },
    messages: {
      type: Array
    }
  },
  emits: [
    'onSendMessage',
    'onDeselectChat'
  ],
  async created() {
    this.user = JSON.parse(localStorage.getItem('user'));
  },
  watch: {
    selectedChat: async function(newVal, oldVal) {
      
      const members = await ChatService.findMembers(newVal.chatId);
      this.members = members;
    }
  },
  data() {
    return {
      isChatDrawerFocus: false,
      content: '',
      files: [],
      user: [],
      members: []
    }
  },
  methods: {
    onClickGeolocalization(url) {
      this.content = url;
    },
    async onUploadFiles(event) {
      const newFiles = Array.from(event.target.files);
      if (this.files.length + newFiles.length > 5) {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-right',
            iconColor: 'danger',
            customClass: {
              popup: 'bg-dark'
            },
            showConfirmButton: false,
            timer: 1500
          });
          await Toast.fire({
            icon: 'error',
            title: 'Solo 5 archivos por mensaje'
          });
          return;
      }
      
      for (const file of newFiles) {
        if (file.size > 8 * 1024 * 1024) {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-right',
            iconColor: 'danger',
            customClass: {
              popup: 'bg-dark'
            },
            showConfirmButton: false,
            timer: 1500
          });
          await Toast.fire({
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
    deselectChat() {
      this.$emit('onDeselectChat');
    },
    async sendMessage() {
      if (this.content.length < 1 && this.files.length < 1) {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-right',
          iconColor: 'danger',
          customClass: {
            popup: 'bg-dark'
          },
          showConfirmButton: false,
          timer: 1500
        });
        await Toast.fire({
          icon: 'error',
          title: 'Mensaje vacio'
        });
        return;
      }

      if (this.content.length > 512) {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-right',
          iconColor: 'danger',
          customClass: {
            popup: 'bg-dark'
          },
          showConfirmButton: false,
          timer: 1500
        });
        await Toast.fire({
          icon: 'error',
          title: 'El mensaje es muy largo'
        });
        return;
      }

      if (this.files.length > 0) {
        const formData = new FormData();
        formData.append('payload', JSON.stringify({ text: this.content }));
        for (const file of this.files) {
          formData.append('files', file);
        }
        await MessageService.createUploads(formData, this.selectedChat.chatId);
      }
      else {
        await MessageService.create({ text: this.content }, this.selectedChat.chatId);
      }
      //this.$emit('onSendMessage', { text: this.content, chatId: this.selectedChat.chatId });
      this.content = '';
      this.files = [];
    }
  }
}
</script>

<style scoped>
.actual-chat-user-image {
  width: 38px;
  height: 38px;
  object-fit: cover;
}

.chat {
  scrollbar-color: #ffb800 #6d6f7d !important;
  scrollbar-width: thin !important;
}

</style>