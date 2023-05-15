<template>
  <div class="d-flex mt-3 px-3">
    <div class="d-flex align-items-start pt-3 mt-3">
      <img :src="post.user.avatar" width="50" height="50" 
        class="rounded-circle profile-picture" alt=""
      />
    </div>
    <div class="text-start bg-dark mx-3 my-4 w-100 rounded-3">
      <div class="p-3">
        <span class="ms-1 me-2 mb-0">{{ post.user.username }}</span>
        <small class="me-3">{{ new Date(post.createdAt).toLocaleString() }}</small>
        <p class="ms-1 me-3 mt-1 mb-0">{{ post.content }}</p>
        <div v-for="attachment in post.attachments">
          <img v-if="/^(image\/(jpg|jpeg|png|gif))$/.exec(attachment.type)" :src="attachment.url" class="img-fluid"
            role="button" />
          <a class="d-flex alert bg bg-accent text-light" role="button" v-else 
            :href="attachment.url" target="_blank" download>
            <span><i class="h5 bi-file-earmark-text me-2"></i> {{ attachment.url }}</span>
          </a>
        </div>
      </div>
      <!--div class="bg-secondary px-3 rounded-bottom">
        <input type="text" class="form-control bg-secondary border-0 shadow-none" 
          placeholder="Escribe algo...">
        <hr class=" text-primary py-0 my-0" style="border-width: 3px !important">
        <button class="btn text-start w-100">
          <i class="h6 bi bi-arrow-90deg-up"></i>
          <span class="ms-3 mb-0">Responder</span>
        </button>
      </div-->
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'post'
  ]
}
</script>

<style scoped>
.profile-picture {
  width: 50px; 
  height: 50px; 
  object-fit: cover;
}

input {
  outline: none !important; 
  border: none !important
}
</style>