<template>
  <div :class="`d-flex my-3 ${ ownMessage ? 'justify-content-end' : 'justify-content-start' }`">
    <small 
      :class="`${ ownMessage ? 'bg-primary' : 'bg-dark' } text-light p-2 rounded-pill overflow-auto`" 
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