<script setup>
import CanvasViz from '../components/CanvasViz.vue'
import { projects } from '../data/content.js'
</script>

<template>
  <div>
    <div class="header">
      <div class="mono-label accent">Index / projects</div>
      <h1 class="title">Things I've made</h1>
      <p class="lead">
        Four projects I'm happy to defend. Each started as a hunch and survived contact with real
        data — mostly.
      </p>
    </div>

    <div v-for="(p, i) in projects" :key="p.slug" class="project-row">
      <div>
        <div class="fig-canvas">
          <CanvasViz type="mini" :kind="p.fig" :seed="i" :width="540" :height="320" />
        </div>
        <div class="fig-caption">fig. {{ p.n }} — drop a real figure here</div>
      </div>
      <div>
        <div class="mono-label clay">{{ p.tag }} · {{ p.year }}</div>
        <h2 class="project-title">{{ p.title }}</h2>
        <p class="project-body">{{ p.long }}</p>
        <a href="#" class="write-up-link">Read the write-up →</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.header {
  padding: 46px 40px 10px;
}

.accent {
  color: var(--accent);
}

.clay {
  color: var(--clay);
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

.project-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 36px;
  align-items: center;
  padding: 34px 40px;
  border-top: 1px solid var(--line);
}

@media (max-width: 760px) {
  .project-row {
    grid-template-columns: 1fr;
  }
}

.fig-canvas {
  height: 240px;
  background: var(--paper-alt);
  border: 1px solid var(--line);
  border-radius: 2px;
}

.fig-caption {
  font: 400 11px var(--font-mono);
  color: var(--ink-5);
  margin-top: 8px;
}

.project-title {
  font: 600 34px/1.1 var(--font-display);
  margin: 10px 0 0;
  letter-spacing: -0.02em;
}

.project-body {
  font: 400 16px/1.65 var(--font-body);
  color: var(--ink-68);
  margin: 14px 0 0;
}

.write-up-link {
  display: inline-block;
  margin-top: 18px;
  font: 500 13px var(--font-mono);
  color: var(--accent);
  text-decoration: none;
}
</style>
