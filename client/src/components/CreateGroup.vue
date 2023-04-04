<template>
<div>
  <div class="modal fade modal-lg pt-5" id="modal-g" tabindex="-1" aria-labelledby="modalGroup" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content  bg-accent">
        <div class="modal-header">
          <h5 class="modal-title" id="modalGroup"> {{titles}} </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <label for="recipient-name" class="col-form-label">Nombre del grupo:</label>
              <input type="text bg-secondary" class="form-control shadow-none bg-secondary border-0 rounded-2 text-white" id="recipient-name" placeholder="Nombre del grupo.">
              <label for="recipient-description" class="col-form-label">Descripción:</label>
              <input type="text bg-secondary" class="form-control shadow-none bg-secondary border-0 rounded-2 text-white" id="recipient-description" placeholder="Descripción.">
              <label for="recipient-privacity" class="col-form-label">Privacidad:</label>
              <div class="dropdown">
                <button class = "form-control btn btn-default dropdown-toggle text-start bg-secondary" type = "button" data-bs-toggle =  "dropdown" aria-expanded="false"> Privacidad
                <span class ="any"></span></button>
                <ul class ="dropdown-menu form-control bg-secondary">
                <li> <a class="dropdown-item text-white" href="#"> Privado </a> </li>
                <li> <a class="dropdown-item text-white" href="#"> Publico </a> </li>
                </ul>
              </div>
            </div>

          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                  data-bs-target="#modal-add">Crear</button>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" >Close</button>

        </div>
      </div>
    </div>
  </div>
  <AddUser/>
</div>
  
</template>

<script> 
import AddUser from '../components/AddUser.vue'
export default {
  props:{
    titles: String
  },
  components: {
    AddUser
  }
}


</script>

<style>

</style>
