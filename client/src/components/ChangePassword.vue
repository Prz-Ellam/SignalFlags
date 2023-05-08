<template>
    <div class="modal fade modal-lg pt-5" tabindex="-1" aria-labelledby="ChangePassword" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content bg-accent">
          <form @submit.prevent="ChangePsw" novalidate>
            <div class="modal-header">
              <h3 class="modal-title">Cambiar contraseña. </h3>            
            </div>
            <div class="modal-body">
              <div  class="mb-3">
                <div>
                  <label for="recipient-name" class="col-form-label">
                    contraseña anterior:
                  </label>
                  <input
                    type="password"
                    class="form-control shadow-none bg-secondary border-0 rounded-4 text-white"
                    id="recipient-name" 
                    placeholder="Confirma tu actual contraseña."
                    v-model="oldPassword"
                  />
                  <small
                    class="text-danger"
                    v-if="v$.oldPassword.$dirty && v$.oldPassword.required.$invalid"
                  >
                    Se requiere la contraseña.
                  </small>


                  <label for="recipient-name" class="col-form-label">
                    Nueva contraseña:
                  </label>
                  <input
                    type="password"
                    class="form-control shadow-none bg-secondary border-0 rounded-4 text-white"
                    id="recipient-name"
                    placeholder="Nueva contraseña"
                    v-model="newPassword"
                  />
                  <small class="text-danger" v-if="v$.newPassword.$dirty &&
                    (v$.newPassword.containsUpper.$invalid || v$.newPassword.containsLower.$invalid ||
                      v$.newPassword.containsNumber.$invalid || v$.newPassword.containsSpecialChars.$invalid ||
                      v$.newPassword.minLength.$invalid) && newPassword !== ''">La contraseña no cumple con los parametros
                    solicitados</small>

                  <ul class="mt-2">
                    <li :class="(newPassword !== '') ? (v$.newPassword.containsUpper.$invalid) ? 'text-danger' : 'text-success' : ''">
                      Contiene mayúsculas</li>
                    <li :class="(newPassword !== '') ? (v$.newPassword.containsLower.$invalid) ? 'text-danger' : 'text-success' : ''">
                      Contiene minúsculas</li>
                    <li :class="(newPassword !== '') ? (v$.newPassword.containsNumber.$invalid) ? 'text-danger' : 'text-success' : ''">
                      Contiene números</li>
                    <li
                      :class="(newPassword !== '') ? (v$.newPassword.containsSpecialChars.$invalid) ? 'text-danger' : 'text-success' : ''">
                      Contiene carácteres especiales</li>
                    <li :class="(newPassword !== '') ? (v$.newPassword.minLength.$invalid) ? 'text-danger' : 'text-success' : ''">
                      Contiene más de 8 caracteres</li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary rounded-pill text-light"
                data-bs-dismiss="modal"
              >
                Cancelar
              </button>
              <button
                type="button"
                class="btn btn-primary rounded-pill text-light"                
              >
                Confirmar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { required, sameAs, minLength } from '@vuelidate/validators'

const containsUpper = (value) => /[A-Z]/.test(value);
const containsLower = (value) => /[a-z]/.test(value);
const containsNumber = (value) => /[0-9]/.test(value);
const containsSpecialChars = (value) => /[°|¬!"#$%&/()=?¡'¿¨*\]´+}~`{[^;:_,.\-<>@]/.test(value);

export default {
  setup() {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      oldPassword: '',
      newPassword: '',
    }
  },
  validations() {
    return {
      oldPassword: {
        required,
      },
      newPassword: {
        required,
        containsUpper,
        containsLower,
        containsNumber,
        containsSpecialChars,
        minLength: minLength(8)
      },
    }
  },
  methods: {
    async ChangePsw(event) {
      
    },
  },
}
</script>

<style></style>
