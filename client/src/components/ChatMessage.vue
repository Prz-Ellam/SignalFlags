<template>
  <div v-if="automaticMessage" class="row mx-3">
    <div class="text-center text-muted">
      <small>{{ content }}</small>
    </div>
  </div>
  <div
    v-else 
    :class="`d-flex my-3 ${ ownMessage ? 'justify-content-end' : 'justify-content-start' }`">
    <img 
      v-if="!ownMessage" :src="`/api/v1/images/${ avatar }`" 
      class="rounded-circle me-2 object-fit-cover" width="32" height="32" alt="Img">
    <small 
      :class="`${ ownMessage ? 'bg-primary' : 'bg-secondary' } p-2 rounded-pill overflow-auto`" 
      data-bs-toggle="tooltip" 
      :data-bs-placement="ownMessage ? 'left' : 'right'"
      :data-bs-title="new Date(date).toLocaleString('es-MX', 'America/Monterrey')"  
    >
      {{ content }}
    </small>
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
    'date'
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