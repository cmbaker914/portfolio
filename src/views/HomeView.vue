<script setup lang="ts">
import CanvasViz from '../components/CanvasViz.vue'
import NetworkBackground from '../components/NetworkBackground.vue'
import { site, projects, posts } from '../data/content.js'
import { asset } from '../lib/asset.js'
</script>

<template>
  <div>
    <NetworkBackground />
    <div class="hero" v-reveal:none="{ threshold: 0 }">
      <video
        class="hero-video"
        :src="asset('hero_background.mp4')"
        autoplay
        loop
        muted
        playsinline
      ></video>
      <div class="hero-overlay">
        <h1 class="title" v-reveal="{ delay: 90 }">
          {{ site.name }}
          <span class="aurora" aria-hidden="true">
            <span class="aurora__item"></span>
            <span class="aurora__item"></span>
            <span class="aurora__item"></span>
            <span class="aurora__item"></span>
          </span>
        </h1>
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
  height: 70vh;
  border-bottom: 1px solid var(--line);
  overflow: hidden;
}

.hero-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
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
  background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.15) 100%);
}

.sage {
  color: var(--sage);
}

/* Aurora name effect: white text on a black plate, with blurred colour blobs
   in a `mix-blend-mode: darken` layer above — so the colours only show through
   the letters while the surrounding plate stays black. */
.title {
  --aurora-bg: #000;
  --aurora-1: #00c2ff;
  --aurora-2: #33ff8c;
  --aurora-3: #ffc640;
  --aurora-4: #e54cff;

  --feather: 0.16em;

  display: inline-block;
  position: relative;
  overflow: hidden;
  margin: 0;
  padding: 0.28em 0.38em;
  background: var(--aurora-bg);
  color: #fff;
  font-family: 'Inter', var(--font-body);
  font-size: clamp(3rem, 8vw, 7rem);
  font-weight: 800;
  line-height: 1.05;
  letter-spacing: clamp(-1.75px, -0.25vw, -3.5px);

  /* Feather all four edges to transparent so the black plate fades softly into
     the video instead of showing a hard rectangle. Intersecting a horizontal
     and vertical fade feathers the corners too. */
  -webkit-mask:
    linear-gradient(to right, transparent, #000 var(--feather), #000 calc(100% - var(--feather)), transparent),
    linear-gradient(to bottom, transparent, #000 var(--feather), #000 calc(100% - var(--feather)), transparent);
  mask:
    linear-gradient(to right, transparent, #000 var(--feather), #000 calc(100% - var(--feather)), transparent),
    linear-gradient(to bottom, transparent, #000 var(--feather), #000 calc(100% - var(--feather)), transparent);
  -webkit-mask-composite: source-in;
  mask-composite: intersect;
}

.aurora {
  position: absolute;
  inset: 0;
  z-index: 2;
  mix-blend-mode: darken;
  pointer-events: none;
}

.aurora__item {
  position: absolute;
  width: 60%;
  height: 60%;
  background-color: var(--aurora-1);
  border-radius: 37% 29% 27% 27% / 28% 25% 41% 37%;
  filter: blur(1rem);
  mix-blend-mode: overlay;
}

.aurora__item:nth-of-type(1) {
  top: -50%;
  animation: aurora-border 6s ease-in-out infinite,
    aurora-1 12s ease-in-out infinite alternate;
}

.aurora__item:nth-of-type(2) {
  top: 0;
  right: 0;
  background-color: var(--aurora-3);
  animation: aurora-border 6s ease-in-out infinite,
    aurora-2 12s ease-in-out infinite alternate;
}

.aurora__item:nth-of-type(3) {
  left: 0;
  bottom: 0;
  background-color: var(--aurora-2);
  animation: aurora-border 6s ease-in-out infinite,
    aurora-3 8s ease-in-out infinite alternate;
}

.aurora__item:nth-of-type(4) {
  right: 0;
  bottom: -50%;
  background-color: var(--aurora-4);
  animation: aurora-border 6s ease-in-out infinite,
    aurora-4 24s ease-in-out infinite alternate;
}

@keyframes aurora-1 {
  0% { top: 0; right: 0; }
  50% { top: 100%; right: 75%; }
  75% { top: 100%; right: 25%; }
  100% { top: 0; right: 0; }
}

@keyframes aurora-2 {
  0% { top: -50%; left: 0%; }
  60% { top: 100%; left: 75%; }
  85% { top: 100%; left: 25%; }
  100% { top: -50%; left: 0%; }
}

@keyframes aurora-3 {
  0% { bottom: 0; left: 0; }
  40% { bottom: 100%; left: 75%; }
  65% { bottom: 40%; left: 50%; }
  100% { bottom: 0; left: 0; }
}

@keyframes aurora-4 {
  0% { bottom: -50%; right: 0; }
  50% { bottom: 0%; right: 40%; }
  90% { bottom: 50%; right: 25%; }
  100% { bottom: -50%; right: 0; }
}

@keyframes aurora-border {
  0% { border-radius: 37% 29% 27% 27% / 28% 25% 41% 37%; }
  25% { border-radius: 47% 29% 39% 49% / 61% 19% 66% 26%; }
  50% { border-radius: 57% 23% 47% 72% / 63% 17% 66% 33%; }
  75% { border-radius: 28% 49% 29% 100% / 93% 20% 64% 25%; }
  100% { border-radius: 37% 29% 27% 27% / 28% 25% 41% 37%; }
}

@media (prefers-reduced-motion: reduce) {
  .aurora__item {
    animation: none;
  }
}

.lead {
  display: inline-block;
  position: relative;
  isolation: isolate;
  font: 400 18px/1.5 var(--font-body);
  color: rgba(247, 244, 238, 0.9);
  margin: 4px 0 0;
  padding: 0.35em 0.9em;
  max-width: 56ch;
}

/* Blurred black backing so the plate has soft, fuzzy edges that fade into the video. */
.lead::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  background: #000;
  border-radius: 10px;
  filter: blur(12px);
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
