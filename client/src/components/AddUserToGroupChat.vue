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
          <form>
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
              <div class="mb-3">
                <label for="message-text" class="col-form-label">
                  Escriba un nombre para agregar miembros al chat.
                </label>
<<<<<<< HEAD
                <div class="input-group">
                  <Autocomplete 
                    :items="users"
                    @click="selectedUser"/>
=======
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
>>>>>>> bk/autocompleteVer2
                </div>

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
                  <div class="d-inline-flex bg-danger p-2 rounded-circle" role="button">
                    <i class="fa-solid fa-trash"></i>
                  </div>
                </div>

              </div>
              <div class="mb-3"></div>
<<<<<<< HEAD
            </form>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-primary border-0 m-2 rounded-3"
              type="button"
              @click="createChatGroup"
            >
              <span>Crear</span>
            </button>
          </div>
=======
            </div>
            <div class="modal-footer">
              <button
                class="btn btn-primary border-0 m-2 rounded-3"
                type="button"
              >
                <span>Crear chat grupal</span>
              </button>
            </div>
          </form>
>>>>>>> bk/autocompleteVer2
        </div>
      </div>
     </div>
  </div>
</template>

<script>
import Autocomplete from '../components/Autocomplete.vue'
import { userFindAllService, userFindOneService } from '../services/user.service';
import { chatCreateChatGroupService } from '../services/chat.service';

export default {
  components: {
    Autocomplete,
  },
  data() {
    return {
      users: [],
      selectedUsers: []
    }
  },
  async created() {
    const response2 = await userFindAllService();
    console.log(response2);
    if (response2?.status) {
      this.users = response2.message;
      console.log(response2.message);
    }
  },
  methods: {
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

<style></style>
