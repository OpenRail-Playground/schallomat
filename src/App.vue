<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import logo from './assets/logo.png'
import { onMounted, ref } from 'vue'

const splash = ref(true)

onMounted(() => setTimeout(() => (splash.value = false), 2000))
</script>

<template>
  <header v-if="!splash" class="rea-header">
    <nav class="cmp-mainnavigation" id="mainnavigation">
      <input type="checkbox" id="toggle_mainnavigation" />
      <label for="toggle_mainnavigation" title="Toggle main navigation" class="is-site-name"
        >Schall-o-Mat</label
      >
      <ul>
        <li>
          <RouterLink custom v-slot="{ isActive, href, navigate }" to="/">
            <a
              :href="href"
              :aria-current="isActive ? 'page' : undefined"
              class="elm-link"
              title="Home"
              @click="navigate"
              >Home</a
            >
          </RouterLink>
        </li>
        <li>
          <RouterLink custom v-slot="{ isActive, href, navigate }" to="/about">
            <a
              :href="href"
              :aria-current="isActive ? 'page' : undefined"
              class="elm-link"
              title="About"
              @click="navigate"
              >About</a
            >
          </RouterLink>
        </li>
      </ul>
    </nav>

    <div class="cmp-brand">
      <a href="#" title="Home" rel="home">
        <img
          :src="logo"
          id="Schall-O-Mat Logo"
          width=""
          class="elm-image is-logo"
          elementtiming="logo"
          height="60"
        />
      </a>
      <span class="is-site-name">Schall-o-Mat</span>
    </div>
  </header>

  <RouterView v-if="!splash" />

  <div class="splash" v-if="splash" @click="splash = false">
    <img :src="logo" />
  </div>
</template>

<style>
@keyframes noise {
  0% {
    transform: translate(0px, 0px) rotate(0deg) scale(1);
  }
  20% {
    transform: translate(-2px, 1px) rotate(-1deg) scale(1.02);
  }
  40% {
    transform: translate(3px, -1px) rotate(1deg) scale(0.98);
  }
  60% {
    transform: translate(-1px, 2px) rotate(-2deg) scale(1.03);
  }
  80% {
    transform: translate(2px, -3px) rotate(2deg) scale(0.97);
  }
  100% {
    transform: translate(0px, 0px) rotate(0deg) scale(1);
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.splash {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.splash img {
  width: 300px;
  animation:
    noise 0.1s infinite,
    fadeIn 1s forwards;
}

header.rea-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 0;
}

nav {
  display: flex;
  gap: 1rem;
}

nav > a {
  text-decoration: none;
}

#app .cmp-brand img {
  height: initial;
  position: relative;
  top: -20px;
}
</style>
