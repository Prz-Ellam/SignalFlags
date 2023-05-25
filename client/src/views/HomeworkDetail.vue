<template>
  <section class="container-fluid h-100">
    <div class="h-100 p-3">
      <div class="box row bg-accent p-4 rounded-3">
        <div class="col-6">
          <h2>{{ homework.name }}</h2>
          <small>Fecha de vencimiento</small>
          <p>
            <i class="bi-calendar me-1"></i>
            <span>{{ formatDate(homework.dueDate) }}</span>
          </p>

          <small>Instrucciones</small>
          <p>
            <i class="bi-list me-1"></i>
            <span>{{ homework.description }}</span>
          </p>
          
          <small class="d-block mb-1">Mi trabajo</small>
          <label for="file" class="btn btn-dark mb-3" v-if="!homework.delivers?.attachments">
            <i class="h5 bi bi-paperclip me-2"></i>
            <span>Adjuntar</span>
          </label>
          <input type="file" id="file" class="form-control mb-3 d-none"
            @change="uploadFile">

          <a v-for="attachment in homework.delivers?.attachments" 
            class="d-flex justify-content-between align-items-center alert bg-dark text-light" role="button" 
            :href="attachment.url" target="_blank">
            <span><i class="h5 bi-file-earmark-text me-2"></i> {{ attachment.name }}</span>
            <div class="dropdown">
              <button class="btn border-0" data-bs-toggle="dropdown" @click.prevent>
                <i class="bi bi-three-dots"></i>
              </button>
              <ul class="dropdown-menu dropdown-menu-dark bg-dark">
                <li>
                  <a class="dropdown-item" :href="attachment.url" target="_blank">
                    <i class="text-light bi bi-file-earmark-text"></i> Abrir
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" :href="attachment.url" target="_blank" download>
                    <i class="text-light bi bi-download"></i> Descargar
                  </a>
                </li>
                <!--li>
                  <a class="dropdown-item" href="#">
                    <i class="text-light bi bi-trash"></i> Eliminar
                  </a>
                </li-->
              </ul>
            </div>
          </a>

          <a v-for="file in files"
            class="d-flex justify-content-between align-items-center alert bg-dark text-light" role="button" 
            >
            <span><i class="h5 bi-file-earmark-text me-2"></i> {{ file.name }}</span>
          </a>
        </div>
        <div class="col-6 d-block text-end">
          <button v-if="!homework.delivers" @click="onDeliverSubmit" class="btn btn-primary text-light">
            <span>Entregar</span>
            <i class="text-white ms-1 bi bi-flag"></i>
          </button>
          <button v-else class="btn btn-primary text-light" disabled>
            <span>Entregada</span>
            <i class="text-white ms-1 bi bi-flag"></i>
          </button>
        </div>
      </div>
    </div>
    <CreateGroup/>
  </section>
  
</template>

<script> 
import HomeworkService from '@/services/homework.service';
import { showErrorMessage } from '../utils/show-error-message';
import { ToastTopEnd } from '../utils/toast';
import { formatDate } from '../utils/format-date';
import { showErrorToast } from '../utils/show-error-toast';

export default {
  data() {
    return {
      homework: [],
      files: []
    }
  },
  async created() {
    const homeworkId = this.$route.params.id;
    this.homework = await HomeworkService.findById(homeworkId);
    console.log(this.homework);
    
    // for (const attachment of this.homework?.delivers?.attachments) {
    //   fetch(attachment.url)
    //     .then(response => response.blob())
    //     .then(blob => {
    //       const file = new File([blob], attachment.name, { type: blob.type });
    //       this.files.push(file);
    //     });
    // }
  },
  methods: {
    formatDate,
    uploadFile(event) {
      const files = Array.from(event.target.files);
      this.files = this.files.concat(files);

      
    },
    async onDeliverSubmit() {
      if (this.files.length < 1) {
        showErrorToast('No se ha cargado ningún archivo');
        return;
      }

      const form = new FormData();
      for (const file of this.files) {
        form.append('files', file);
      }
      const response = await HomeworkService.deliver(this.homework._id, form);
      if (!response?.status) {
        showErrorToast(response.message);
        return;
      }

      ToastTopEnd.fire({
        icon: 'success',
        title: 'La tarea se subió exitosamente'
      });

      this.files = [];
      const homeworkId = this.$route.params.id;
      this.homework = await HomeworkService.findById(homeworkId);
    }
  }
}
</script>

<style scoped>
.box {
  position: static;
  overflow-y: scroll;
  overflow-x: unset;
  height: 100%;
}

</style>
