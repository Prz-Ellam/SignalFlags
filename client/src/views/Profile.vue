<template>
  <section class="container bg-accent my-4 rounded-3 text-center">
    <ProfilePicture />

    

    <div class="mb-4">
      <label for="username" role="button" class="form-label">Nombre de usuario</label>
      <input v-model="username" type="text" name="username"
        class="bg-secondary form-control rounded-4">
    </div>

    <label for="username" role="button" class="form-label">Correo electrónico</label>
      <input v-model="username" type="text" name="username" class="bg-secondary form-control rounded-4">
    <button type="submit" class="m-3 bd-highlight btn btn-primary rounded-3" > Editar perfil </button>
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