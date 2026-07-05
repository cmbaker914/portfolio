<script setup>
import { posts } from '../data/content.js'
</script>

<template>
  <div>
    <div class="header">
      <div class="mono-label accent">Field notes</div>
      <h1 class="title">Long-form, occasionally</h1>
      <p class="lead">Methods notes, confessions, and opinions I'll probably revise later.</p>
    </div>

    <RouterLink v-for="post in posts" :key="post.slug" :to="`/blog/${post.slug}`" class="post-row">
      <div class="mono-label sage">{{ post.kicker }}</div>
      <h2 class="post-title">{{ post.title }}</h2>
      <div class="post-meta">{{ post.date }} · {{ post.read }} read</div>
    </RouterLink>
  </div>
</template>

<style scoped>
.header {
  padding: 46px 40px 10px;
}

.accent {
  color: var(--accent);
}

.sage {
  color: var(--sage);
}

.title {
  font: 700 56px/1.04 var(--font-display);
  margin: 14px 0 0;
  letter-spacing: -0.025em;
}

.lead {
  font: 400 18px/1.6 var(--font-body);
  color: var(--ink-68);
  max-width: 54ch;
  margin: 16px 0 0;
}

.post-row {
  display: block;
  padding: 28px 40px;
  border-top: 1px solid var(--line);
  text-decoration: none;
  color: var(--ink);
}

.post-title {
  font: 600 28px/1.15 var(--font-display);
  margin: 10px 0 6px;
  letter-spacing: -0.02em;
}

.post-meta {
  font: 400 12px var(--font-mono);
  color: var(--ink-5);
}
</style>
