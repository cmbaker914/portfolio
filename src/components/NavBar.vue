<script setup>
import { nav, site } from '../data/content.js'
</script>

<template>
  <div class="navbar">
    <RouterLink to="/" class="brand">{{ site.name }}</RouterLink>
    <nav class="links">
      <RouterLink v-for="item in nav" :key="item.to" :to="item.to" class="link">
        {{ item.label }}
      </RouterLink>
    </nav>
  </div>
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  border-bottom: 1px solid var(--line);
}

.brand {
  font: 600 16px var(--font-display);
  text-decoration: none;
  color: var(--ink);
}

.links {
  display: flex;
  gap: 26px;
}

.link {
  font: 400 12px var(--font-mono);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--ink);
  text-decoration: none;
}

.link.router-link-active {
  color: var(--accent);
}
</style>
