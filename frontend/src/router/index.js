import { createRouter, createWebHistory } from 'vue-router';
import hello from '../views/hello.vue';
import board from '../views/board.vue';
import user from '../views/user.vue';
import message from '../views/message.vue';

const routes = [
  {
    name: 'hello',
    path: '/',
    component: hello,
    props: true,
  },
  {
    name: 'board',
    path: '/board',
    component: board,
    props: true,
  },
  {
    name: 'user',
    path: '/user',
    component: user,
    props: true,
  },
  {
    name: 'message',
    path: '/message',
    component: message,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
