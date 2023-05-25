<template>
  <div id="CreateGroup" class="modal fade modal-lg pt-5" tabindex="-1" aria-labelledby="ModalGroup" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content bg-accent">
        <form @submit.prevent="CreateGroup" novalidate>
          <div class="modal-header">
            <h3 class="modal-title">Crear un grupo</h3>
            <button
              type="button"
              class="btn-close btn-close-white shadow-none"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
            </button>
          </div>
          <div class="modal-body">
            <div v-if="step === 0" class="mb-3">

              <div class="text-center mb-4">

                <img 
                  :src="imageSrc" 
                  alt=""
                  class="img-fluid mb-3 rounded-2"
                  width="200"
                  heigth="200"
                  style="width: 200px; height: 200px; object-fit: cover"
                  ref="image"
                >
                <br>
                <label 
                  for="group-image"
                  class="btn btn-primary text-center text-light rounded-4"
                >
                  Cargar imagen
                </label>
                <br>
                <input 
                  type="file" 
                  id="group-image" 
                  class="position-absolute" 
                  style="opacity: 0"
                  @change="handleChangeImage"
                >
              </div>

              <div class="mb-4">
                <label for="group-name" role="button" class="form-label">
                  Nombre del grupo:
                </label>
                <input
                  type="text bg-secondary"
                  class="form-control shadow-none bg-secondary border-0 rounded-4 text-white"
                  id="group-name"
                  placeholder="Asigne un nombre a su grupo"
                  v-model="name"
                />
                <small class="text-danger"
                  v-if="v$.name.$dirty && v$.name.required.$invalid">
                  Se requiere un nombre.
                </small>
                <small class="text-danger" 
                  v-if="v$.name.$dirty && v$.name.maxLength.$invalid">
                  El nombre debe tener menos de 50 caracteres
                </small>
              </div>

              <div class="mb-4">
                <label for="group-description" role="button" class="form-label">
                  Descripción:
                </label>
                <textarea
                  type="text bg-secondary"
                  class="form-control shadow-none bg-secondary border-0 rounded-4"
                  cols="30" rows="3"
                  id="group-description"
                  placeholder="¿De qué tratará este grupo?"
                  v-model="description">
                </textarea>
                <small class="text-danger"
                  v-if="v$.description.$dirty && v$.description.required.$invalid">
                  Se requiere una descripción.
                </small>
                <small class="text-danger" 
                  v-if="v$.description.$dirty && v$.description.maxLength.$invalid">
                  La descripción debe tener menos de 255 caracteres
                </small>
              </div>
     
            </div>
            <div v-else>
              <label for="" class="mb-1">Comience a escribir nombres para agregarlos a su equipo</label>
              <small class="text-danger"
                v-if="v$.userIds.$dirty && v$.userIds.minLength.$invalid">
                Debes agregar al menos un usuario.
              </small>
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
                      @click="deleteUser(userId)"
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
import { required, maxLength, minLength } from '@vuelidate/validators'
import UserService from '@/services/user.service';
import GroupService from '@/services/group.service';
import { ToastTopEnd } from '../utils/toast';
import { showErrorMessage } from '../utils/show-error-message';

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
      imageSrc: 'src/assets/images/default-placeholder.png',
      image: null,
      privacy: 'private',
      users: [],
      userIds: []
    }
  },
  validations() {
    return {
      name: {
        required,
        maxLength: maxLength(50)
      },
      description: {
        required,
        maxLength: maxLength(255),
      },
      userIds: {
        minLength: minLength(1)
      }
    }
  },
  async created() {
    const response = await UserService.find();
    if (response?.status) {
      this.users = response.message;
    }
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
    NextStep() {
      this.v$.$touch()
      if (this.v$.$error) {
        ToastTopEnd.fire({
            icon: 'error',
            title: 'Formulario no válido'
        });
        return
      }
      this.step++;
    },
    async CreateGroup(event) {
      if (this.userIds.length < 1) {
        ToastTopEnd.fire({
            icon: 'error',
            title: 'Debe haber al menos 1 usuario'
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

      const group = {
        name: this.name,
        description: this.description,
        privacy: this.privacy,
        userIds: this.userIds
      }
      
      const response = await GroupService.create(group);
      const groupR = response;
      // if (!response?.status) {
      //   showErrorMessage(response.message);
      //   return;
      // }

      if (this.image) {
        const formData = new FormData();
        formData.append('avatar', this.image);
        await GroupService.addAvatar(groupR._id, formData);
      }
    },
    async handleChangeImage(event) {
      const { files } = event.target;
      if (!files && !files[0]) {
        console.error('Falta parametro');
        return;
      }
      const file = files[0];

      const allowedExtensiones = [ 'image/jpeg', 'image/jpg', 'image/png' ];
      if (!allowedExtensiones.includes(file.type)) {
        console.error('Extensión no válida');
        return;
      }

      const maxFilesize = 8 * 1024 * 1024;
      if (file.size > maxFilesize) {
        console.error('Demasiado pesado');
        return;
      }

      const imageDataUrl = await this.readFileAsync(file);
      const image = this.$refs.image;
      image.setAttribute('src', imageDataUrl);

      this.image = file;
      this.imageSrc = imageDataUrl;
    },
    readFileAsync(file) {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = () => {
          resolve(fileReader.result);
        };
        fileReader.onerror = reject;
        fileReader.readAsDataURL(file);
      });
    }
  },
}
</script>

<style scoped></style>
