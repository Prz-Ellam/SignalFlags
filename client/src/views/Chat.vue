<template>
  <div class="bg-dark container-fluid h-100">
    <div class="row h-100">
      
      <section
        class="col-md-4 col-sm-12 h-100 d-md-flex align-items-center"
        :class="{ 'd-flex': isChatDrawerFocus, 'd-none': !isChatDrawerFocus }"
      >
        <div
          class="bg-accent d-flex flex-column w-100 rounded-3 p-3"
          style="height: 95%;"
        >
          <div class="d-flex align-items-center justify-content-between">
            <h2 class="text-center mb-0">Contactos</h2>
            <div>
              <button
                class="btn border-0 mt-2 align-items-end"
                data-bs-toggle="modal"
                data-bs-target="#AddUsuertoGroupChat"
              >
                <i class="h4 me-1 bi bi-pencil-square"></i>
              </button>
            </div>
          </div>
          <hr>
          <div>
            <Autocomplete 
              :items="users"
              @click="print"/>
          </div>
          <div class="overflow-auto chat">
            <ChatContact
              v-for="chat in chats"
              :key="chat._id"
              :chatId="chat._id"
              :type="chat.type"
              :image="`/api/v1/images/${
                chat.avatar instanceof Array ? chat.avatar[0] : chat.avatar
              }`"
              :username="chat.name"
              :userId="chat.lastMessage.sender?._id"
              :lastMessage="
                (user._id === chat.lastMessage.sender?._id
                  ? 'Tú: '
                  : chat.lastMessage.sender?.username + ': ') +
                chat.lastMessage?.text
              "
              :lastMessageTime="chat.lastMessageTime"
              :unseenMessagesCount="chat.unseenMessagesCount"
              :active="chat.active"
              @click="sendAlert"
            />
          </div>
        </div>
      </section>

      <section 
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
            />
          </div>
          <hr class="mb-1 text-light" />
          <div class="input-group mb-1 p-2">
            <Buttons />
            <input
              type="text"
              id="message"
              class="bg-secondary form-control border-0 shadow-none text-white "
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
      </section>
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
import ChatDrawer from '../components/ChatDrawer.vue';

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
    Buttons
  },
  data() {
    return {
      user: {},
      content: '',
      actualChatId: '',
      selectedChat: [],
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

    this.chats = await ChatService.findByUser(this.user._id);

    const response = await chatFindAllByUserService(this.user._id)
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
    async sendAlert(chatId) {
      this.selectedChat = this.chats.find((chat) => chat._id === chatId)
      const response = await messageFindAllByChatService(chatId)
      if (response?.status) {
        this.messages = response.message
        this.actualChatId = chatId
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
    async sendMessage() {
      const response = await createMessage(
        { text: this.content },
        this.actualChatId,
      )
      if (response?.status) {
        this.content = ''
        const response = await messageFindAllByChatService(this.actualChatId)
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
.chat-drawer:hover {
  background-color: #232323;
  cursor: pointer;
}

.chat-drawer a div img {
  width: 40px;
  height: 40px;
  object-fit: cover;
}

.chat-drawer a div div {
  text-overflow: ellipsis;
}

.chat-drawer adiv div small {
  overflow: hidden;
  text-overflow: ellipsis;
}

.chat-drawer a div div p {
  overflow: hidden;
  text-overflow: ellipsis;
}

.actual-chat-user-image {
  width: 38px;
  height: 38px;
  object-fit: cover;
}

.visibility-hidden {
  visibility: hidden;
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
