<template>
  <div class="bg-dark container-fluid h-100">
    <div class="row h-100">
      <ChatList 
        class="col-md-4 col-sm-12 d-md-flex"
        :class="{ 'd-flex': isChatDrawerFocus, 'd-none': !isChatDrawerFocus }"
        :chats="chats"
        :users="users"
        @onChatSelected="chatSelected"
      />

      <ChatBox 
        class="col-sm-12 col-md d-md-flex"
        :class="{ 'd-flex': !isChatDrawerFocus, 'd-none': isChatDrawerFocus }"
        :selectedChat="selectedChat"
        :messages="messages"
        @onSendMessage="sendMessage"
      />
      <!-- <section 
        class="col-sm-12 col-md h-100 d-md-flex align-items-center px-3 ps-md-0 pe-md-3"
        :class="{ 'd-flex': !isChatDrawerFocus, 'd-none': isChatDrawerFocus }"
      >
        <section class="bg-accent d-flex flex-column w-100 rounded-3 p-md-0 my-3" 
          style="height: 95%">

          <div class="d-flex justify-content-between align-items-center mt-3 px-3">
            <div class="d-flex align-items-center">
              <button class="btn border-0 ps-1 pe-2 d-md-none d-block" 
                @click="isChatDrawerFocus = true">
                <i class="bi fa-solid fa-chevron-left"></i>
              </button>
              <img
                v-if="selectedChat.avatar"
                class="img-fluid rounded-circle actual-chat-user-image"
                :src="selectedChat.avatar ? '/api/v1/images/' + selectedChat.avatar : ''" 
                alt="Perfil">
              <span class="h5 ms-3 mb-0">{{ selectedChat.name }}</span>
            </div>
            <div>
              <button
                class="btn border-0 position-relative fw-bold"
                data-bs-toggle="modal"
                data-bs-target="#modalAddUsers"
              >
                <i class="h4 ms-1 bi bi-pencil-square"></i>
              </button>
              <button class="btn border-0 position-relative fw-bold">
                <i class="h4 bi bi-camera-video"></i>
              </button>
            </div>
          </div>
          <hr class="mx-3">

          <div class="overflow-auto p-2 h-100 chat" id="message-box">
            <ChatMessage
              v-for="message in messages"
              :key="message._id"
              :automaticMessage="message.sender === null"
              :ownMessage="message.sender?._id === user._id"
              :content="message.text"
              :avatar="message.sender?.avatar"
              :date="message.createdAt"
            />
          </div>
          <hr class="mb-1 text-light" />
          <div class="input-group mb-1 p-2">
            <Buttons />
            <input
              type="text"
              id="message"
              class="bg-secondary form-control border-0 shadow-none text-white"
              v-model="content"
              placeholder="Escribe un mensaje"
              aria-label="Enviar mensaje"
              aria-describedby="basic-addon2"
              @keydown="
                (e) => {
                  if (e.key == 'Enter') sendMessage()
                }
              "
            />
            <button class="btn btn-dark input-group-text" @click="sendMessage">
              <i class="fa-solid fa-paper-plane-top"></i>Enviar
            </button>
          </div>
        </section>
      </section> -->
    </div>

    <AddUserToGroupChat />
  </div>
</template>

<script>
import ChatContact from '../components/ChatContact.vue'
import ChatMessage from '../components/ChatMessage.vue'
import Autocomplete from '../components/Autocomplete.vue'
import Buttons from '../components/Buttons.vue'
import AddUserToGroupChat from '../components/AddUserToGroupChat.vue'
import ChatList from '../components/ChatList.vue';
import ChatBox from '../components/ChatBox.vue';

import ChatService from '@/services/chat.service';

import { chatFindAllByUserService } from '../services/chat.service'
import {
  createMessage,
  messageFindAllByChatService,
} from '../services/message.service'
import { userFindAllWithoutChatService } from '../services/user.service'
import { chatAccessService } from '../services/chat.service';

export default {
  components: {
    ChatContact,
    ChatMessage,
    Autocomplete,
    AddUserToGroupChat,
    Buttons,
    ChatList,
    ChatBox
  },
  data() {
    return {
      user: {},
      content: '',
      actualChatId: '',
      selectedChat: {},
      chats: [],
      messages: [],
      users: [],
      isChatDrawerFocus: true
    }
  },
  async created() {
    const response2 = await userFindAllWithoutChatService();
    if (response2?.status) {
      this.users = response2.message;
    }

    this.user = JSON.parse(localStorage.getItem('user'));

    const response = await ChatService.findByUser(this.user._id);
    if (response?.status) {
      this.chats = response.message
    }
  },
  mounted() {
    window.socket.on('message', (message) => {
      console.log(message)
    })

    window.socket.on('pushNotification', async (id) => {
      if (this.actualChatId) {
        const response0 = await messageFindAllByChatService(this.actualChatId);
        if (response0?.status) {
          this.messages = response0.message
          this.$nextTick(() => {
            const messageBox = document.getElementById('message-box')
            messageBox.scrollTo({
              left: 0,
              top: messageBox.scrollHeight,
            })
          })
        }
      }

      const response = await chatFindAllByUserService(this.user._id)
      if (response?.status) {
        const chat2 = response.message.find(
          (chat) => chat._id === this.selectedChat?._id,
        )

        this.chats = response.message
        const totalUnseenMessages = this.chats.reduce(
          (total, message) => total + message.unseenMessagesCount,
          0,
        )
        // if (totalUnseenMessages > 0) {
        //   const notificationSound = new Audio('src/assets/audios/notification.mp3');
        //   notificationSound.play();
        // }
      }
    })
  },
  destroyed() {
    window.socket.off('message');
    window.socket.off('pushNotification');
  },
  methods: {
    async print(id) {
      await chatAccessService(id);
    },
    async chatSelected(chat) {
      this.selectedChat = chat;
     
      // this.selectedChat = this.chats.find((chat) => chat._id === chatId)
      const response = await messageFindAllByChatService(this.selectedChat.chatId)
      if (response?.status) {
         this.messages = response.message
         this.$nextTick(() => {
           const messageBox = document.getElementById('message-box')
           messageBox.scrollTo({
             left: 0,
             top: messageBox.scrollHeight,
           })
         })
      }
      const response2 = await chatFindAllByUserService(this.user._id)
      if (response2?.status) {
        this.chats = response2.message
      }
      this.isChatDrawerFocus = false;
    },
    async sendMessage(content) {
      console.log(content);
      const response = await createMessage(
        { text: content.text },
        content.chatId,
      )
      if (response?.status) {
        //this.content = ''
        const response = await messageFindAllByChatService(content.chatId);
        if (response?.status) {
          this.messages = response.message
        }
        const messageBox = document.getElementById('message-box')
        messageBox.scrollTo({
          left: 0,
          top: messageBox.scrollHeight,
          behavior: 'smooth',
        })
      }
    },
  },
}
</script>

<style scoped>
</style>
