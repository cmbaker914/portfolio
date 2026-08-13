<script setup>
import CanvasViz from '../components/CanvasViz.vue'
import { site, projects, posts } from '../data/content.js'
</script>

<template>
  <div>
    <div class="terminal-bar">
      <span>{{ site.terminalUser }}</span>
      <span class="dim">{{ site.version }}</span>
    </div>

    <div class="hero">
      <img src="/nasa.png" alt="" class="hero-image" />
    </div>

    <div class="intro">
      <div class="mono-label sage">// source: NASA landsat</div>
      <h1 class="title">{{ site.name }} — {{ site.role.toLowerCase() }}</h1>
      <p class="lead">
        Biomedical engineer, neuroscientist, and machine learning engineer
      </p>
    </div>

    <div class="section">
      <div class="section-label">Projects</div>
      <div class="index-grid">
        <RouterLink
          v-for="(p, i) in projects"
          :key="p.slug"
          :to="{ path: '/projects', hash: `#${p.slug}` }"
          class="index-tile"
        >
          <div class="index-tile-canvas">
            <img v-if="p.image" :src="p.image" :alt="p.title" class="index-tile-image" />
            <CanvasViz v-else type="mini" :kind="p.fig" :seed="i" :width="360" :height="120" />
          </div>
          <div class="index-tile-row">
            <span class="index-label">{{ p.title }}</span>
            <span class="index-arrow">→</span>
          </div>
        </RouterLink>
      </div>
    </div>

    <div class="section">
      <div class="section-label">Recent notes</div>
      <RouterLink
        v-for="post in posts"
        :key="post.slug"
        :to="`/blog/${post.slug}`"
        class="note-row"
      >
        <span class="note-date">{{ post.date }}</span>
        <span class="note-title">{{ post.title }}</span>
        <span class="note-read">{{ post.read }}</span>
      </RouterLink>
    </div>

    <div class="terminal-footer">// EOF — {{ site.email }}</div>
  </div>
</template>

<style scoped>
.terminal-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 32px;
  background: var(--ink);
  color: var(--paper);
  font: 400 12px var(--font-mono);
}

.dim {
  opacity: 0.65;
}

.hero {
  position: relative;
  height: 200px;
  border-bottom: 1px solid var(--line);
  overflow: hidden;
}

.hero-image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.intro {
  padding: 34px 32px 6px;
}

.sage {
  color: var(--sage);
}

.title {
  font: 700 48px/1.05 var(--font-display);
  margin: 14px 0 0;
  letter-spacing: -0.025em;
  max-width: 18ch;
}

.lead {
  font: 400 16px/1.6 var(--font-body);
  color: var(--ink-65);
  margin: 16px 0 0;
  max-width: 56ch;
}

.section {
  padding: 24px 32px 8px;
}

.section-label {
  font: 400 11px var(--font-mono);
  color: var(--ink-5);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 14px;
}

.index-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  background: var(--line);
  border: 1px solid var(--line);
}

@media (max-width: 720px) {
  .index-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.index-tile {
  display: block;
  background: var(--paper);
  padding: 14px;
  text-decoration: none;
  color: var(--ink);
}

.index-tile-canvas {
  height: 96px;
  overflow: hidden;
}

.index-tile-image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.index-tile-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}

.index-label {
  font: 500 14px var(--font-display);
}

.index-arrow {
  font: 400 12px var(--font-mono);
  color: var(--sage);
}

.note-row {
  display: flex;
  gap: 16px;
  align-items: baseline;
  padding: 13px 0;
  border-bottom: 1px solid var(--line);
  text-decoration: none;
  color: var(--ink);
}

.note-date {
  font: 400 11px var(--font-mono);
  color: var(--sage);
  white-space: nowrap;
  width: 90px;
}

.note-title {
  font: 500 16px var(--font-display);
  flex: 1;
}

.note-read {
  font: 400 11px var(--font-mono);
  color: var(--ink-4);
}

.terminal-footer {
  padding: 18px 32px;
  background: var(--ink);
  color: rgba(247, 244, 238, 0.6);
  font: 400 12px var(--font-mono);
  margin-top: 24px;
}
</style>
