<template>
  <div :class="`d-flex my-3 align-items-center ${ ownMessage ? 'justify-content-end' : 'justify-content-start' }`">
    <img v-if="!ownMessage" src="http://localhost:5173/api/v1/images/image-1680859317450.jpg" class="rounded-circle me-2" width="32" height="32" alt="A">
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
    'content'
	],
	emits: [
	]
}
</script>

<style></style>