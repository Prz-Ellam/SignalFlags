<template>
    <div class="modal fade modal-lg pt-5" tabindex="-1" aria-labelledby="ModalGroup" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content bg-accent">
          <form @submit.prevent="CreateGroup" novalidate>
            <div class="modal-header">
              <h3 class="modal-title">Crear un grupo</h3>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div v-if="step === 0" class="mb-3">
                <div>
                  <label for="recipient-name" class="col-form-label">
                    Nombre del grupo:
                  </label>
                  <input
                    type="text bg-secondary"
                    class="form-control shadow-none bg-secondary border-0 rounded-4 text-white"
                    id="recipient-name"
                    placeholder="Asigne un nombre a su grupo"
                    v-model="groupName"
                  />
                  <small
                    class="text-danger"
                    v-if="v$.groupName.$dirty && v$.groupName.required.$invalid"
                  >
                    Se requiere un nombre.
                  </small>
                </div>
                <div>
                  <label for="recipient-description" class="col-form-label">
                    Descripción:
                  </label>
                  <textarea
                    type="text bg-secondary"
                    class="form-control shadow-none bg-secondary border-0 rounded-4 text-white"
                    id="recipient-description"
                    placeholder="De que tratará este grupo"
                    v-model="groupDescription">
                  </textarea>
                  <small
                    class="text-danger"
                    v-if="
                      v$.groupDescription.$dirty &&
                      v$.groupDescription.required.$invalid
                    "
                  >
                    Se requiere una descripción.
                  </small>
                </div>

                <label for="recipient-privacity" class="col-form-label">
                  Privacidad:
                </label>
                <div class="rounded-3">
                  <select
                    class="text-white bg-secondary form-control btn btn-default text-start"
                  >
                    <option>Privado: Solo los administradores pueden agregar miembros</option>
                    <option>Publico: Cualquiera puede unirse</option>
                  </select>
                </div>
              </div>
              <div v-else>
                <label for="" class="mb-1">Comience a escribir nombres para agregarlos a su equipo</label>
                <Autocomplete />
              </div>
            </div>
            <div v-if="step === 0" class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary rounded-pill text-light"
                data-bs-dismiss="modal"
              >
                Cancelar
              </button>
              <button
                type="submit"
                class="btn btn-primary rounded-pill text-light"
                data-bs-target="#modalAddUsers"
              >
                Continuar
              </button>
            </div>
            <div v-else class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary rounded-pill text-light"
                @click="step--"
              >
                Anterior
              </button>
              <button
                type="submit"
                class="btn btn-primary rounded-pill text-light"
                data-bs-target="#modalAddUsers"
              >
                Finalizar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  
</template>

<script>
import Autocomplete from '@/components/Autocomplete.vue';
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'

export default {
  setup() {
    return { v$: useVuelidate() }
  },
  components: {
    Autocomplete
  },
  data() {
    return {
      step: 0,
      title: '',
      groupDescription: null,
      groupName: null,
    }
  },
  validations() {
    return {
      groupDescription: {
        required,
      },
      groupName: {
        required,
      },
    }
  },
  methods: {
    CreateGroup(event) {
      this.v$.$touch()
      if (this.v$.$error) {
        return
      }
      this.step++;
    },
  },
}
</script>

<style></style>
