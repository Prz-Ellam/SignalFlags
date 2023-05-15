<template>
  <div class="bg-dark container-fluid h-100">
    <section class="col p-3" style="height: 90%">
      <div class="h-100 bg-accent rounded-3 position-relative row" id="video-grid">
        
        
      </div>
    </section>
    <section class="col align-items-center pe-3 ps-3 text-center" style="height: 10%;">
      <div class=" bg-accent rounded-3 p-2">
        <button class="btn bd-highlight btn-danger rounded-3 border-0 me-2 ms-2" @click="endVideocall" s>
          <i class="bi bi-telephone-fill pe-2" style="color: #ECECEC;"></i> salir
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
import Peer from 'peerjs';

export default {
  data() {
    return {
      stream: null
    }
  },
  async created() {
    // Este es el chat
    const chatId = this.$route.params.id;
    const userId = JSON.parse(localStorage.getItem('user'))._id;

    this.stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    const grid = document.getElementById('video-grid');
    const video = document.createElement('video');
    video.classList.add('h-100');
    video.classList.add('col');
    video.srcObject = this.stream;
    video.muted = true;
    video.addEventListener('loadedmetadata', () => {
      video.play();
    });
    grid.append(video);

    const peer = new Peer(userId);

    peer.on('open', id => {
      console.log('Join call ', id);
      window.socket.emit('join-call', chatId, id);
    });

    peer.on('call', (otherCall) => {
      otherCall.answer(this.stream);
      const video = document.createElement('video');
      const grid = document.getElementById('video-grid');
      otherCall.on('stream', (userVideoStream) => {
        console.log('Stream 2');
        video.classList.add('h-100');
        video.classList.add('col');
        video.srcObject = userVideoStream;
        video.addEventListener('loadedmetadata', () => {
          video.play();
        });
        grid.append(video);
      });
      otherCall.on('close', () => {
        video.remove();
      });
    })

    window.socket.on('user-connected', (userId) => {
      console.log('User connected event: ', userId);
      const call = peer.call(userId, this.stream);
      const video = document.createElement('video');
      const grid = document.getElementById('video-grid');
      call.on('stream', (userVideoStream) => {
        console.log('Stream');
        video.classList.add('h-100');
        video.classList.add('col');
        video.srcObject = userVideoStream;
        video.addEventListener('loadedmetadata', () => {
          video.play();
        });
        grid.append(video);
      });
      call.on('close', () => {
        video.remove();
      });
    });

  },
  onBeforeUnmount() {
    const tracks = this.stream.getTracks();
    tracks.forEach(track => track.stop());
  },
  methods: {
    async shareCam() {
      const tracks = this.stream.getTracks();
    tracks.forEach(track => track.stop());
      const cameraIcon = document.getElementById('camIcon')
      if (cameraIcon.value != "on") {
        cameraIcon.classList.remove("bi-camera-video-fill");
        cameraIcon.classList.add("bi-camera-video-off-fill");
        cameraIcon.value = "on"
        this.localStream = await navigator.mediaDevices.getUserMedia({ video: true });
      } else if (cameraIcon.value === "on") {
        cameraIcon.classList.remove("bi-camera-video-off-fill");
        cameraIcon.classList.add("bi-camera-video-fill");
        cameraIcon.value = "off"
        this.localStream = await navigator.mediaDevices.getUserMedia({ video: false });
      } else cameraIcon.value = "on"

    },
    micOnOff() {
      const cameraIcon = document.getElementById('micIcon')
      if (cameraIcon.value != "on") {
        cameraIcon.classList.remove("bi-mic-fill");
        cameraIcon.classList.add("bi-mic-mute");
        cameraIcon.value = "on"
      } else if (cameraIcon.value === "on") {
        cameraIcon.classList.remove("bi-mic-mute");
        cameraIcon.classList.add("bi-mic-fill");
        cameraIcon.value = "off"
      } else cameraIcon.value = "on"

    },
    createVideo(stream) {
      const grid = document.getElementById('video-grid');
      const video = document.createElement('video');
      video.classList.add('h-100');
      video.classList.add('col');
      video.srcObject = stream;
      video.addEventListener('loadedmetadata', () => {
        video.play();
      });
      grid.append(video);
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
  top: 0;
  right: 0%;
  width: 320px;
  height: 180px;
  object-fit: cover;

}
</style>