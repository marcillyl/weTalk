<template>
  <div>
    <link
      rel="stylesheet"
      href="https://use.fontawesome.com/releases/v5.2.0/css/all.css"
    />
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
@font-face {
  font-family: 'OpenSans';
  src: url('./assets/Fonts/Open_Sans/OpenSans-Light.ttf') format('truetype');
  font-weight: 300;
}
@font-face {
  font-family: 'OpenSans';
  src: url('./assets/Fonts/Open_Sans/OpenSans-Regular.ttf') format('truetype');
  font-weight: 400;
}
@font-face {
  font-family: 'OpenSans';
  src: url('./assets/Fonts/Open_Sans/OpenSans-SemiBold.ttf') format('truetype');
  font-weight: 600;
}
@font-face {
  font-family: 'OpenSans';
  src: url('./assets/Fonts/Open_Sans/OpenSans-Bold.ttf') format('truetype');
  font-weight: 700;
}
@font-face {
  font-family: 'OpenSans';
  src: url('./assets/Fonts/Open_Sans/OpenSans-ExtraBold.ttf') format('truetype');
  font-weight: 800;
}
#app {
  font-family: 'OpenSans', Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
*,
*::before,
*::after {
  box-sizing: inherit;
  margin: 0;
}
html {
  box-sizing: border-box;
  scroll-behavior: smooth;
  min-width: 320px;
}
body {
  background: url('./assets/Images/bg.jpg') no-repeat center;
  background-attachment: fixed;
  background-size: cover;
  font-size: 11pt;
  color: #fff;
}
img {
  object-fit: cover;
}
a {
  cursor: pointer;
  text-decoration: none;
}
h1,
h2,
h3,
h4,
h5,
h6,
p {
  cursor: default;
}
button {
  font-family: 'OpenSans', Arial, Helvetica, sans-serif;
  background: transparent;
  border: none;
  color: #fff;
  cursor: pointer;
}
input,
textarea {
  font-family: 'OpenSans', Arial, Helvetica, sans-serif;
  border: none;
  resize: none;
  background: #11111177;
  border: solid 1pt #444;
  padding: 7px;
  color: #fff;
  font-size: 1em;
}
input::placeholder,
textarea::placeholder {
  opacity: 0.7;
}
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding-top: 77px;
}
@keyframes translate {
  0% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(4px);
  }
  50% {
    transform: translateX(0);
  }
  75% {
    transform: translateX(-4px);
  }
  100% {
    transform: translateX(0);
  }
}
.glass {
  backdrop-filter: blur(7px);
  -webkit-backdrop-filter: blur(7px);
  background: #222222dd;
  border: solid 1pt #333;
  box-shadow: 4pt 4pt 10pt #000000aa;
  padding: 24px 32px;
}
.aqua {
  font-size: 1.6em;
  padding: 4px 0;
  background: aqua;
  color: #2a2a2a;
  width: 200px;
}
.aqua:hover {
  animation: translate 270ms ease-in-out both;
}
</style>
