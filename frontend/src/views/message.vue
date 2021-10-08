<template>
  <div class="container">
    <Nav />
    <form action="#" class="glass message" name="message" @submit.prevent>
      <label for="content" class="message__label">Express yourself !</label>
      <textarea
        v-model="content"
        name="content"
        class="message__input"
        cols="27"
        rows="7"
      ></textarea>
      <input
        id="chooseImage"
        type="file"
        accept="image/png image/jpg image/jpeg"
        @change="uploadImage"
        hidden
      />
      <img
        :src="image"
        alt="Message image"
        class="message__image"
        @click="chooseImage()"
      />
      <p class="message__feedback" v-if="feedback">{{ feedback }}</p>
      <button class="message__button aqua" @click="createMessage()">
        <i class="fas fa-paper-plane"></i>
      </button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import Nav from '../components/Nav.vue';
export default {
  name: 'message',
  components: {
    Nav,
  },
  data: function() {
    return {
      content: '',
      file: null,
      image: 'http://localhost:3000/assets/images/Black.png',
      userId: this.$store.state.user.userId,
      feedback: '',
    };
  },
  mounted: function() {
    if (this.userId === -1) {
      this.$router.push('/');
      return;
    }
  },
  methods: {
    chooseImage() {
      document.getElementById('chooseImage').click();
    },
    uploadImage(event) {
      this.file = event.target.files[0];
      this.image = URL.createObjectURL(this.file);
    },
    createMessage() {
      const formData = new FormData();
      formData.set('image', this.file);
      formData.set('content', this.content.toString());
      formData.set('userId', this.userId.toString());
      axios
        .post('http://127.0.0.1:3000/api/messages/', formData, {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem('user')).token
            }`,
          },
        })
        .then(() => {
          this.$router.push('/board');
        })
        .catch(() => {
          this.feedback = 'Messages cannot be empty, please type something.';
        });
    },
  },
};
</script>

<style scoped>
.message {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.message__icon {
  font-size: 2em;
  color: aqua;
}
.message__label {
  font-size: 1.4em;
  font-weight: 600;
  margin-bottom: 24px;
}
.message__image {
  cursor: pointer;
  background: #fff;
  width: 100pt;
  height: 100pt;
  padding: 3pt 3pt 17pt 3pt;
  margin: 24px 0;
}
.message__feedback {
  max-width: 200px;
  margin-bottom: 12px;
  text-align: center;
}
.message__button {
  margin: 12px 0;
}
</style>
