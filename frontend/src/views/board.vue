<template>
  <div>
    <Nav />
    <Message />
  </div>
</template>

<script>
import Nav from '../components/Nav.vue';
import Message from '../components/Message.vue';
export default {
  name: 'board',
  components: {
    Nav,
    Message,
  },
};
</script>

<style scoped></style>
