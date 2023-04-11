<template>
  <nav class="d-flex justify-content-center align-items-center bg-accent w-100 p-2">
    <ul class="nav flex-md-column flex-row gap-5">
      <li class="nav-item">
        <RouterLink to="/" class="nav-icon position-relative">
          <i class="bi bi-person-square"></i>
        </RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink to="/chat" class="nav-icon position-relative">
          <!-- <span class="badge bg-danger rounded-circle position-absolute">1</span> -->
          <i class="bi bi-chat-dots"></i>
        </RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink to="/homework" class="nav-icon position-relative">
          <i class="bi bi-journal-check"></i>
        </RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink to="/" class="nav-icon position-relative">
          <i class="bi bi-gear"></i>
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {

}
</script>

<style scoped>
.bi {
  font-size: 1.75rem;
}

.badge {
  font-size: 0.65rem;
  bottom: -50%;
  right: -10%;
}
</style>