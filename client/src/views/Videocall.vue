<template>
 <div class="bg-dark container-fluid h-100">
    <section class="col p-3 " style="height: 90%">
      <div class="h-100 bg-accent rounded-3 position-relative row">
        <div class="col-md h-100">
              <video id="otherVideo"   autoplay playsinline class="rounded userCamera bg-yellow " style="background-image: url('https://repository-images.githubusercontent.com/194294975/e6cdef00-99ef-11e9-90d0-c64097fc903d');"></video>
        </div>
          <div class="col-md h-100">
              <video id="webcamVideo" class="position-absolute userCamera" autoplay playsinline style="background-image: url('https://repository-images.githubusercontent.com/194294975/e6cdef00-99ef-11e9-90d0-c64097fc903d');"></video>
        </div>
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

export default {
  data() {
    return {
      peerConnection: null,
      localStream: null,
      remoteStream: null
    }
  },
  async created() {
    window.socket.emit('prepareOffer', {
      offerUser: JSON.parse(localStorage.getItem('user'))._id,
      answerUser: this.$route.params.userId,
      userId: JSON.parse(localStorage.getItem('user'))._id
    });
    window.socket.on('createdOffer', async data => {
      const servers = {
        iceServers: [
          {
            urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302']
          }
        ],
        iceCantidatePoolSize: 10
      }

      this.peerConnection = new RTCPeerConnection(servers);
      this.localStream = await navigator.mediaDevices.getUserMedia({ video: true });
      this.remoteStream = new MediaStream();

      this.localStream.getTracks().forEach(track => {
        this.peerConnection.addTrack(track, this.localStream);
      });

      this.peerConnection.ontrack = event => {
        event.streams[0].getTracks().forEach(track => {
          this.remoteStream.addTrack(track);
        });
      }

      document.getElementById('webcamVideo').srcObject = this.localStream;
      document.getElementById('otherVideo').srcObject = this.remoteStream;

      // Si el usuario es de tipo offer o answer (creo o respondio la llamada)
      if (data.type === 'offer') {
        this.peerConnection.onicecandidate = event => {
          if (event.candidate) {
            window.socket.emit('setOfferCandidate', {
              callId: data.id,
              candidate: JSON.stringify(event.candidate)
            });
          }
        }

        const offerDescription = await this.peerConnection.createOffer();
        await this.peerConnection.setLocalDescription(offerDescription);

        const offer = {
          sdp: offerDescription.sdp,
          type: offerDescription.type
        };

        window.socket.emit('setOffer', {
          callId: data.id,
          offer: JSON.stringify(offer)
        });

        // Listen for remote answer
        socket.on('getAnswer', data => {
          if (!this.peerConnection.currentRemoteDescription) {
            const answerDescription = new RTCSessionDescription(JSON.parse(data.answer));
            this.peerConnection.setRemoteDescription(answerDescription);
          }
        });

        // When answered, add candidate to peerConnection
        socket.on('getAnswerCandidate', candidateData => {
          const candidate = new RTCIceCandidate(JSON.parse(candidateData));
          this.peerConnection.addIceCandidate(candidate);
        });

      }
      else if (data.type === 'answer') {
        // Enviar todos los answer candidates
        this.peerConnection.onicecandidate = event => {
          if (event.candidate) {
            window.socket.emit('setAnswerCandidate', {
              callId: data.id,
              candidate: JSON.stringify(event.candidate)
            });
          }
        }

        // Obtener la oferta de la llamada
        socket.on('getOffer', async offer => {
          // Al obtenerla la ponemos como remote description
          const remoteDescription = new RTCSessionDescription(JSON.parse(offer));
          this.peerConnection.setRemoteDescription(remoteDescription);

          // Creamos una respuesta, la seteamos y la mandamos
          const answerDescription = await this.peerConnection.createAnswer();
          await this.peerConnection.setLocalDescription(answerDescription);

          const answer = {
            sdp: answerDescription.sdp,
            type: answerDescription.type
          };

          window.socket.emit('setAnswer', {
            callId: data.id,
            answer: JSON.stringify(answer)
          });

          socket.on('getOfferCandidates', icecandidates => {
            for (const icecandidate of icecandidates) {
              const candidate = new RTCIceCandidate(JSON.parse(icecandidate));
              this.peerConnection.addIceCandidate(candidate);
            }
          });
          socket.emit('getOfferCandidates', data.id);

        });
        socket.emit('getOffer', data.id);
      }
    });
  },
  destroyed() {
    window.socket.off('createdOffer');
  },
  methods: {
    async shareCam() {
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
.userCamera:hover {
  width: 100%;
  height: 50%;
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