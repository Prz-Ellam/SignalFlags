<!-- DEPRECATED -->
<template>
  <section class="container bg-accent my-4 rounded-3">
    <ProfilePicture />

    <div class="mb-4">
      <label for="username" role="button" class="form-label">Nombre de usuario</label>
      <input v-model="username" type="text" name="username"
        class="bg-secondary form-control rounded-4">
    </div>

    <label for="username" role="button" class="form-label">Correo electrónico</label>
      <input v-model="username" type="text" name="username"
        class="bg-secondary form-control rounded-4">
  </section>
</template>

<script>
import ProfilePicture from '@/components/ProfilePicture.vue';

export default {
  components: {
    ProfilePicture
  }
}
</script>

<style scoped></style>