<template>
  <section class="h-100 d-flex align-items-center">
    <div class="bg-accent d-flex flex-column w-100 rounded-3 p-3 h-95">
      <div class="d-flex align-items-center justify-content-between">
        <h2 class="mb-0">Contactos</h2>
        <button
          class="btn border-0"
          data-bs-toggle="modal"
          data-bs-target="#CreateChatGroup"
        >
          <i class="h4 me-1 bi bi-pencil-square"></i>
        </button>
      </div>
      <hr>
      <div>
        <Autocomplete
          class="mb-2" 
          :items="users"
          @click="onClickAutocomplete"/>
      </div>
      <div class="overflow-auto chat">
        <ChatContact
          v-for="chat in chats"
          :key="chat._id"
          :chatId="chat._id"
          :type="chat.type"
          :encrypted="chat.encrypted"
          :image="
            chat.avatar instanceof Array ? chat.avatar[0] : chat.avatar
          "
          :username="chat.name"
          :userId="chat.userId"
          :lastMessage="
            (chat.lastMessage.sender?._id) ?
            ((user._id === chat.lastMessage?.sender?._id
              ? 'Tú: '
              : chat.lastMessage.sender?.username + ': ') +
                chat.lastMessage?.text)
              :
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
</template>

<script>
import Autocomplete from '@/components/Autocomplete.vue';
import ChatContact from '@/components/ChatContact.vue';

import ChatService from '@/services/chat.service';

export default {
  components: {
    Autocomplete,
    ChatContact
  },
  props: {
    chats: {
      type: Array
    },
    users: {
      type: Array
    }
  },
  emits: [
    'onChatSelected'
  ],
  data() {
    return {
      user: {}
    }
  },
  async created() {
    this.user = JSON.parse(localStorage.getItem('user'));
  },
  methods: {
    async onClickAutocomplete(chatId) {
      await ChatService.access(chatId);
    },
    sendAlert(chat) {
      console.log(chat);
      this.$emit('onChatSelected', chat);
    }
  }
}
</script>

<style scoped>
.h-95 {
  height: 95%;
}

.chat {
  scrollbar-width: thin !important;
}

</style>