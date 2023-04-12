<template>
  <div>
    <div
      class="modal fade modal-lg pt-5"
      id="modalCreateGroup"
      tabindex="-1"
      aria-labelledby="modalGroup"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content bg-accent">
          <form @submit.prevent="CreateGroup" novalidate>
            <div class="modal-header">
              <h5 class="modal-title" id="modalGroup">{{ title }}</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <div>
                  <label for="recipient-name" class="col-form-label">
                    Nombre del grupo:
                  </label>
                  <input
                    type="text bg-secondary"
                    class="form-control shadow-none bg-secondary border-0 rounded-2 text-white"
                    id="recipient-name"
                    placeholder="Nombre del grupo."
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
                  <input
                    type="text bg-secondary"
                    class="form-control shadow-none bg-secondary border-0 rounded-2 text-white"
                    id="recipient-description"
                    placeholder="Descripción."
                    v-model="groupDescription"
                  />
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
                    <option>Privado</option>
                    <option>Publico</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="submit"
                class="btn btn-primary"
                data-bs-target="#modalAddUsers"
              >
                Crear
              </button>
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'

export default {
  setup() {
    return { v$: useVuelidate() }
  },
  data() {
    return {
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
      console.log('Good')
    },
  },
}
</script>

<style></style>
