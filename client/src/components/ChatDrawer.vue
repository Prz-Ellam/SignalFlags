<template>
  <div class="bg-accent d-flex flex-column w-100 rounded-3 p-3" style="height: 95%;">
    <h2 class="text-center mb-0">Contactos</h2>
    <hr>
    <input type="search" name="search" class="bg-secondary form-control shadow-none text-white rounded-4 mb-1"
      placeholder="Buscar personas...">
    <div class="overflow-auto chat">
      <ChatContact v-for="i in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]" />
    </div>
  </div>
</template>

<script>
import ChatContact from '@/components/ChatContact.vue';

export default {
  components: {
    ChatContact
  }
}
</script>

<style scoped></style>