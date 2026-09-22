<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { nav, site } from '../data/content.js'
import { preferredTheme, setTheme, type Theme } from '../lib/theme.js'

const theme = ref<Theme>(preferredTheme())
const scrolled = ref(false)

function toggleTheme() {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
  setTheme(theme.value)
}

function onScroll() {
  scrolled.value = window.scrollY > 8
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <div class="navbar" :class="{ scrolled }">
    <RouterLink to="/" class="brand">{{ site.name }}</RouterLink>
    <nav class="links">
      <RouterLink v-for="item in nav" :key="item.to" :to="item.to" class="link">
        {{ item.label }}
      </RouterLink>
      <button
        class="theme-toggle"
        type="button"
        :aria-label="theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
        :title="theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
        @click="toggleTheme"
      >
        {{ theme === 'dark' ? '☀' : '☾' }}
      </button>
    </nav>
  </div>
</template>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 50;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  border-bottom: 1px solid transparent;
  transition: padding 260ms ease, background-color 260ms ease, border-color 260ms ease,
    box-shadow 260ms ease;
}

/* Liquid glass, applied only once the page has scrolled under the bar. */
.navbar.scrolled {
  padding: 12px 40px;
  background: var(--glass);
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  border-bottom-color: var(--glass-line);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
}

@media (prefers-reduced-motion: reduce) {
  .navbar {
    transition: none;
  }
}

.brand {
  font: 600 16px var(--font-display);
  text-decoration: none;
  color: var(--ink);
}

.links {
  display: flex;
  align-items: center;
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

.theme-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  padding: 0;
  border: 1px solid var(--line);
  border-radius: 50%;
  background: transparent;
  color: var(--ink);
  font-size: 14px;
  line-height: 1;
  cursor: pointer;
  transition: border-color 160ms ease, color 160ms ease;
}

.theme-toggle:hover {
  border-color: var(--accent);
  color: var(--accent);
}
</style>
