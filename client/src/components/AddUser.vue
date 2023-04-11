<template>
  <div>
    <div
      class="modal fade modal-lg pt-5"
      id="modalAddUsers"
      tabindex="-1"
      aria-labelledby="modalGroup"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content bg-accent">
          <div class="modal-header">
            <h5 class="modal-title" id="modalGroup">
              Agregar usuarios a el equipo: nombre del equipo
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
                  Escriba un nombre para agregar miembros a su equipo.
                </label>
                <div>
                  <Autocomplete />
                </div>
                <div id="AddedusersContainer">
                  <div class="d-flex mt-2">
                    <div class="text-start w-100 rounded-3 bg-dark">
                      <div class="p-3">
                        <img
                          class="rounded-circle chat user-image"
                          src="https://i.kym-cdn.com/photos/images/facebook/001/884/907/c86.jpg"
                          alt="Perfil"
                        />
                        <span class="h5 ms-2 me-2">
                          Nombre de usuario agregado
                        </span>
                      </div>
                    </div>
                  </div>
                  <div class="d-flex mt-2">
                    <div class="text-start w-100 rounded-3 bg-dark">
                      <div class="p-3">
                        <img
                          class="rounded-circle chat user-image"
                          src="https://i.kym-cdn.com/photos/images/facebook/001/884/907/c86.jpg"
                          alt="Perfil"
                        />
                        <span class="h5 ms-2 me-2">
                          Nombre de usuario agregado
                        </span>
                      </div>
                    </div>
                  </div>
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
              <span>Agregar Todos.</span>
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

<style>
.user-image {
  width: 38px;
  height: 38px;
  object-fit: cover;
}
</style>
