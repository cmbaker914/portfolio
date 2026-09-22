<script setup lang="ts">
import { site } from '../data/content.js'
</script>

<template>
  <div class="footer">
    <span>
      Created by
      <a class="author" :href="`mailto:${site.email}`">{{ site.name }}</a>
    </span>
    <span>2026</span>
  </div>
</template>

<style scoped>
.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px 16px;
  padding: 30px 40px;
  border-top: 1px solid var(--line);
  font: 400 12px var(--font-mono);
  color: var(--ink-5);
}

.author {
  color: var(--ink);
  text-decoration: none;
  border-bottom: 1px solid var(--line);
  transition: color 160ms ease, border-color 160ms ease;
}

.author:hover {
  color: var(--accent);
  border-bottom-color: var(--accent);
}
</style>
