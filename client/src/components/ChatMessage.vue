<template>
  <div 
    :class="`d-flex my-3 align-items-center ${ ownMessage ? 'justify-content-end' : 'justify-content-start' }`">
    <img 
      v-if="!ownMessage" :src="`/api/v1/images/${ avatar }`" 
      class="rounded-circle me-2" width="32" height="32" alt="A">
    <small 
      :class="`${ ownMessage ? 'bg-primary' : 'bg-secondary' } text-light p-2 rounded-pill overflow-auto`" 
      data-bs-toggle="tooltip" data-bs-placement="left"
      data-bs-title="26 de enero de 2023 a las 02:21">
      {{ content }}
    </small>
  </div>
</template>

<script>
export default {
	props: [
    'ownMessage',
    'content',
    'avatar'
	],
	emits: [
	]
}
</script>

<style></style>