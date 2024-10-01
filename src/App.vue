<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import logo from './assets/logo.png'
</script>

<template>
  <header>
    <img :src="logo" id="logo" />
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style>
html,
body {
  font-family: Gotham, 'Helvetica Neue', Helvetica, Arial, sans-serif;
  padding: 0;
  margin: 0;
}

#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

header {
  display: flex;
  flex-direction: row;
  align-items: center;
}

main {
  position: relative;
}

h1 {
  margin: 0 2rem 0 0.5rem;
  display: inline-block;
}

#logo {
  width: 100px;
  margin-right: 1rem;
}

nav {
  display: flex;
  gap: 1rem;
}

nav > a {
  text-decoration: none;
}
</style>
