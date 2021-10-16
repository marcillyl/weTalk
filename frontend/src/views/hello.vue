<template>
  <div class="container">
    <section class="hello glass">
      <h1 class="hello__headline">
        Hello there, now <br />
        <span class="hello__headline--brand">weTalk</span>
      </h1>
      <button class="hello__toggle" @click="switchToSignUp()">
        Create account
      </button>
      <p>or</p>
      <button class="hello__toggle" @click="switchToSignIn()">sign in</button>
      <form action="#" class="hello-form" @submit.prevent>
        <input
          v-if="mode === `signUp`"
          type="text"
          name="username"
          id="username"
          v-model="username"
          placeholder="Username"
        />
        <input
          type="email"
          name="email"
          id="email"
          v-model="email"
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          id="password"
          v-model="password"
          placeholder="Password"
        />
        <button
          v-if="mode == `signIn`"
          class="hello-form__submit aqua"
          @click="signIn()"
        >
          <i class="fas fa-paper-plane"></i>
        </button>
        <button
          v-if="mode == `signUp`"
          class="hello-form__submit aqua"
          @click="signUp()"
        >
          <i class="fas fa-paper-plane"></i>
        </button>
      </form>
    </section>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'hello',
  data: function() {
    return {
      mode: 'signUp',
      username: '',
      email: '',
      password: '',
    };
  },
  methods: {
    switchToSignUp() {
      this.mode = 'signUp';
    },
    switchToSignIn() {
      this.mode = 'signIn';
    },
    signUp() {
      axios.post('http://127.0.0.1:3000/api/users/signUp', {
        username: this.username,
        email: this.email,
        password: this.password,
      });
      this.mode = 'signIn';
    },
    signIn() {
      const self = this;
      this.$store
        .dispatch('signIn', {
          email: this.email,
          password: this.password,
        })
        .then(function() {
          self.$router.push('board');
        });
    },
  },
};
</script>

<style scoped>
.container {
  padding-top: 0;
}
.hello {
  text-align: center;
}
.fa-users {
  font-size: 3em;
  color: aqua;
  margin-bottom: 12px;
}
.hello__headline {
  font-size: 1.4em;
  font-weight: 400;
  margin-bottom: 12px;
}
.hello__headline--brand {
  font-size: 3em;
  font-weight: 700;
}
p {
  font-size: 1.1em;
  font-weight: 600;
  display: inline;
  margin: 0 10px;
}
.hello__toggle {
  font-size: 1.1em;
  color: aqua;
  padding: 0 0 3px 0;
  border-bottom: solid 1.5pt aqua;
  transition: color 200ms ease-in-out, border-bottom-color 200ms ease-in-out;
}
.hello__toggle:hover {
  color: #fff;
  border-bottom-color: #fff;
}
.hello-form {
  position: relative;
  top: 12px;
  display: flex;
  flex-direction: column;
  padding: 12px 0;
}
input {
  margin: 12px 0;
}
.hello-form__submit {
  margin: 12px 0;
}
</style>
