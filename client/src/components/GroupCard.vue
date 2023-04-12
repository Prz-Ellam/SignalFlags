<template>
  <div class="col-sm-6 col-md-4 col-lg-3">
    <RouterLink to="/forum"
      class="box-button mb-4 text-white d-flex flex-column justify-content-center align-items-center shadow-sm rounded-3"
      role="button">
      <div class="d-flex align-items-center image-content">
        <img :src="avatar" alt="Foto de grupo"
          class="rounded group-img" />
      </div>
      <div class="d-flex align-items-start px-3 text-content">
        <h6 class="text">{{ name }}</h6>
      </div>
    </RouterLink>
  </div>
</template>

<script>
export default {
  props: [
    'name',
    'avatar'
  ]
}
</script>

<style scoped>
.box-button {
  background-color: #38393b;
  height: 240px; 
  min-width: 200px;
}

.box-button:hover {
  background-color: #6d6f7d;
}

.image-content {
  height: 66%;
}

.text-content {
  height: 33%;
}
</style>