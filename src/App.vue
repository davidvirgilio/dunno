<script setup>
import { RouterLink, RouterView } from 'vue-router'
import FooterComponent from './components/FooterComponent.vue';

</script>

<template>
  <header class="container-fluid d-flex bg-white py-3">
    <RouterLink to="/" class="mx-auto py-3">
      <img alt="Dunno logo" src="./assets/logo.svg" height="60">
    </RouterLink> 
  </header>
  <main>
    <RouterView />
  </main>
  <FooterComponent class="text-center p-4"/>
</template>