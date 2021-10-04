<template>
  <div>
    <form class="comment-form" @submit.prevent>
      <input
        v-model="content"
        type="text"
        name="comment"
        class="comment__input"
      />
      <button
        type="button"
        class="comment__send aqua"
        @click="createComment(messageId), refresh()"
      >
        <i class="fas fa-plus"></i>
      </button>
    </form>
    <div
      class="comment-container"
      v-for="comment in comments"
      :key="comment._id"
    >
      <img
        :src="comment.user.imageUrl"
        alt="User image"
        class="comment__userImage"
      />
      <div class="comment">
        <p class="comment__infos">
          posté le
          {{
            comment.createdAt
              .slice(0, 10)
              .split('-')
              .reverse()
              .join('/')
          }}
          par <span>{{ comment.user.username }} </span>
        </p>
        <p class="comment__content">{{ comment.content }}</p>
      </div>
      <i
        v-if="userId === comment.userId || isAdmin === true"
        class="fas fa-trash comment__icon"
        @click="deleteComment(comment._id), refresh()"
      ></i>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Comment',
  props: ['messageId'],
  data: function() {
    return {
      userId: this.$store.state.user.userId,
      isAdmin: this.$store.state.user.isAdmin,
      comments: null,
      content: '',
    };
  },
  mounted: function() {
    this.getComments();
  },
  methods: {
    refresh() {
      this.$router.go();
    },
    getComments() {
      const messageId = this.messageId;
      axios
        .get(`http://localhost:3000/api/comments/${messageId}`, {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem('user')).token
            }`,
          },
        })
        .then((response) => {
          this.comments = response.data;
        });
    },
    createComment(messageId) {
      axios.post(
        `http://localhost:3000/api/comments/${messageId}`,
        {
          content: this.content,
        },
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem('user')).token
            }`,
          },
        }
      );
    },
    deleteComment(commentId) {
      axios.delete(`http://localhost:3000/api/comments/${commentId}`, {
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
.comment-form {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 12px;
}
.comment__input {
  width: 100%;
  height: 30pt;
  border-right: none;
}
.comment__send {
  width: 100px;
  height: 30pt;
  color: #fff;
  background: #33333377;
  border: solid 1pt #444;
  border-left: none;
}
.comment__send i {
  transition: transform 200ms ease-in-out, color 200ms ease-in-out;
}
.comment__send:hover {
  animation: none;
}
.comment__send:hover i {
  transform: rotate(180deg);
  color: aqua;
}
.comment-container {
  display: flex;
  align-items: center;
  width: 100%;
  margin: 4px 0;
  padding: 12px 0;
}
.comment {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.comment__userImage {
  width: 40pt;
  height: 40pt;
  margin-right: 12px;
}
.comment__infos {
  padding: 0 12px 4px 0;
  color: #aaa;
}
.comment__content {
  padding-top: 4px;
}
.comment__icon {
  justify-self: flex-end;
  cursor: pointer;
  margin: 0 12px;
  opacity: 0.3;
  font-size: 1.1em;
  transition: transform 200ms ease-in-out, opacity 170ms ease-in-out;
}
.comment__icon:hover {
  transform: rotate(180deg);
  opacity: 1;
}
</style>
