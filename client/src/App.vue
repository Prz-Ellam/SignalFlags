<template>
  <main>
    <RouterView />
  </main>
</template>

<script>
import Layout from './components/Layout.vue';

export default {
  components: {
    Layout
  },
  data: () => ({

  }),
  setup() {
    
  }
};
</script>

<style scoped>
main {
  background-color: #232323;
}
</style>