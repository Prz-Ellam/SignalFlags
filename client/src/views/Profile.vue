<template>
  <section class="container bg-accent my-4 rounded-3 text-center">
    <div class="container p-4">
      <ProfilePicture />

      <div class=" mt-4 me-5 ms-5">
        <div class="m-2">
          <label for="username" role="button" class="form-label">
          Nombre de usuario
          </label>
          <input v-model="username" type="text" name="username" class="bg-secondary form-control rounded-4" />
        </div>

        <div class="m-2">
          <label for="username" role="button" class="form-label">
            Correo electrónico
          </label>
          <input v-model="username" type="text" name="username" class="bg-secondary form-control rounded-4"
          />
          
          
        </div>     
        
        <button type="submit" class="m-1 bd-highlight btn btn-primary rounded-3" >
            Actualizar
          </button>
      </div>
      <hr>
    <button type="submit" class="m-1 bd-highlight btn btn-primary rounded-3" data-bs-toggle="modal" data-bs-target="#ChangePassword">
            Cambiar contraseña
          </button>
    </div>
    <ChangePassword id="ChangePassword"/>

  </section>
</template>

<script>
import ProfilePicture from '@/components/ProfilePicture.vue'
import ChangePassword from '@/components/ChangePassword.vue';

export default {
  components: {
    ChangePassword,
    ProfilePicture,

  },
}
</script>

<style scoped></style>
