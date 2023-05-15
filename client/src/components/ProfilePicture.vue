<template>
  <div class="form-group text-center">
    <div class="position-relative">
      <label for="profile-picture" role="button"
        class="profile-picture-label text-white position-absolute rounded-circle">
      </label>
      <img 
        class="img img-fluid rounded-circle mb-1" id="picture-box" 
        src="@/assets/images/blank-profile-picture.svg"
        alt="Profile picture">
    </div>
    <input 
      type="file" 
      accept="image/png, image/jpeg, image/jpg" 
      class="form-control position-absolute"
      id="profile-picture"
      name="profile-picture" 
      autocomplete="off" 
      @change="changeProfilePicture"
    />
    <label for="profile-picture" role="button">Foto de perfil</label>
  </div>
</template>

<script>
import ImageService from '@/services/image.service';

export default {
  emits: [
    'update'
  ],
  methods: {
    readFileAsync(file) {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = () => {
          resolve(fileReader.result);
        };
        fileReader.onerror = reject;
        fileReader.readAsDataURL(file);
      });
    },
    async changeProfilePicture(event) {
      const pictureBox = document.getElementById('picture-box');
      const defaultImage = 'src/assets/images/blank-profile-picture.svg';
      try {
        const files = Array.from(event.target.files);
        if (files.length === 0) {
          pictureBox.src = defaultImage;
          this.$emit('update', null);
          return;
        }
        const file = files[0];

        const allowedExtensions = [ 'image/jpg', 'image/jpeg', 'image/png' ];
        if (!allowedExtensions.includes(file.type)) {
          pictureBox.src = defaultImage;
          this.$emit('update', null);
          return;
        }

        if (file.size >= 8 * 1024 * 1024) {
          pictureBox.src = defaultImage;
          this.$emit('update', null);
          return;
        }

        pictureBox.src = await this.readFileAsync(file);

        const image = await ImageService.createFirebase(file);
        this.$emit('update', image.file);
      }
      catch (exception) {
        console.log(exception);
        pictureBox.src = defaultImage;
        this.$emit('update', null);
      }
    }
  }
}
</script>

<style scoped>
.img {
  width: 128px;
  height: 128px;
  object-fit: cover;
}

.profile-picture-label {
  width: 128px;
  height: 128px;
  line-height: 128px;
}

.profile-picture-label:hover::after {
  content: 'Foto de perfil'
}

.profile-picture-label:hover {
  background-color: rgba(48, 133, 214, 0.5);
}

#profile-picture {
  scale: 0.01;
}
</style>