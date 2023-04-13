<template>
  <div v-if="automaticMessage" class="row mx-3">
    <div class="text-center text-muted">
      <small>{{ content }}</small>
    </div>
  </div>
  <div
    v-else 
    :class="`d-flex my-3 align-items-center ${ ownMessage ? 'justify-content-end' : 'justify-content-start' }`">
    <img 
      v-if="!ownMessage" :src="`/api/v1/images/${ avatar }`" 
      class="rounded-circle me-2 object-fit-cover" width="32" height="32" alt="Img">
    <small 
      :class="`${ ownMessage ? 'bg-primary' : 'bg-secondary' } text-light p-2 rounded-pill overflow-auto`" 
      data-bs-toggle="tooltip" data-bs-placement="left"
      data-bs-title="26 de enero de 2023 a las 02:21"
      ref="message"  
    >
      {{ content }}
    </small>
  </div>
</template>

<script>
export default {
  mounted() {
    
  },
	props: [
    'ownMessage',
    'content',
    'avatar',
    'automaticMessage'
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