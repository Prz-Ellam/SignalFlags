<template>
  <div class="modal modal-lg fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content bg-accent">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <label for="name" role="button" class="form-label">
                  Nombre del chat
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  class="bg-secondary form-control rounded-4"
                  
                >

                <label for="message-text" class="col-form-label">
                  Escriba un nombre para agregar miembros al chat.
                </label>
                <Autocomplete 
                  :items="users"
                  @click="selectedUser"
                />
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Autocomplete from './Autocomplete.vue';

export default {
  components: {
    Autocomplete
  }
}
</script>

<script setup>
</script>