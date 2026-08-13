<script setup>
import CanvasViz from '../components/CanvasViz.vue'
import { projects } from '../data/content.js'
</script>

<template>
  <div>
    <div class="header">
      <div class="mono-label accent">Index / projects</div>
      <h1 class="title">Projects</h1>
      <p class="lead">
        Published and Unpublished
      </p>
    </div>

    <div v-for="(p, i) in projects" :key="p.slug" :id="p.slug" class="project-row">
      <div>
        <div class="fig-canvas">
          <img v-if="p.image" :src="p.image" :alt="p.title" class="fig-image" />
          <CanvasViz v-else type="mini" :kind="p.fig" :seed="i" :width="540" :height="320" />
        </div>
        <div class="fig-caption">
          fig. {{ p.n }}<template v-if="!p.image"> — drop a real figure here</template>
        </div>
      </div>
      <div>
        <div class="mono-label clay">{{ p.tag }} · {{ p.year }}</div>
        <h2 class="project-title">{{ p.title }}</h2>
        <p class="project-body">{{ p.long }}</p>
        <p v-if="p.blurb" class="project-blurb">{{ p.blurb }}</p>
        <a
          :href="p.link || '#'"
          :target="p.link ? '_blank' : undefined"
          :rel="p.link ? 'noopener' : undefined"
          class="write-up-link"
          >Read the write-up →</a
        >
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
  scroll-margin-top: 20px;
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
  overflow: hidden;
}

.fig-image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
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

.project-blurb {
  font: italic 400 14px/1.5 var(--font-body);
  color: var(--ink-5);
  margin: 10px 0 0;
}

.write-up-link {
  display: inline-block;
  margin-top: 18px;
  font: 500 13px var(--font-mono);
  color: var(--accent);
  text-decoration: none;
}
</style>
