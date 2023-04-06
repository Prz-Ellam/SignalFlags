<template>
  <nav class="w-100 p-2 d-flex bg-accent justify-content-center align-items-center">
    <ul class="nav flex-md-column flex-row gap-5">
      <li class="nav-item">
        <RouterLink to="/" class="nav-icon">
          <i class="bi bi-person-square" style="font-size: 28px;"></i>
        </RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink to="/chat" class="nav-icon">
          <i class="bi bi-chat-dots" style="font-size: 28px;"></i>
        </RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink to="/homework" class="nav-icon">
          <i class="bi bi-journal-check" style="font-size: 28px;"></i>
        </RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink to="/" class="nav-icon">
          <i class="bi bi-gear" style="font-size: 28px;"></i>
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>

<script>
</script>

<style scoped></style>