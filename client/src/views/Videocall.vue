<template>
 <div class="bg-dark container-fluid h-100">
    <section class="col p-3 " style="height: 90%">
      <div class="app-container">
      <div class="app-main">
        <div class="video-call-wrapper justify-content-center ">
          <!-- Video Participant 1 -->
          <div class="video-participant">            
            <a href="#" class="name-tag">Andy Will</a>
            <video id="otherVideo" autoplay playsinline class="bg-dark" style="background-image: url('https://repository-images.githubusercontent.com/194294975/e6cdef00-99ef-11e9-90d0-c64097fc903d');"></video>
             
            
          </div>
          <!-- Video Participant 2 -->
          <div class="video-participant">            
            <a href="#" class="name-tag">Emmy Lou</a>
            <video id="otherVideo" autoplay playsinline class="bg-yellow" style="background-image: url('https://repository-images.githubusercontent.com/194294975/e6cdef00-99ef-11e9-90d0-c64097fc903d');"></video>
          </div>
          <!-- Video Participant 3 -->
          <div class="video-participant">            
            <a href="#" class="name-tag">Tim Russel</a>
            <video id="webcamVideo" class="bg-dark" autoplay playsinline style="background-image: url('https://repository-images.githubusercontent.com/194294975/e6cdef00-99ef-11e9-90d0-c64097fc903d');"> </video>
          </div>
          <!-- Video Participant 4 -->
          <div class="video-participant">            
            <a href="#" class="name-tag">Jessica Bell</a>
            <video id="webcamVideo" class="bg-yellow" autoplay playsinline style="background-image: url('https://repository-images.githubusercontent.com/194294975/e6cdef00-99ef-11e9-90d0-c64097fc903d');"> </video>
          </div>
          <!-- Video Participant 5 -->
          <div class="video-participant">            
            <a href="#" class="name-tag">Ryan Patrick</a>
            <video id="webcamVideo" class="bg-dark" autoplay playsinline style="background-image: url('https://repository-images.githubusercontent.com/194294975/e6cdef00-99ef-11e9-90d0-c64097fc903d');"> </video>
          </div>
          <!-- Video Participant 6 -->
          <div class="video-participant">            
            <a href="#" class="name-tag">Tina Cate</a>
            <video id="webcamVideo" class="bg-yellow" autoplay playsinline > </video>
          </div>
        </div>
      </div>

      <!-- Right Side -->
      <div class="right-side">       
        <div class="participants">
          <!-- Participant pic 1 -->
          <div class="participant profile-picture">
            <img
              src="https://images.unsplash.com/photo-1576110397661-64a019d88a98?ixlib=rb-1.2.1&auto=format&fit=crop&w=1234&q=80"
              alt=""
            />
          </div>
          <!-- Participant pic 2 -->
          <div class="participant profile-picture">
            <img
              src="https://images.unsplash.com/photo-1566821582776-92b13ab46bb4?ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60"
              alt=""
            />
          </div>
          <!-- Participant pic 3 -->
          <div class="participant profile-picture">
            <img
              src="https://images.unsplash.com/photo-1600207438283-a5de6d9df13e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1234&q=80"
              alt=""
            />
          </div>
          <!-- Participant pic 4 -->
          <div class="participant profile-picture">
            <img
              src="https://images.unsplash.com/photo-1581824283135-0666cf353f35?ixlib=rb-1.2.1&auto=format&fit=crop&w=1276&q=80"
              alt=""
            />
          </div>
          <div class="participant-more">2+</div>
        </div>
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
/*==================== LAYOUT ====================*/

.app-container {
  width: 100%;
  height: 100%;
  display: flex;
}

.profile-picture {
  border-radius: 8px;
  width: 32px;
  height: 32px;
  overflow: hidden;
  margin: 12px;
}
.profile-picture img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.video-call-wrapper {
  width: 100%;
  height: 100%;
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
}
.video-participant {
  width: 33.3%;
  height: 50%;
  position: relative;
}
.video-participant img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.video-participant video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  background-size: cover;
}
.name-tag {
  position: absolute;
  bottom: 12px;
  right: 12px;
  font-size: 12px;
  color: #fff;
  background-color: rgba(0, 15, 47, 0.5);
  border-radius: 4px;
  padding: 4px 12px;
}
.participants {
  padding: 12px;
  max-width: 232px;
  margin-left: auto;
}

.participant-more {
  min-width: 32px;
  height: 32px;
  background-color: #e1e0e1;
  font-size: 14px;
  display: flex;
  justify-content: center;
  color: #232323;
  font-weight: 700;
  border-radius: 8px;
  max-width: 232px;
  padding: 0px;
}

/*==================== Devices smaller than 900px ====================*/

@media screen and (max-width: 900px) {
  
  .right-side {
    position: absolute;
    right: 0;
    background-color: var(--chat-background);
    transform: translateX(100%);
    z-index: 2;
    width: 100%;
  }
  .right-side.show {
    transform: translateX(0);
  }
  .btn-close-right {
    display: block;
  }
}

/*==================== Devices smaller than 520px ====================*/
@media screen and (max-width: 520px) {
  .left-side {
    display: none;
  }
  .app-main {
    padding: 72px 16px 16px 16px;
  }
  .video-call-actions {
    padding-top: 32px;
  }
  .video-action-button {
    width: 32px;
    height: 32px;
    background-size: 14px;
    margin: 0 4px;
  }
}
/*==================== Devices Between 520px - 720px ====================*/
@media screen and (max-width: 520px) and (max-width: 720px) {
  .video-participant {
    width: 50%;
    height: 33.3%;
  }
}
</style>