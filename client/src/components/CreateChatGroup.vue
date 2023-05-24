<template>
  <div class="modal fade modal-lg" tabindex="-1" aria-labelledby="modalGroup" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content bg-accent">
        <form @submit.prevent="submitChat">
          <div class="modal-header">
            <h3 class="modal-title">Crear chat grupal</h3>
            <button 
              type="button" 
              class="btn-close btn-close-white shadow-none" 
              data-bs-dismiss="modal" 
              aria-label="Close">
            </button>
          </div>
          <div class="modal-body">
            
            <ProfilePicture @update="update" />

            <div class="mb-4">
              <label for="name" role="button" class="form-label">
                Nombre del chat
              </label>
              <input 
                type="text" 
                id="name" 
                class="bg-secondary form-control rounded-4" 
                v-model="name"
              >
            </div>
            

            <label for="message-text" class="col-form-label">
              Escriba un nombre para agregar miembros al chat.
            </label>
            <Autocomplete :items="users" @click="selectedUser" />

            <div class="overflow-auto" style="height: 200px;">
              <div v-for="user in selectedUsers" :key="user._id"
                class="d-flex align-items-center justify-content-between alert bg-dark my-1 py-2" role="alert">
                <div>
                  <img width="40" height="40" class="me-2 rounded-circle" style="object-fit: cover;"
                    :src="user.avatar" />
                  <span>{{ user.username }}</span>
                </div>
                <div class="d-inline-flex bg-danger p-2 rounded-circle" role="button" 
                  @click="deleteUser(user._id)">
                  <i class="fa-solid fa-trash"></i>
                </div>
              </div>
            </div>

          </div>
          <div class="modal-footer">
            <button 
              type="button" 
              class="btn btn-secondary rounded-pill text-light" 
              data-bs-dismiss="modal">
              Cerrar
            </button>
            <button 
              class="btn btn-primary text-light rounded-pill" 
              data-bs-dismiss="modal">
              Crear
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import Autocomplete from '@/components/Autocomplete.vue';
import ProfilePicture from '@/components/ProfilePicture.vue';
import { chatCreateChatGroupService } from '@/services/chat.service';

import { useVuelidate } from '@vuelidate/core';
import { required, email } from '@vuelidate/validators';
import UserService from '../services/user.service';

export default {
  components: {
    Autocomplete,
    ProfilePicture
  },
  setup() {
		return { v$: useVuelidate() }
	},
  data() {
    return {
      avatar: '',
      name: '',
      users: [],
      selectedUsers: []
    }
  },
  async created() {
    const authUser = JSON.parse(localStorage.getItem('user'));
    const response2 = await UserService.find();
    if (response2?.status) {
      this.users = response2.message;
      this.users = this.users.filter(user => user._id !== authUser._id);
    }
  },
  methods: {
    update(image) {
      this.avatar = image;
    },
    async submitChat() {
      if (this.name.trim() === '' || this.selectedUsers.length < 1) {
        await Swal.fire({
            icon: 'error',
            title: '...Oops',
            html: '<span class="text-light">Faltan parametros</span>',
            confirmButtonColor: "#F23F43",
            background: "#38393B",
            customClass: {
                title: 'text-light',
                text: 'text-light',
                confirmButton: 'btn btn-danger text-light shadow-none rounded-pill'
            },
        });
				return;
      }

      const members = this.selectedUsers.map(({ _id }) => _id);
      await chatCreateChatGroupService({
        avatar: this.avatar,
        name: this.name,
        members: members
      });

      this.avatar = '';
      this.name = '';
      this.selectedUsers = [];
    },
    async selectedUser(userId) {
      const foundUser = this.selectedUsers.find(user => user._id === userId);
      if (!foundUser) {
        const user = await UserService.findById(userId);
        this.selectedUsers.push(user.message);
      }
    },
    deleteUser(userId) {
      this.selectedUsers = this.selectedUsers.filter(user => user._id !== userId);
    },
    async createChatGroup() {
      const members = this.selectedUsers.map(({ _id }) => _id);
      await chatCreateChatGroupService(members);
    }
  }
}
</script>

<style scoped></style>
