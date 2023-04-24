<template>
  <div>
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
                <div>
                  <label for="homeworkName" class="col-form-label">Nombre de la tarea:</label>
                  <input type="text bg-secondary"
                    class="form-control shadow-none bg-secondary border-0 rounded-2 text-white" id="homeworkName"
                    placeholder="Nombre del grupo." v-model="homeworkName">
                  <small class="text-danger" v-if="
                    v$.homeworkName.$dirty &&
                    v$.homeworkName.required.$invalid">
                    Se requiere una descripción.
                  </small>
                </div>
                <div>
                  <label for="homeworkDescription" class="col-form-label">Descripción:</label>
                  <textarea type="text bg-secondary"
                    class="form-control shadow-none bg-secondary border-0 rounded-2 text-white" id="homeworkDescription"
                    placeholder="Descripción." v-model="homeworkDescription"></textarea>
                  <small class="text-danger" v-if="
                    v$.homeworkDescription.$dirty &&
                    v$.homeworkDescription.required.$invalid">
                    Se requiere una descripción.
                  </small>
                </div>
                <div>
                  <label for="homeworkDate" class="col-form-label">Fecha de entrega:</label>
                  <input type="date" name="homeworkDate" id="homeworkDate" class="form-control bg-secondary"
                    v-model="homeworkDate">
                  <small class="text-danger" v-if="
                    v$.homeworkDate.$dirty &&
                    v$.homeworkDate.required.$invalid">
                    Se requiere la fecha.
                  </small>
                </div>

              </div>
            </div>
            <div class="modal-footer">
              <button type="submit" class="btn btn-primary">Crear</button>
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useVuelidate } from '@vuelidate/core';
import { required, minLength, maxLength, minValue, maxValue } from '@vuelidate/validators';

export default {
  setup() {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      homeworkName: '',
      homeworkDescription: '',
      homeworkDate: ''
    }
  },
  validations() {
    return {
      homeworkName: {
        required
      },
      homeworkDescription: {
        required
      },
      homeworkDate: {
        required,
        minValue,
        maxValue
      }
    }
  },
  methods: {
    CreateHomework(event) {
      this.v$.$touch()
      if (this.v$.$error) {
        return
      }
      console.log('Good')
    },
  }
}
</script>

<style>
caja {
  padding: 4px;
}
</style>
