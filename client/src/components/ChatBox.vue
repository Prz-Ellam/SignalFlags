<template>
  <section class="h-100 d-md-flex align-items-center px-3 ps-md-0 pe-md-3">
    <section class="bg-accent d-flex flex-column w-100 rounded-3 p-md-0 my-3" style="height: 95%">
      <div class="d-flex justify-content-between align-items-center mt-3 px-3">
        <div class="d-flex align-items-center">
          <button class="btn border-0 ps-1 pe-2 d-md-none d-block" @click="isChatDrawerFocus = true">
            <i class="bi fa-solid fa-chevron-left"></i>
          </button>
          <img v-if="selectedChat.avatar" class="img-fluid rounded-circle actual-chat-user-image"
            :src="selectedChat.avatar" alt="Perfil">
          <span class="h5 ms-3 mb-0">{{ selectedChat.name }}</span>
        </div>
        <div>
          <button class="btn border-0 position-relative fw-bold" data-bs-toggle="modal" data-bs-target="#modalAddUsers">
            <i class="h4 ms-1 bi bi-pencil-square"></i>
          </button>
          <button class="btn border-0 position-relative fw-bold">
            <i class="h4 bi bi-camera-video"></i>
          </button>
        </div>
      </div>
      <hr class="mx-3">

      <div class="overflow-auto p-2 h-100 chat" id="message-box">
        <ChatMessage v-for="message in messages" 
          :key="message._id" :automaticMessage="message.sender === null"
          :ownMessage="message.sender?._id === user._id" :content="message.text" 
          :avatar="message.sender?.avatar"
          :date="message.createdAt" />
      </div>
      <hr class="mb-1 text-light" />
      <div class="input-group mb-1 p-2">
        <Buttons />
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
    </section>
  </section>
</template>

<script>
import ChatMessage from '../components/ChatMessage.vue'
import Buttons from '../components/Buttons.vue'
import { createMessage, messageFindAllByChatService } from '../services/message.service';

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
    'onSendMessage'
  ],
  created() {
    this.user = JSON.parse(localStorage.getItem('user'));
  },
  data() {
    return {
      isChatDrawerFocus: false,
      content: '',
      user: []
    }
  },
  methods: {
    async sendMessage() {
      this.$emit('onSendMessage', { text: this.content, chatId: this.selectedChat.chatId });
      this.content = '';
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

.chat::-webkit-scrollbar {
  width: 8px;
  border-radius: 1em;
  background-color: #6d6f7d;
  border-radius: 1em;
}

.chat::-webkit-scrollbar-thumb {
  border-radius: 1em;
  background-color: #6d6f7d;
  background: #ffb800;
  border-radius: 1em;
}

.chat::-webkit-scrollbar-thumb:hover {
  visibility: visible;
  background: #ffb800;
}
</style>