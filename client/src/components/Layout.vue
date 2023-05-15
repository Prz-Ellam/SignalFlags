<template>
  <div class="h-100 d-flex flex-column">
    <header class="flex-grow-0 flex-shrink-1">
      <Navbar />
    </header>
    <div
      class="d-flex flex-md-row-reverse flex-column flex-grow-1 flex-shrink-1 overflow-auto"
    >
      <section class="flex-grow-1 flex-shrink-1 overflow-md-auto overflow-hidden">
        <RouterView />
      </section>
      <aside class="d-flex flex-grow-0 flex-shrink-1">
        <Sidebar />
      </aside>
    </div>
  </div>
</template>

<script>
import Navbar from './Navbar.vue';
import Sidebar from './Sidebar.vue';

export default {
  components: {
    Navbar,
    Sidebar
  }
}
</script>

<style scoped>
</style>
