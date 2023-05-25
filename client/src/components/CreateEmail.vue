<template>
  <div class="modal fade modal-lg pt-5" id="CreateEmail" tabindex="-1" aria-labelledby="modalGroup" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content bg-accent">
        <form @submit.prevent="sendMail" novalidate>
          <div class="modal-header">
            <h3 class="modal-title">Enviar correo electrónico</h3>
            <button type="button" class="btn-close btn-close-white shadow-none" data-bs-dismiss="modal"
              aria-label="Close">
            </button>
          </div>
          <div class="modal-body">
            <div class="mb-3">

              <div class="mb-4">
                <label for="description" class="form-label" role="button">
                  Mensaje
                </label>
                <textarea type="text bg-secondary" class="form-control shadow-none bg-secondary border-0 rounded-4"
                  id="description" placeholder="Descripción." v-model="content"></textarea>
                <small class="text-danger" v-if="v$.content.$dirty &&
                  v$.content.required.$invalid">
                  Se requiere una descripción.
                </small>
                <small class="text-danger" v-if="v$.content.$dirty && v$.content.minLength.$invalid">
                  El nombre de la tarea debe tener al menos 1 caracter
                </small>
                <small class="text-danger" v-if="v$.content.$dirty && v$.content.maxLength.$invalid">
                  El nombre de la tarea debe tener menos de 50 caracteres
                </small>
              </div>

              <label for="" class="mb-1">Comience a escribir nombres para agregarlos a su equipo</label>
              <Autocomplete :items="users" @click="onClickAutocomplete" />
              <div class="overflow-auto" style="max-height: 200px;">
                <div v-for="userId in userIds"
                  class="d-flex align-items-center justify-content-between alert bg-dark my-1 py-2" role="alert">
                  <div>
                    <img width="40" height="40" class="me-2 rounded-circle" style="object-fit: cover;"
                      :src="users.find(u => u._id === userId).avatar" />
                    <span>{{ users.find(u => u._id === userId).username }}</span>
                  </div>
                  <div class="d-inline-flex bg-danger p-2 rounded-circle" role="button" @click="deleteUser(userId)">
                    <i class="fa-solid fa-trash"></i>
                  </div>
                </div>
              </div>

            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary rounded-pill text-light" data-bs-dismiss="modal">
              Cerrar
            </button>
            <button type="submit" class="btn btn-primary rounded-pill text-light">
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Autocomplete from '@/components/Autocomplete.vue';
import { useVuelidate } from '@vuelidate/core';
import { required, minLength, maxLength } from '@vuelidate/validators';
import GroupService from '@/services/group.service';
import { ToastTopEnd } from '../utils/toast';
import { Modal } from 'bootstrap';

export default {
  setup() {
    return { v$: useVuelidate() }
  },
  components: {
    Autocomplete
  },
  data() {
    return {
      content: '',
      users: [],
      userIds: []
    }
  },
  validations() {
    return {
      content: {
        required,
        minLength: minLength(1),
        maxLength: maxLength(255)
      }
    }
  },
  async created() {
    const groupId = this.$route.params.id;
    const authUser = JSON.parse(localStorage.getItem('user'));

    const members = await GroupService.findMembers(groupId);
    this.users = members.filter(user => user._id !== authUser._id);
  },
  methods: {
    deleteUser(userId) {
      this.userIds = this.userIds.filter(user => user !== userId);
    },
    onClickAutocomplete(id) {
      if (!this.userIds.includes(id)) {
        this.userIds.push(id);
      }
    },
    async sendMail() {
      if (this.userIds.length < 1) {
        ToastTopEnd.fire({
            icon: 'error',
            title: 'Faltan destinatarios'
        });
        return;
      }

      this.v$.$touch()
      if (this.v$.$error) {
        ToastTopEnd.fire({
            icon: 'error',
            title: 'Formulario no válido'
        });
        return;
      }
      
      const groupId = this.$route.params.id;
      const content = {
        content: this.content,
        userIds: this.userIds
      }
      await GroupService.sendMail(groupId, content);

      ToastTopEnd.fire({
        icon: 'success',
        title: 'Los correos han sido enviados'
      });

      this.content = '';
      this.userIds = [];

      const modal = document.querySelector('#CreateEmail');
      const modalInstance = Modal.getInstance(modal);
      modalInstance.hide();
    }
  }
}
</script>

<style scoped></style>