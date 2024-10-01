<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import logo from './assets/logo.png'
</script>

<template>
  <header class="rea-header">
    <nav class="cmp-mainnavigation" id="mainnavigation">
      <input type="checkbox" id="toggle_mainnavigation" />
      <label for="toggle_mainnavigation" title="Toggle main navigation" class="is-site-name"
        >UI Core</label
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
          height=""
        />
      </a>
      <span class="is-site-name">UI Core</span>
    </div>
  </header>

  <RouterView />
</template>

<style>
header {
  display: flex;
  flex-direction: row;
  align-items: center;
}

nav {
  display: flex;
  gap: 1rem;
}

nav > a {
  text-decoration: none;
}
</style>
