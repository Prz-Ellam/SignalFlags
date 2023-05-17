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
                    v-model="name"
                  />
                  <small
                    class="text-danger"
                    v-if="v$.name.$dirty && v$.name.required.$invalid"
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
                    v-model="description">
                  </textarea>
                  <small
                    class="text-danger"
                    v-if="
                      v$.description.$dirty &&
                      v$.description.required.$invalid
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
                    v-model="privacy"
                  >
                    <option value="private">Privado: Solo los administradores pueden agregar miembros</option>
                    <option value="public">Publico: Cualquiera puede unirse</option>
                  </select>
                </div>
              </div>
              <div v-else>
                <label for="" class="mb-1">Comience a escribir nombres para agregarlos a su equipo</label>
                <Autocomplete 
                  :items="users"
                  @click="onClickAutocomplete" />
                  <div class="overflow-auto" style="max-height: 200px;">
                  <div 
                    v-for="userId in userIds"
                    class="d-flex align-items-center justify-content-between alert bg-dark my-1 py-2" 
                    role="alert">
                    <div>
                      <img width="40" height="40" class="me-2 rounded-circle"
                      style="object-fit: cover;"
                      :src="users.find(u => u._id === userId).avatar" />
                      <span>{{ users.find(u => u._id === userId).username }}</span>
                    </div>
                    <div class="d-inline-flex bg-danger p-2 rounded-circle" 
                      role="button"
                      @click=""
                    >
                      <i class="fa-solid fa-trash"></i>
                    </div>
                  </div>
                </div>
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
                type="button"
                class="btn btn-primary rounded-pill text-light"
                @click="NextStep"
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
                data-bs-dismiss="modal"
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
import UserService from '@/services/user.service';
import GroupService from '@/services/group.service';
import { ToastTopEnd } from '../utils/toast';

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
      name: '',
      description: '',
      privacy: 'private',
      users: [],
      userIds: []
    }
  },
  validations() {
    return {
      name: {
        required,
      },
      description: {
        required,
      },
    }
  },
  async created() {
    const response = await UserService.find();
    if (response?.status) {
      this.users = response.message;
    }
  },
  methods: {
    onClickAutocomplete(id) {
      if (!this.userIds.includes(id)) {
        this.userIds.push(id);
      }
    },
    NextStep() {
      this.v$.$touch()
      if (this.v$.$error) {
        return
      }
      this.step++;
    },
    async CreateGroup(event) {
      this.v$.$touch()
      if (this.v$.$error) {
        ToastTopEnd.fire({
            icon: 'error',
            title: 'Formulario no válido'
        });
        return;
      }

      const group = {
        name: this.name,
        description: this.description,
        privacy: this.privacy,
        userIds: this.userIds
      }
      
      const response = await GroupService.create(group);
    },
  },
}
</script>

<style></style>
