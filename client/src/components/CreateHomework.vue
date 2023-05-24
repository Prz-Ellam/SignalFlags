<template>
  <div class="modal fade modal-lg pt-5" id="createHomeworkModal" tabindex="-1" aria-labelledby="modalGroup" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content bg-accent">
        <form @submit.prevent="CreateHomework" novalidate>
          <div class="modal-header">
            <h3 class="modal-title">Crear tarea</h3>
            <button 
              type="button" 
              class="btn-close btn-close-white shadow-none" 
              data-bs-dismiss="modal" 
              aria-label="Close">
            </button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <div class="mb-4">
                <label for="name" role="button" class="form-label">
                  Nombre de la tarea
                </label>
                <input v-model="name"
                  type="text bg-secondary"
                  class="form-control shadow-none bg-secondary border-0 rounded-4" 
                  id="name"
                  placeholder="Nombre de la tarea">
                <small class="text-danger" v-if="v$.name.$dirty &&
                  v$.name.required.$invalid">
                  Se requiere una descripción.
                </small>
                <small class="text-danger" 
                  v-if="v$.name.$dirty && v$.name.minLength.$invalid">
                  El nombre de la tarea debe tener al menos 1 caracter
                </small>
                <small class="text-danger" 
                  v-if="v$.name.$dirty && v$.name.maxLength.$invalid">
                  El nombre de la tarea debe tener menos de 50 caracteres
                </small>
              </div>

              <div class="mb-4">
                <label for="description" class="form-label" role="button">
                  Descripción
                </label>
                <textarea type="text bg-secondary"
                  class="form-control shadow-none bg-secondary border-0 rounded-4" 
                  id="description"
                  placeholder="Descripción." v-model="description"></textarea>
                <small class="text-danger" v-if="v$.description.$dirty &&
                  v$.description.required.$invalid">
                  Se requiere una descripción.
                </small>
                <small class="text-danger" 
                  v-if="v$.description.$dirty && v$.description.minLength.$invalid">
                  El nombre de la tarea debe tener al menos 1 caracter
                </small>
                <small class="text-danger" 
                  v-if="v$.description.$dirty && v$.homewodescriptionrkName.maxLength.$invalid">
                  El nombre de la tarea debe tener menos de 50 caracteres
                </small>
              </div>

              <div class="mb-4">
                <label for="dueDate" class="form-label">
                  Fecha de entrega
                </label>
                <input type="datetime-local" name="dueDate" id="dueDate" class="form-control bg-secondary"
                  v-model="dueDate">
                <small class="text-danger" v-if="v$.dueDate.$dirty &&
                  v$.dueDate.required.$invalid">
                  Se requiere la fecha.
                </small>
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
              type="submit" 
              class="btn btn-primary rounded-pill text-light"
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
import HomeworkService from '../services/homework.service';
import { useVuelidate } from '@vuelidate/core';
import { required, minLength, maxLength, minValue, maxValue } from '@vuelidate/validators';
import { ToastTopEnd } from '../utils/toast';

export default {
  setup() {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      name: '',
      description: '',
      dueDate: ''
    }
  },
  validations() {
    return {
      name: {
        required,
        minLength: minLength(1),
        maxLength: maxLength(50)
      },
      description: {
        required,
        minLength: minLength(1),
        maxLength: maxLength(255)
      },
      dueDate: {
        required
      }
    }
  },
  methods: {
    async CreateHomework(event) {
      this.v$.$touch()
      if (this.v$.$error) {
        ToastTopEnd.fire({
            icon: 'error',
            title: 'Formulario no válido'
        });
        return;
      }

      const id = this.$route.params.id;
      const homework = {
        name: this.name,
        description: this.description,
        dueDate: this.dueDate
      }
      const response = await HomeworkService.create(id, homework);
    },
  }
}
</script>

<style scoped>
</style>
