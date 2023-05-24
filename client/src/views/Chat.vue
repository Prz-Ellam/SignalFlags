<template>
  <section class="bg-dark container-fluid h-100">
    <div class="row h-100">
      <ChatList 
        class="col-sm-12 col-md-5 col-lg-4 d-md-flex"
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
        @onDeselectChat="() => isChatDrawerFocus = true"
      />
    </div>

    <CreateChatGroup id="AddUsuertoGroupChat" />
    <!-- <UpdateChatGroup /> -->
  </section>
</template>

<script>
import ChatContact from '@/components/ChatContact.vue'
import ChatMessage from '@/components/ChatMessage.vue'
import Autocomplete from '@/components/Autocomplete.vue'
import Buttons from '@/components/Buttons.vue'
import CreateChatGroup from '@/components/CreateChatGroup.vue'
import ChatList from '@/components/ChatList.vue';
import ChatBox from '@/components/ChatBox.vue';

import MessageService from '@/services/message.service';
import ChatService from '@/services/chat.service';
import UserService from '@/services/user.service';

export default {
  components: {
    ChatContact,
    ChatMessage,
    Autocomplete,
    CreateChatGroup,
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
    const response2 = await UserService.findWithoutChat();
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
    window.socket.on('messageInsert', async (message) => {
      if (this.selectedChat?.chatId) {
        const response = await MessageService.findByChat(this.selectedChat.chatId);
        if (response?.status) {
          this.messages = response.message;
          this.$nextTick(() => {
            const messageBox = document.getElementById('message-box')
            messageBox.scrollTo({
              left: 0,
              top: messageBox.scrollHeight,
            })
          })
        }
      }
    });

    window.socket.on('pushNotification', async (id) => {

      console.log(id);
      console.log(this.selectedChat);
      
      const response = await ChatService.findByUser(this.user._id)
      if (response?.status) {
        const chat2 = response.message.find(
          (chat) => chat._id == this.selectedChat?.chatId,
        )

        if (chat2) {
          this.selectedChat.encrypted = chat2.encrypted;
        }
        
        this.chats = response.message;
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
  beforeUnmount() {
    window.socket.off('message');
    window.socket.off('messageInsert');
    window.socket.off('pushNotification');
    window.socket.emit('leaveRooms');
  },
  methods: {
    async print(id) {
      await ChatService.access(id);
    },
    async chatSelected(chat) {
      console.log(chat);
      this.selectedChat = chat;

      window.socket.emit('selectChat', this.selectedChat.chatId);
     
      // this.selectedChat = this.chats.find((chat) => chat._id === chatId)
      const response = await MessageService.findByChat(this.selectedChat.chatId)
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
      const response2 = await ChatService.findByUser(this.user._id)
      if (!response2?.status) {
        return;
      }
      this.chats = response2.message
      this.isChatDrawerFocus = false;
    }
  },
}
</script>