<template>
  <div class="modal fade modal-lg pt-5" id="createHomeworkModal" tabindex="-1" aria-labelledby="modalGroup"
    aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content  bg-accent">
        <form @submit.prevent="CreateHomework" novalidate>
          <div class="modal-header">
            <h5 class="modal-title" id="modalGroup">Crear tarea</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">

              <div class="">
                <label for="name" role="button" class="col-form-label">
                  Nombre de la tarea
                </label>
                <input v-model="name"
                  type="text bg-secondary"
                  class="form-control shadow-none bg-secondary border-0 rounded-2 text-white" id="name"
                  placeholder="Nombre del grupo.">
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

              <div>
                <label for="description" class="col-form-label">Descripción:</label>
                <textarea type="text bg-secondary"
                  class="form-control shadow-none bg-secondary border-0 rounded-2 text-white" id="description"
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
              <div>
                <label for="dueDate" class="col-form-label">Fecha de entrega:</label>
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
            <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Crear</button>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
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
        return;
      }
      const id = this.$route.params.id;

      const homework = {
        name: this.name,
        description: this.description,
        dueDate: this.dueDate
      }
      const res = await HomeworkService.create(id, homework);
    },
  }
}
</script>

<style scoped>
</style>
