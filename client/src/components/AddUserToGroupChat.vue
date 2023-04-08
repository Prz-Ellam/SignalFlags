<template>
  <div>
    <div
      class="modal fade modal-lg pt-5"
      id="AddUsuertoGroupChat"
      tabindex="-1"
      aria-labelledby="modalGroup"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content bg-accent">
          <div class="modal-header">
            <h5 class="modal-title" id="modalGroup">
              Agregar usuarios a el grupo:
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label for="message-text" class="col-form-label">
                  Escriba un nombre para agregar miembros al chat.
                </label>
                <div class="input-group">
                  <input
                    class="form-control shadow-none bg-secondary border-0 rounded-2 text-white"
                    type="text"
                    name="name_user"
                    id="name_user"
                    placeholder="Nombre..."
                    v-model="search"
                    v-on:keyup="onChange"
                    @keydown.down="onArrowDown"
                    @keydown.up="onArrowUp"
                    @keydown.enter="onEnter"
                  />
                  <Autocomplete />
                </div>
              </div>
              <div class="mb-3"></div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-primary border-0 m-2 rounded-3"
              type="button"
            >
              <span>Crear</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Autocomplete from '../components/Autocomplete.vue'

export default {
  components: {
    Autocomplete,
  },
}
</script>

<style></style>
