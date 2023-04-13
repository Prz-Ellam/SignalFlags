<template>
  <div class="dropup-center dropup">
    <button class="btn border-0" data-bs-toggle="dropdown" aria-expanded="false" style="transform: rotateY(0deg) rotate(45deg);" >
      <i class="h4 mb-0 me-1 bi bi-paperclip"></i>
    </button>
    <ul
      class="dropdown-menu text-center border-0"
      style="background-color: transparent;"
    >
      <li class="m-2">
        <div class="form-group text-center">
          <div class="position-relative">
            <label
              for="chatFiles"
              role="button"
              class="btns-label text-white position-absolute rounded-circle"
            ></label>
            <button
              class="img btn rounded-circle disabled border-0"
              style="background-color: #ffb800;"
            >
              <i class="h2 bi bi-file-earmark align-items-center"></i>
            </button>
          </div>
          <input
            type="file" multiprelativele="multiple"
            class="form-control position-absolute"
            name="chatFiles"
            id="chatFiles"
            autocomplete="off"
            @change="uploadFile"
          />
        </div>
      </li>
      <li class="m-2">
        <div class="form-group text-center">
          <div class="position-relative">
            <label
              for="geolocation"
              role="button"
              class="btns-label text-white position-absolute rounded-circle"
            ></label>
            <button
              @click="getGeolocation"
              class="img btn rounded-circle border-0"
              style="background-color: #1997ff;"
            >
              <i class="h2 bi bi-geo-alt-fill align-items-center"></i>
            </button>
          </div>
        </div>
      </li>
      <li class="m-2">
        <div class="form-group text-center">
          <div class="position-relative">
            <label
              for="chatImages"
              role="button"
              class="btns-label text-white position-absolute rounded-circle"
            ></label>
            <button
              class="img btn rounded-circle disabled border-0"
              style="background-color: #ff2655;"
            >
              <i class="h2 bi bi-card-image align-items-center"></i>
            </button>
          </div>
          <input
            type="file" multiple="multiple"
            accept="image/png, image/gif, image/jpeg, image/jpg"
            class="form-control position-absolute"
            name="chatImages"
            id="chatImages"
            autocomplete="off"
            @change="uploadImage"
          />
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: JSON.parse(localStorage.getItem('user'))
    }
  },
  methods: {
    async uploadImage(event) {
        const files = Array.from(event.target.files);
        const file = files[0];

        const allowedExtensions = /(jpg|jpeg|png|gif)$/i;
        if (!allowedExtensions.exec(file.type)) {
            console.log("no se permite este tipo de archivo");
            return;
        }      
    },
    async uploadFile(event) {
    },
    getGeolocation(event) {

    }
  }
}
</script>

<style>
.img {
  width: 60px;
  height: 60px;
  object-fit: cover;
}

.btns-label {
  width: 60px;
  height: 60px;
  line-height: 60px;
}

#chatImages,
#geolocation,
#chatFiles,
#upload-image {
  scale: 0.01;
}
</style>
