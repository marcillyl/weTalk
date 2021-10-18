<template>
  <div class="container">
    <div class="message glass" v-for="message in messages" :key="message._id">
      <div class="message-headbox">
        <img
          :src="message.user.imageUrl"
          alt="User image"
          class="message-headbox__image"
        />
        <p class="message-headbox__text">
          posté le
          {{
            message.createdAt
              .slice(0, 10)
              .split('-')
              .reverse()
              .join('/')
          }}
          par <span>{{ message.user.username }}</span>
        </p>
        <i
          v-if="userId === message.userId || isAdmin === true"
          class="fas fa-trash message-headbox__icon"
          @click="deleteMessage(message._id), refresh()"
        ></i>
      </div>
      <p class="message__text">{{ message.content }}</p>
      <img
        v-if="message.imageUrl"
        :src="message.imageUrl"
        alt="Message image"
        class="message__image"
      />
      <Comment :messageId="message._id" />
    </div>
    <div class="message glass">
      <div class="message-headbox">
        <img
          src="http://localhost:3000/assets/images/Black.png"
          alt="User image"
          class="message-headbox__image"
        />
        <p class="message-headbox__text">posté le 10/10/2021 par weTalk</p>
        <i class="fas fa-thumbtack message-headbox__icon"></i>
      </div>
      <p class="message__text">
        Hello and welcome to weTalk ! Here you can chat and share experiences
        and images. Have fun !
      </p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Comment from './Comment.vue';
export default {
  name: 'Message',
  components: { Comment },
  data: function() {
    return {
      userId: this.$store.state.user.userId,
      isAdmin: this.$store.state.user.isAdmin,
      messages: null,
    };
  },
  mounted: function() {
    if (this.userId === -1) {
      this.$router.push('/');
      return;
    }
    this.getMessages();
  },
  methods: {
    refresh: function() {
      this.$router.go();
    },
    getMessages() {
      axios
        .get('http://localhost:3000/api/messages/', {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem('user')).token
            }`,
          },
        })
        .then((response) => {
          this.messages = response.data;
        });
    },
    deleteMessage(messageId) {
      axios.delete(`http://localhost:3000/api/messages/${messageId}`, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem('user')).token
          }`,
        },
      });
    },
  },
};
</script>

<style scoped>
.message {
  display: flex;
  flex-direction: column;
  max-width: 500px;
  width: calc(100% - 12px);
  margin: 12px auto;
  padding: 12px;
}
.message-headbox {
  display: inline-flex;
  align-items: center;
  width: 100%;
  padding-right: 12px;
  background: #33333377;
  border: solid 1.5pt #ffffff11;
}
.message-headbox__image {
  width: 50px;
  height: 50px;
  margin-right: 12px;
}
.message-headbox__text {
  width: 100%;
}
.message-headbox__icon {
  cursor: pointer;
  margin-left: 12px;
  padding: 7px;
  font-size: 1.1em;
  transition: transform 200ms ease-in-out;
}
.message-headbox__icon:hover {
  transform: rotate(180deg);
}
.message__text {
  margin: 12px;
}
.message__image {
  max-width: 100%;
  max-height: 400px;
  margin: auto;
  margin-top: 12px;
  margin-bottom: 12px;
}
@media screen and (max-width: 500px) {
  .message {
    margin: 7px auto;
  }
}
</style>
