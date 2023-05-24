<template>
  <section class="container-fluid h-100">
    <div class="h-100 p-3">
      <div class="box text-center bg-accent py-3 px-5 rounded-3">
        <h3>Tus grupos</h3>
        <hr>
        <div class="row">
          <GroupCard v-for="group in groups" 
            class="col-sm-6 col-md-4 col-lg-3" 
            :bind="group._id" 
            :groupId="group._id"
            :name="group.name" 
            :avatar="group.avatar" />
        </div>

        <h3>Unirse a un grupo</h3>
        <hr>
        <div class="row">
          <div class="col-sm-6 col-md-4 col-lg-3">
            <div class="mb-4 text-white d-flex flex-column justify-content-center align-items-center shadow-sm rounded-3"
              style="background-color: #38393b; height: 240px;">
              <div class="d-flex align-items-center h-66">
                <img src="../assets/images/POI_SignalFalgs.png" class="rounded group-img" alt="..." />
              </div>
              <div class="d-flex align-items-start px-3 h-33">
                <div>
                  <h6 class="text-white">Crea un grupo</h6>
                  <button type="button" class="text-light rounded-pill flex-fill bd-highlight btn btn-primary rounded-3"
                    
                    @click="a">
                    Crear
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!--div class="col-sm-6 col-md-4 col-lg-3">
            <div class="mb-4 text-white d-flex flex-column justify-content-center align-items-center shadow-sm rounded-3"
              style="background-color: #38393b; height: 240px;">
              <div class="d-flex align-items-center h-50">
                <img src="../assets/images/POI_SignalFalgs.png" class="rounded group-img" alt="..." />
              </div>
              <div class="d-flex align-items-center px-3 h-50">
                <div>
                  <h6 class="text-white">Unete a un grupo público</h6>
                  <input type="text" name="code" id="code"
                    class="py-0 form-control bg-accent border-0 mb-2 rounded-2 shadow-none text-white"
                    placeholder="código" />
                  <button type="button" class="text-light rounded-pill flex-fill bd-highlight btn btn-primary rounded-3"
                    data-bs-toggle="modal" data-bs-target="#modalCreateGroup">
                    Crear
                  </button>
                </div>
              </div>
            </div>
          </div-->

        </div>
      </div>
    </div>
    <CreateGroup />
  </section>
</template>

<script>
import { Modal } from 'bootstrap';
import Swal from 'sweetalert2';
import CreateGroup from '@/components/CreateGroup.vue';
import GroupCard from '@/components/GroupCard.vue';
import GroupService from '@/services/group.service';

export default {
  components: {
    CreateGroup,
    GroupCard
  },
  async created() {
    const user = JSON.parse(localStorage.getItem('user'));
    this.groups = await GroupService.findByUser(user._id);
    const Toast = Swal.mixin({
      toast: true,
      position: 'bottom-right',
      showConfirmButton: false,
      timer: 5000,
    });

    await Toast.fire({
      //icon: 'success',
      html: '<h1> Success </h1>'
    });

    // Actualizar en tiempo real
    window.socket.on('groupNotification', async () => {
      this.groups = await GroupService.findByUser(user._id);
    });
  },
  destroyed() {
    window.socket.off('groupNotification');
  },
  data() {
    return {
      groups: []
    }
  },
  methods: {
    a() {
      // modalCreateGroup
      console.log('A');
      const modal = document.querySelector('#CreateGroup');
      const modalInstance = new Modal(modal);
      modalInstance.show();
    }
  }
}
</script>

<style>
.group-img {
  width: 100px;
  height: 100px;
  object-fit: cover;
}

.box {
  position: static;
  overflow-y: scroll;
  overflow-x: unset;
  height: 100%;
}

.box_button {
  background-color: #38393b;
  height: 240px;
  min-width: 200px;
}

.box_button:hover {
  background-color: #6d6f7d;
}

.h-33 {
  height: 33%;
}

.h-66 {
  height: 66%;
}
</style>
