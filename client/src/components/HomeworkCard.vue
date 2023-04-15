<template>
  <RouterLink :to="`/homework-detail/${homeworkId}`" class="d-block text-white h-100 bg p-3 container rounded-3 mb-3" role="button">
    <div class="d-flex align-items-center row">
      <div class="col-auto">
        <img :src="groupAvatar" width="50" height="50" class="img-fluid" alt="...">
      </div>
      <div class="col text-start text-nowrap text-truncate">
        <p class="mb-0 text-truncate">{{ name }}</p>
        <p class="mb-0 text-truncate">{{ groupName }}</p>
        <small class="mb-0 text-truncate">{{ dueDate }}</small>
      </div>
    </div>
  </RouterLink>
</template>

<script>
export default {
  props: {
    homeworkId: {
      type: String
    },
    name: {
      type: String
    },
    groupName: {
      type: String
    },
    dueDate: {
      type: String
    },
    groupAvatar: {
      type: String
    }
  },
  data() {
    return {

    }
  }
}
</script>

<style scoped>
.bg {
  background-color: #38393b;
}

.bg:hover {
  background-color: #6d6f7d;
}
</style>