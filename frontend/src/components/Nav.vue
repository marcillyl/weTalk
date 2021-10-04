<template>
  <nav class="glass">
    <router-link to="/user" class="nav__link"
      ><i class="fas fa-user-astronaut"></i
    ></router-link>
    <router-link to="/board" class="nav__link nav__link--alt"
      ><i class="fas fa-comments"></i
    ></router-link>
    <router-link to="/message" class="nav__link"
      ><i class="fas fa-pencil-alt"></i
    ></router-link>
  </nav>
</template>

<script>
export default {
  name: 'Nav',
};
</script>

<style scoped>
nav {
  z-index: 100;
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 32px;
  border-top: none;
  border-right: none;
  border-left: none;
}
.nav__link {
  font-size: 1.8em;
  color: #fff;
  transition: color 200ms ease-in-out;
}
.nav__link--alt {
  font-size: 2.4em;
}
.nav__link:hover {
  color: aqua;
}
</style>
