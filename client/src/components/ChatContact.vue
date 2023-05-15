<template>
  <div class="chat-drawer rounded-3 p-2" role="button">
    <div @click="handleClick" class="d-flex justify-content-between align-items-center">
      <div class="d-flex overflow-hidden">
        <div class="position-relative">
          <img :src="image" alt="Avatar" class="rounded-circle me-3">
          <span :class="dotClasses"></span>
        </div>
        <div :class="{ 'text-nowrap text-truncate': true, 'text-muted': unseenMessagesCount === 0 }">
          <p class="h6 mb-0 text-light text-truncate">{{ username }}</p>
          <small :class="lastMessageClasses">{{ lastMessage }}</small>
        </div>
      </div>
      <div>
        <p class="small text-muted text-end text-nowrap mb-1">{{ lastMessageTime }}</p>
        <span :class="badgeClasses">{{ unseenMessagesCount }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'chatId',
    'encrypted',
    'userId',
    'image',
    'username',
    'lastMessage',
    'lastMessageTime',
    'unseenMessagesCount',
    'active',
    'type'
  ],
  emits: [
    'click'
  ],
  created() {
  },
  computed: {
    dotClasses() {
      return {
        dot: this.type !== 'group',
        green: this.active,
        gray: !this.active
      };
    },
    badgeClasses() {
      return {
        'badge rounded-pill bg-danger float-end': true,
        'hidden': this.unseenMessagesCount === 0
      };
    },
    lastMessageClasses() {
      return {
        'mb-0': true,
        'fw-bold': this.unseenMessagesCount !== 0,
        'text-muted': this.unseenMessagesCount === 0
      }
    }
  },
  methods: {
    handleClick(event) {
      this.$emit('click', {
        chatId: this.chatId,
        userId: this.userId,
        avatar: this.image,
        name: this.username,
        lastMessage: this.lastMessage,
        lastMessageTime: this.lastMessageTime,
        unseenMessagesCount: this.unseenMessagesCount,
        active: this.active,
        type: this.type,
        encrypted: this.encrypted
      });
    },
    userLastMessage() {
      //const user = JSON.parse(localStorage.getItem('user'));
      //return user._id == this.userId ? 'Tú' : this.username
    }
  }
}
</script>

<style scoped>
img {
  width: 40px;
  height: 40px;
  object-fit: cover;
}

.dot {
  position: absolute;
  bottom: 0;
  left: 50%;
  height: 10px;
  width: 10px;
  border-radius: 50%;
  display: inline-block;
}

.green {
  background-color: #31a24c;
}

.gray {
  background-color: #494949;
}

.chat-drawer:hover {
  background-color: #232323;
}

.hidden {
  visibility: hidden;
}
</style>