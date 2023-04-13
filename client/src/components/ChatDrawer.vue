<template>
  <section
    class="col-md-4 col-sm-12 h-100 d-flex d-md-flex align-items-center"
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
</template>

<script>
import Autocomplete from '@/components/Autocomplete.vue';
import ChatContact from '@/components/ChatContact.vue';

export default {
  components: {
    Autocomplete,
    ChatContact
  },
  data() {
    return {
      chats: []
    }
  }
}
</script>

<style scoped>
</style>