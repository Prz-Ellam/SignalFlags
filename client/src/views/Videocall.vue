<template>
<div class="bg-dark container-fluid h-100 overflow-auto">
    <section class="col h-100 align-items-center p-3 text-center">
      <div class="box bg-accent group-srcoll py-3 px-5 rounded-3">
        <div>
          <video id="webcamVideo" autoplay playsinline></video>
          <video id="otherVideo" autoplay playsinline></video>
        </div>
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
            urls: [ 'stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302' ]
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
  }
}
</script>

<style scoped>
</style>