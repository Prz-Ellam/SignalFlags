<template>
<div class="bg-dark container-fluid h-100">
    <section class="col p-3" style="height: 90%">
      <div class="h-100 bg-accent rounded-3 ">
          <img
            src="https://img.freepik.com/free-photo/woman-with-headset-video-call_23-2148854900.jpg"
            class="rounded userCamera"
            alt="..."
          />   
          
          <div class="position-absolute end-0 top-0" style="margin-right: 3%; margin-top: 5%;">
            <img
            src="https://img.freepik.com/free-photo/woman-with-headset-video-call_23-2148854900.jpg"
            class="rounded otherUserCamera"
            alt="..."
          />
          </div> 
      </div>
      
          
    </section>
    <section class="col align-items-center pe-3 ps-3 text-center" style="height: 10%;">
      <div class=" bg-accent rounded-3 p-2">
        <button class="btn bd-highlight btn-danger rounded-3 border-0 me-2 ms-2" @click="endVideocall" s> 
          <i class="bi bi-telephone-fill pe-2" style="color: #ECECEC;"></i>  salir 
        </button>
        <button class="btn bg-dark border-0 me-2 ms-2" @click="shareCam">
          <i class="bi bi-camera-video-fill" id="camIcon"></i>
        </button>
        <button class="btn bg-dark border-0 me-2 ms-2" @click="micOnOff">
          <i class="bi bi-mic-fill" id="micIcon"></i>      
        </button>         
      </div>      
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      
    }
  },
  methods: {
    shareCam() {
      const cameraIcon = document.getElementById('camIcon')
      if (cameraIcon.value != "on"){
        cameraIcon.classList.remove("bi-camera-video-fill");
        cameraIcon.classList.add("bi-camera-video-off-fill");
        cameraIcon.value = "on"
      } else if (cameraIcon.value === "on"){
        cameraIcon.classList.remove("bi-camera-video-off-fill");
        cameraIcon.classList.add("bi-camera-video-fill");
        cameraIcon.value = "off" 
      } else cameraIcon.value = "on"

    },
    micOnOff() {
      const cameraIcon = document.getElementById('micIcon')
      if (cameraIcon.value != "on"){
        cameraIcon.classList.remove("bi-mic-fill");
        cameraIcon.classList.add("bi-mic-mute");
        cameraIcon.value = "on"
      } else if (cameraIcon.value === "on"){
        cameraIcon.classList.remove("bi-mic-mute");
        cameraIcon.classList.add("bi-mic-fill");
        cameraIcon.value = "off" 
      } else cameraIcon.value = "on"

    }
  }
}

</script>

<style scoped>

.userCamera {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.otherUserCamera {
  width: 200px;
  height: 200px;
  object-fit: cover;

}
</style>