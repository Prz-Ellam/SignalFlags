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
              <i class="h2 bi bi-file-earmark align-items-center" style="color: #ECECEC;"></i>
            </button>
          </div>
          <input
            type="file" multiple="multiple"
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
              <i class="h2 bi bi-geo-alt-fill align-items-center" style="color: #ECECEC;"></i>
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
              <i class="h2 bi bi-card-image align-items-center" style="color: #ECECEC;"></i>
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
    <a href="https://www.google.com/maps/@${coords.latitude},${coords.longitude},20z" target="_blank" rel="noopener"></a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      
    }
  },
  methods: {
    async uploadImage(event) {
        const files = Array.from(event.target.files);

        const allowedExtensions = /(jpg|jpeg|png|gif)$/i;
        for (var i = 0; i< files.length; i++){
          const file = files[i];
          if (!allowedExtensions.exec(file.type)) {
            console.log("Se encontraron archivos no válidos.");
            return;
          }
          else{
            var imgCodified = URL.createObjectURL(file)
      
            document.getElementById('imagesContainer').insertAdjacentHTML('beforeend', '<img style="width: 100px; height: 100px;  object-fit: cover;"  class=" imgBox m-2 rounded-3" src="'+imgCodified+'"  @click="deleteImg" />');
          }  
        }
         
    },
    async deleteImg(event) {
      var padre = event.parentNode;
      // Eliminamos el hijo (el) del elemento padre
      padre.removeChild(event); 
    },
    async uploadFile(event) {
      const files = Array.from(event.target.files);
      
      for (var i = 0; i< files.length; i++){
          const file = files[i];
          const fileName = files[i].name;    
      
          document.getElementById('filesContainer').insertAdjacentHTML('beforeend', '<div class="m-1 p-2 file-box "> <i class="bi bi-file-earmark-text"></i>  <span> '+ fileName +' </span> </div>');
          
        }
         
    },
    getGeolocation(id) {
      const d = document, n = navigator;
      const $id = d.getElementById(id), options = {
        enableHighAccuracy:true,
        timeout: 5000, //5 segundos
        maximumAge:0 //cada que toma una lectura no tome la referencia de la anterior
      };
      
      const success = position => {
        let coords = position.coords
        console.log(position);
        document.getElementById('message').value = `https://www.google.com/maps/@${coords.latitude},${coords.longitude},17z` 
        //<a href="https://www.google.com/maps/@${coords.latitude},${coords.longitude},20z" target="_blank" rel="noopener"></a>

      }
      const error = (error) => {
        console.log(`Error ${error.code}: ${error.message}`)
      }
      n.geolocation.getCurrentPosition(success, error, options)
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

.imgBox:hover {
  background-color: #6d6f7d;
}

.file-box {
  background-color: #38393b;
}

.file-box:hover {
  background-color: #6d6f7d;
}

</style>
