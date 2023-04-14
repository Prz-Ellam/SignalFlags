<template>
  <section class="container-fluid h-100">
    <div class="h-100 p-3">
      <div class="text-center box bg-accent py-3 px-5 rounded-3">
        <h3>Tus grupos</h3>
        <hr>
        <div class="row">
          <GroupCard 
            v-for="group in groups"
            class="col-sm-6 col-md-4 col-lg-3"
            :bind="group._id"
            :name="group.name"
            :avatar="group.avatar"
          />
        </div>
       
        <h3>Unirse a un grupo</h3>
        <hr>
        <div class="row">
          
          <div class="col-sm-6 col-md-4 col-lg-3">
            <div class="mb-4 text-white d-flex flex-column justify-content-center align-items-center shadow-sm rounded-3"
              style="background-color: #38393b; height: 240px;"
            >
              <div class="d-flex align-items-center" style="height: 66%">
                <img
                src="../assets/images/POI_SignalFalgs.png"
                class="rounded group-img"
                alt="..."
                />
              </div>
              <div class="d-flex align-items-start px-3" style="height: 33%">
                <div>
                  <h6 class="text-white">Crea un grupo.</h6>
                    <button
                      type="button"
                      class="text-light rounded-pill flex-fill bd-highlight btn btn-primary rounded-3"
                      data-bs-toggle="modal"
                      data-bs-target="#modalCreateGroup"
                      >
                      Crear
                    </button>
                </div>
              </div>
            </div>
          </div>

          <div class="col-sm-6 col-md-4 col-lg-3">
            <div class="mb-4 text-white d-flex flex-column justify-content-center align-items-center shadow-sm rounded-3"
              style="background-color: #38393b; height: 240px;"
            >
              <div class="d-flex align-items-center" style="height: 50%">
                <img
                src="../assets/images/POI_SignalFalgs.png"
                class="rounded group-img"
                alt="..."
                />
              </div>
              <div class="d-flex align-items-center px-3" style="height: 50%">
                <div>
                  <h6 class="text-white">Unete a un grupo público</h6>
                  <input
                    type="text"
                    name="code"
                    id="code"
                    class="py-0 form-control bg-accent border-0 mb-2 rounded-2 shadow-none text-white"
                    placeholder="código"
                  />
                    <button
                      type="button"
                      class="text-light rounded-pill flex-fill bd-highlight btn btn-primary rounded-3"
                      data-bs-toggle="modal"
                      data-bs-target="#modalCreateGroup"
                      >
                      Crear
                    </button>
                </div>
              </div>
            </div>
          </div>

          </div>
        </div>
      </div>
    <CreateGroup id="modalCreateGroup" />
  </section>
</template>

<script>
import CreateGroup from '../components/CreateGroup.vue';
import GroupCard from '@/components/GroupCard.vue';

export default {
  components: {
    CreateGroup,
    GroupCard
  },
  data() {
    return {
      groups: [ 
        {
          _id: 1,
          name: '003 E2023 Programación orientada a la internet CLASE ORDINARIA',
          avatar: 'https://www.intel.es/content/dam/www/central-libraries/us/en/images/language-icon-lvl-2-abstract-bg.png.rendition.intel.web.864.486.png'
        },
        {
          _id: 2,
          name: '003 E2023 Programación orientada a la internet CLASE ORDINARIA',
          avatar: 'https://www.intel.es/content/dam/www/central-libraries/us/en/images/language-icon-lvl-2-abstract-bg.png.rendition.intel.web.864.486.png'
        },
        { 
          _id: 3,
          name: '003 E2023 Programación orientada a la internet CLASE ORDINARIA',
          avatar: 'https://www.intel.es/content/dam/www/central-libraries/us/en/images/language-icon-lvl-2-abstract-bg.png.rendition.intel.web.864.486.png'
        },
        { 
          _id: 4,
          name: '003 E2023 Programación orientada a la internet CLASE ORDINARIA',
          avatar: 'https://www.intel.es/content/dam/www/central-libraries/us/en/images/language-icon-lvl-2-abstract-bg.png.rendition.intel.web.864.486.png'
        },
        { 
          _id: 5,
          name: '003 E2023 Programación orientada a la internet CLASE ORDINARIA',
          avatar: 'https://www.intel.es/content/dam/www/central-libraries/us/en/images/language-icon-lvl-2-abstract-bg.png.rendition.intel.web.864.486.png'
        },
        { 
          _id: 6,
          name: '003 E2023 Programación orientada a la internet CLASE ORDINARIA',
          avatar: 'https://www.intel.es/content/dam/www/central-libraries/us/en/images/language-icon-lvl-2-abstract-bg.png.rendition.intel.web.864.486.png'
        },
        { 
          _id: 7,
          name: '003 E2023 Programación orientada a la internet CLASE ORDINARIA',
          avatar: 'https://www.intel.es/content/dam/www/central-libraries/us/en/images/language-icon-lvl-2-abstract-bg.png.rendition.intel.web.864.486.png'
        }
      ]
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

.box_button {
  background-color: #38393b;
  height: 240px; 
  min-width: 200px;
}

.box_button:hover {
  background-color: #6d6f7d;
}
</style>
