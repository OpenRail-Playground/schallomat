<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <h1>Schallomat</h1>
    <nav>
      <RouterLink to="/">Home</RouterLink>
    </nav>
  </header>

  <main><RouterView /></main>
</template>

<style>
html, body {
  font-family: Gotham, "Helvetica Neue", Helvetica, Arial, sans-serif;
  padding: 0;
  margin: 0;
}
#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
main {
  position: relative;
}
h1 {
  margin: 0 2rem 0 0.5rem;
  display: inline-block;
}
h2 {
  margin: 0.3rem 0.6rem;
}
nav {
  display: inline;
}
</style>
