<template>
  <div class="container">
    <Nav />
    <section class="user glass">
      <form action="#" class="user-form" @submit.prevent>
        <input
          id="chooseImage"
          type="file"
          accept="image/png image/jpg image/jpeg"
          @change="uploadImage"
          hidden
        />
        <img
          :src="user.imageUrl"
          alt="User image"
          class="user__image"
          @click="chooseImage()"
        />
      </form>
      <form action="#" class="user-form" @submit.prevent>
        <label for="username" class="user__text">
          Username : {{ user.username }}
        </label>
        <!-- <input type="text" placeholder="Edit your username" /> -->
        <label for="email" class="user__text"> Email : {{ user.email }} </label>
        <!-- <input type="text" placeholder="Edit your email" /> -->
        <label for="password" class="user__text"> Password : </label>
        <!-- <input type="text" placeholder="Edit your password" /> -->
      </form>
      <button class="button--disconnect aqua" @click="disconnect()">
        <i class="fas fa-sign-out-alt"></i>
      </button>
      <button class="button--delete aqua" @click="deleteUser(userId)">
        <i class="fas fa-trash"></i>
      </button>
    </section>
  </div>
</template>

<script>
import axios from 'axios';
import Nav from '../components/Nav.vue';
export default {
  name: 'user',
  components: {
    Nav,
  },
  data: function() {
    return {
      userId: this.$store.state.user.userId,
      user: Object,
    };
  },
  mounted: function() {
    if (this.$store.state.user.userId === -1) {
      this.$router.push('/');
      return;
    }
    this.getOneUser(this.userId);
  },
  methods: {
    getOneUser(userId) {
      axios
        .get(`http://localhost:3000/api/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem('user')).token
            }`,
          },
        })
        .then((response) => {
          this.user = response.data;
        });
    },
    chooseImage() {
      document.getElementById('chooseImage').click();
    },
    uploadImage(event) {
      const userId = this.userId;
      let formData = new FormData();
      const file = event.target.files[0];
      formData.append('image', file);
      axios.put(`http://localhost:3000/api/users/${userId}/image`, formData, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem('user')).token
          }`,
          'Content-type': 'multipart/form-data',
        },
      });
      this.$router.go();
    },
    disconnect() {
      localStorage.clear();
      this.$router.push('/');
      return;
    },
    deleteUser(userId) {
      axios.delete(`http://localhost:3000/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem('user')).token
          }`,
        },
      });
      localStorage.clear();
      this.$router.push('/');
      return;
    },
  },
};
</script>

<style scoped>
.user {
  display: flex;
  flex-direction: column;
}
.user-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.user__image {
  cursor: pointer;
  background: #fff;
  width: 110pt;
  height: 110pt;
  padding: 4pt 4pt 17pt 4pt;
  margin-bottom: 12px;
}
input {
  align-self: flex-start;
  width: 200px;
}
.user__text {
  font-size: 1.1em;
  font-weight: 600;
  align-self: flex-start;
  margin: 12px 0;
}
.button--disconnect {
  margin-top: 24px;
}
.button--delete {
  font-size: 1.5em;
  padding: 7px 0;
  margin-top: 24px;
  background: crimson;
  color: #fff;
}
.button--delete i {
  transition: transform 200ms ease-in-out;
}
.button--delete:hover {
  animation: none;
}
.button--delete:hover i {
  transform: rotate(180deg);
}
</style>
