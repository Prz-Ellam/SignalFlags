<template>
  <section class="bg-dark container-fluid h-100">
    <div class="row h-100">
      <ChatList 
        class="col-sm-12 col-md-4 d-md-flex"
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
        @onDeselectChat="() => isChatDrawerFocus = true"
      />
    </div>

    <AddUserToGroupChat id="AddUsuertoGroupChat" />
    <UpdateChatGroup />
  </section>
</template>

<script>
import ChatContact from '@/components/ChatContact.vue'
import ChatMessage from '@/components/ChatMessage.vue'
import Autocomplete from '@/components/Autocomplete.vue'
import Buttons from '@/components/Buttons.vue'
import AddUserToGroupChat from '@/components/AddUserToGroupChat.vue'
import ChatList from '@/components/ChatList.vue';
import ChatBox from '@/components/ChatBox.vue';
import UpdateChatGroup from '@/components/UpdateChatGroup.vue';

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
    ChatBox,
    UpdateChatGroup
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
      this.chats = response.message;
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
      const response = await createMessage(
        { text: content.text },
        content.chatId,
      );
      if (response?.status) {
        //this.content = ''
        const response = await messageFindAllByChatService(content.chatId);
        if (response?.status) {
          this.messages = response.message;
          this.$nextTick(() => {
            const messageBox = document.getElementById('message-box')
            messageBox.scrollTo({
              left: 0,
              top: messageBox.scrollHeight,
              behavior: 'smooth',
            });
          });
        }
      }
    },
  },
}
</script>

<style scoped>
</style>
