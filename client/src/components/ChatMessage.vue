<template>
  <div v-if="automaticMessage" class="row mx-3">
    <div class="text-center text-muted">
      <small>{{ content }}</small>
    </div>
  </div>
  <div
    v-else 
    :class="{ 'd-flex my-3': true, 'justify-content-end': ownMessage, 'justify-content-start': !ownMessage }">
    <img 
      v-if="!ownMessage" :src="avatar" 
      class="rounded-circle me-2 object-fit-cover" width="32" height="32" alt="Img">
    <small
      v-if="!/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/.test(content)" 
      :class="{ 'p-2 rounded-4 overflow-auto': true, 'bg-primary': ownMessage, 'bg-secondary': !ownMessage }" 
      data-bs-toggle="tooltip" 
      :data-bs-placement="ownMessage ? 'left' : 'right'"
      :data-bs-title="new Date(date).toLocaleString('es-MX', 'America/Monterrey')"  
    >
      {{ content }}
      <a v-for="attachment in message.attachments"
        class="d-block text-light fw-bold mt-2" role="button"
        :href="attachment.url" target="_blank" download>
        <img v-if="[ 'image/jpeg', 'image/jpg', 'image/gif', 'image/png' ].includes(attachment.type)" 
          :src="attachment.url" alt="" class="img-fluid" width="200">
        <span v-else class="fw-bold">{{ attachment.name }}</span>
      </a>
    </small>
    <a
      v-else
      :class="{ 'p-2 rounded-4 overflow-auto text-light': true, 'bg-primary': ownMessage, 'bg-secondary': !ownMessage }" 
      data-bs-toggle="tooltip"
      :href="content" target="_blank"
      :data-bs-placement="ownMessage ? 'left' : 'right'"
      :data-bs-title="new Date(date).toLocaleString('es-MX', 'America/Monterrey')"  
    >
      {{ content }}
      <a v-for="attachment in message.attachments"
        class="d-block text-light fw-bold mt-2" role="button"
        :href="attachment.url" target="_blank" download>
        <img v-if="[ 'image/jpeg', 'image/jpg', 'image/gif', 'image/png' ].includes(attachment.type)" 
          :src="attachment.url" alt="" class="img-fluid" width="200">
        <span v-else class="fw-bold">{{ attachment.name }}</span>
      </a>
    </a>
  </div>
</template>

<script>
import { Tooltip } from 'bootstrap'

export default {
  mounted() {
    new Tooltip(document.body, {
      selector: "[data-bs-toggle='tooltip']",
    });
  },
	props: [
    'ownMessage',
    'content',
    'avatar',
    'automaticMessage',
    'date',
    'message'
	],
	emits: [
	],
  methods: {

  }
}
</script>

<style scoped>
.object-fit-cover {
  object-fit: cover;
}
</style>