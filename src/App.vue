<script setup lang="ts">
import NavBar from './components/NavBar.vue'
import SiteFooter from './components/SiteFooter.vue'
import GrainOverlay from './components/GrainOverlay.vue'
</script>

<template>
  <GrainOverlay />
  <div class="page">
    <NavBar />
    <main>
      <RouterView />
    </main>
    <SiteFooter />
  </div>
</template>

<style scoped>
.page {
  max-width: 1180px;
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}
</style>
