<template>
  <div class="bg-dark container-fluid h-100">
    <div class="row h-100">
      <section
        class="col-md-4 col-sm-12 bg-dark h-100 d-flex align-items-center"
      >
        <div
          class="bg-accent d-flex flex-column w-100 rounded-3 p-3"
          style="height: 95%;"
        >
          <div class="d-flex justify-content-between">
            <div class="d-flex align-items-center">
              <h2 class="text-center mb-0">Contactos</h2>
            </div>
            <div>
              <button
                class="btn border-0 mt-2 align-items-end"
                data-bs-toggle="modal"
                data-bs-target="#AddUsuertoGroupChat"
              >
                <i
                  class="h4 me-1 bi bi-pencil-square"
                  style="color: #6d6f7d;"
                ></i>
              </button>
            </div>
          </div>
          <hr />
          <div>
            <Autocomplete />
          </div>
          <div class="overflow-auto chat">
            <ChatContact
              v-for="chat in chats"
              :key="chat._id"
              :chatId="chat._id"
              :image="`/api/v1/images/${
                chat.avatar instanceof Array ? chat.avatar[0] : chat.avatar
              }`"
              :username="chat.name"
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
        class="bg-dark col-sm-12 col-md h-100 d-flex align-items-center ps-0 pe-0 pe-md-2"
      >
        <section
          class="bg-accent d-flex flex-column col w-100 rounded-3 my-3"
          style="height: 95%;"
        >
          <div
            class="d-flex justify-content-between align-items-center mt-3 px-3"
          >
            <div class="d-flex align-items-center">
              <img
                class="img-fluid rounded-circle actual-chat-user-image"
                :src="
                  selectedChat.avatar
                    ? '/api/v1/images/' + selectedChat.avatar
                    : ''
                "
                alt="Perfil"
              />
              <span class="h5 ms-3 mb-0">{{ selectedChat.name }}</span>
            </div>
            <div>
              <button class="btn border-0 position-relative me-3">
                <i class="h4 bi bi-telephone" style="color: #6d6f7d;"></i>
              </button>
              <button class="btn border-0 position-relative fw-bold">
                <i class="h4 bi bi-camera-video" style="color: #6d6f7d;"></i>
              </button>
            </div>
          </div>
          <hr class="mx-3" />

          <div class="overflow-auto p-2 h-100 chat" id="message-box">
            <ChatMessage
              v-for="message in messages"
              :key="message._id"
              :ownMessage="message.sender === user._id"
              :content="message.text"
            />
          </div>
          <hr class="mb-1 text-light" />
          <div class="input-group mb-1 p-2">
            <button
              class="btn border-0"
              style="transform: rotateY(0deg) rotate(45deg);"
            >
              <i
                class="h4 mb-0 me-1 bi bi-paperclip"
                style="color: #6d6f7d;"
              ></i>
            </button>
            <input
              type="text"
              id="message"
              class="bg-secondary form-control border-0 shadow-none text-white rounded-4"
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
            <button class="btn btn-dark" @click="sendMessage">Enviar</button>
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
import AddUserToGroupChat from '../components/AddUserToGroupChat.vue'
import { chatFindAllByUserService } from '../services/chat.service'
import {
  createMessage,
  messageFindAllByChatService,
} from '../services/message.service'

export default {
  components: {
    ChatContact,
    ChatMessage,
    Autocomplete,
    AddUserToGroupChat,
  },
  data() {
    return {
      user: {},
      content: '',
      actualChatId: '',
      selectedChat: [],
      chats: [],
      messages: [],
    }
  },
  async created() {
    this.user = JSON.parse(localStorage.getItem('user'))
    const response = await chatFindAllByUserService(this.user._id)
    console.log(response)
    if (response?.status) {
      this.chats = response.message
    }
  },
  mounted() {
    window.socket.on('message', (message) => {
      console.log(message)
    })

    window.socket.on('pushNotification', async () => {
      const response0 = await messageFindAllByChatService(this.actualChatId)
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

      const response = await chatFindAllByUserService(this.user._id)
      if (response?.status) {
        const chat2 = response.message.find(
          (chat) => chat._id === this.selectedChat?._id,
        )
        console.log(chat2)

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
  destroyed() {},
  methods: {
    async sendAlert(chatId) {
      this.selectedChat = this.chats.find((chat) => chat._id === chatId)
      console.log(this.selectedChat)
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
