<template>
  <section class="bg-dark container-fluid h-100 overflow-auto">
    <div class="col h-100 align-items-center p-3">
      <div class="h-100 bg-accent py-3 px-5 rounded-3">
        <div>
          <h3>{{ homework.name }}</h3>
          <p> Fecha de vencimiento: {{ new Date(homework.dueDate).toLocaleString() }}</p>

          <small>Instrucciones</small>
          <p>{{ homework.description }}</p>
          
          <input type="file" class="form-control mb-3">

          <a v-for="attachment in homework.delivers?.attachments" 
            class="d-flex alert bg bg-dark text-light" role="button" 
            :href="attachment.url" target="_blank" download>
            <span><i class="h5 bi-file-earmark-text me-2"></i> {{ attachment.name }}</span>
          </a>

          <button
            class="btn border-0 bg-primary"
          >
            Entregar
            <i class="text-white ms-1 bi bi-flag"></i>
          </button>   
        </div>
      </div>
    </div>
    <CreateGroup/>
  </section>
  
</template>

<script> 
import HomeworkService from '../services/homework.service';

export default {
  data() {
    return {
      homework: []
    }
  },
  async created() {
    const homeworkId = this.$route.params.id;
    this.homework = await HomeworkService.findById(homeworkId);
    console.log(this.homework);
  }
}
</script>

<style>

</style>
