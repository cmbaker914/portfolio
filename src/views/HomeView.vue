<script setup lang="ts">
import CanvasViz from '../components/CanvasViz.vue'
import NetworkBackground from '../components/NetworkBackground.vue'
import { site, projects, posts } from '../data/content.js'
</script>

<template>
  <div>
    <NetworkBackground />
    <div class="hero" v-reveal:none="{ threshold: 0 }">
      <div class="hero-overlay">
        <h1 class="title" v-reveal="{ delay: 90 }">{{ site.name }}</h1>
        <p class="lead" v-reveal="{ delay: 180 }">
          Biomedical engineer, neuroscientist, and machine learning engineer
        </p>
      </div>
    </div>

    <div class="section">
      <div class="section-label" v-reveal>Projects</div>
      <div class="index-grid">
        <RouterLink
          v-for="(p, i) in projects"
          :key="p.slug"
          :to="{ path: '/projects', hash: `#${p.slug}` }"
          class="index-tile"
          v-reveal="{ delay: i * 90 }"
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
      <div class="section-label" v-reveal>Recent notes</div>
      <RouterLink
        v-for="(post, i) in posts"
        :key="post.slug"
        :to="`/blog/${post.slug}`"
        class="note-row"
        v-reveal:left="{ delay: i * 80 }"
      >
        <span class="note-date">{{ post.date }}</span>
        <span class="note-title">{{ post.title }}</span>
        <span class="note-read">{{ post.read }}</span>
      </RouterLink>
    </div>

    <div class="terminal-footer" v-reveal>// EOF — {{ site.email }}</div>
  </div>
</template>

<style scoped>
.hero {
  position: relative;
  height: 48vh;
  overflow: hidden;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 32px;
}

.sage {
  color: var(--sage);
}

/* Aurora name effect: white text on a black plate, with blurred colour blobs
   in a `mix-blend-mode: darken` layer above — so the colours only show through
   the letters while the surrounding plate stays black. */
/* Aurora name: the colours fill the letters directly via background-clip,
   with the gradient slowly drifting — no box, works on any background. */
.title {
  margin: 0;
  font-family: 'Inter', var(--font-body);
  font-size: clamp(3rem, 8vw, 7rem);
  font-weight: 800;
  line-height: 1.05;
  letter-spacing: clamp(-1.75px, -0.25vw, -3.5px);
  background: linear-gradient(90deg, #00c2ff, #33ff8c, #ffc640, #e54cff, #00c2ff);
  background-size: 300% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
  animation: aurora-text 14s linear infinite;
}

@keyframes aurora-text {
  to {
    background-position: -300% 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .title {
    animation: none;
  }
}

.lead {
  font: 400 18px/1.5 var(--font-body);
  color: var(--ink-90);
  margin: 24px 0 0;
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
  /* Fixed dark terminal band in both themes. */
  background: #1f1d1b;
  color: rgba(247, 244, 238, 0.6);
  font: 400 12px var(--font-mono);
  margin-top: 24px;
}
</style>
