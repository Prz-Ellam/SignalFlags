<template>
    <div
      class="modal fade modal-lg pt-5"
      tabindex="-1"
      aria-labelledby="modalGroup"
      aria-hidden="true"
      ref="addUserToGroupChatModal"
    >
      <div class="modal-dialog">
        <div class="modal-content bg-accent">
          <form @submit.prevent="submitChat">
            <div class="modal-header">
              <h5 class="modal-title" id="modalGroup">
                Crear grupo
              </h5>
              <button
                type="button"
                class="btn-close text-light"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">

                <ProfilePicture 
                  @update="update" 
                />

                <label for="name" role="button" class="form-label">
                  Nombre del chat
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  class="bg-secondary form-control rounded-4"
                  v-model="name"
                >

                <label for="message-text" class="col-form-label">
                  Escriba un nombre para agregar miembros al chat.
                </label>
                <Autocomplete 
                  :items="users"
                  @click="selectedUser"
                />
               
                <div class="overflow-auto" style="max-height: 200px;">
                  <div 
                    v-for="user in selectedUsers"
                    class="d-flex align-items-center justify-content-between alert bg-dark my-1 py-2" 
                    role="alert">
                    <div>
                      <img width="40" height="40" class="me-2 rounded-circle"
                      style="object-fit: cover;"
                      :src="`/api/v1/images/${ user.avatar }`" />
                      <span>{{ user.username }}</span>
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
              <div class="mb-3"></div>
            </div>
            <div class="modal-footer">
              <button
                class="btn btn-primary text-light border-0 m-2 rounded-3"
                type="submit"
                data-bs-dismiss="modal"
              >
                Crear chat grupal
              </button>
            </div>
          </form>
        </div>
      </div>
     </div>
</template>

<script>
import Autocomplete from '../components/Autocomplete.vue';
import ProfilePicture from '../components/ProfilePicture.vue';
import { userFindAllService, userFindOneService } from '../services/user.service';
import { chatCreateChatGroupService } from '../services/chat.service';

export default {
  components: {
    Autocomplete,
    ProfilePicture
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
    const response2 = await userFindAllService();
    if (response2?.status) {
      this.users = response2.message;
    }
  },
  methods: {
    update(image) {
      this.avatar = image;
    },
    async submitChat() {
      const members = this.selectedUsers.map(({ _id }) => _id);
      console.log(members);
      await chatCreateChatGroupService({
        avatar: this.avatar,
        name: this.name,
        members: members
      });
      
      //this.$refs.addUserToGroupChatModal.hide();
    },
    async selectedUser(userId) {
      const foundUser = this.selectedUsers.find(user => user._id === userId);
      if (!foundUser) {
        const user = await userFindOneService(userId);
        this.selectedUsers.push(user.message);
      }
    },
    async createChatGroup() {
      const members = this.selectedUsers.map(({ _id }) => _id);
      console.log(members);
      await chatCreateChatGroupService(members);
    }
  }
}
</script>

<style scoped></style>
