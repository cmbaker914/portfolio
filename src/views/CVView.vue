<script setup lang="ts">
import CanvasViz from '../components/CanvasViz.vue'
import { site, experience, education, publications, skillGroups } from '../data/content.js'
import { asset } from '../lib/asset.js'
</script>

<template>
  <div>
    <div class="hero">
      <div class="hero-canvas">
        <CanvasViz type="spectrogram" :seed="9" :width="1180" :height="200" />
      </div>
      <div class="hero-content">
        <div>
          <div class="mono-label accent">Curriculum vitae</div>
          <h1 class="title">{{ site.name }}</h1>
          <p class="subtitle">{{ site.cvSubtitle }}</p>
        </div>
        <a :href="asset('CaseyBakerResume2026.pdf')" download class="pdf-link">Download PDF ↓</a>
      </div>
    </div>

    <div class="grid">
      <div>
        <div class="col-heading">Experience</div>
        <div v-for="e in experience" :key="e.title" class="entry">
          <div class="entry-year">{{ e.year }}</div>
          <div>
            <div class="entry-title">{{ e.title }}</div>
            <div class="entry-org">{{ e.org }} · {{ e.location }}</div>
            <ul v-if="e.bullets" class="entry-bullets">
              <li v-for="b in e.bullets" :key="b">{{ b }}</li>
            </ul>
            <div v-else-if="e.body" class="entry-body">{{ e.body }}</div>
          </div>
        </div>

        <div class="col-heading mt">Education</div>
        <div v-for="e in education" :key="e.title" class="entry">
          <div class="entry-year">{{ e.year }}</div>
          <div>
            <div class="entry-title">{{ e.title }}</div>
            <div class="entry-org">{{ e.org }} · {{ e.location }}</div>
          </div>
        </div>
      </div>

      <div>
        <div class="col-heading">Publications</div>
        <div class="side-block">
          <p v-for="p in publications" :key="p" class="publication">{{ p }}</p>
        </div>

        <div v-for="group in skillGroups" :key="group.label">
          <div class="col-heading mt">{{ group.label }}</div>
          <div class="tools">
            <span v-for="t in group.items" :key="t" class="tool-chip">{{ t }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero {
  position: relative;
  padding: 48px 40px 14px;
  overflow: hidden;
}

.hero-canvas {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 200px;
  opacity: 0.22;
}

.hero-content {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-wrap: wrap;
  gap: 16px;
}

.accent {
  color: var(--accent);
}

.title {
  font: 700 52px/1.05 var(--font-display);
  margin: 14px 0 0;
  letter-spacing: -0.025em;
}

.subtitle {
  font: 400 16px var(--font-body);
  color: var(--ink-65);
  margin: 10px 0 0;
}

.pdf-link {
  font: 500 13px var(--font-mono);
  color: var(--accent);
  text-decoration: none;
  white-space: nowrap;
}

.grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 48px;
  padding: 24px 40px 50px;
}

@media (max-width: 760px) {
  .grid {
    grid-template-columns: 1fr;
  }
}

.col-heading {
  font: 600 12px var(--font-display);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--ink-5);
  padding-bottom: 10px;
  border-bottom: 1px solid var(--line);
}

.col-heading.mt {
  margin-top: 30px;
}

.entry {
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 16px;
  padding: 18px 0;
  border-bottom: 1px solid var(--line);
}

.entry-year {
  font: 400 12px var(--font-mono);
  color: var(--ink-5);
}

.entry-title {
  font: 500 18px var(--font-display);
}

.entry-org {
  font: 400 12px var(--font-mono);
  color: var(--clay);
  margin-top: 4px;
}

.entry-body {
  font: 400 14px/1.5 var(--font-body);
  color: var(--ink-65);
  margin-top: 4px;
}

.entry-bullets {
  font: 400 14px/1.5 var(--font-body);
  color: var(--ink-65);
  margin-top: 8px;
  padding-left: 18px;
}

.entry-bullets li + li {
  margin-top: 6px;
}

.side-block {
  padding: 14px 0;
  border-bottom: 1px solid var(--line);
}

.publication {
  font: 400 13px/1.55 var(--font-body);
  color: var(--ink-68);
}

.publication + .publication {
  margin-top: 12px;
}

.tools {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 14px 0;
}

.tool-chip {
  font: 400 11px var(--font-mono);
  color: var(--ink);
  border: 1px solid var(--line);
  border-radius: 2px;
  padding: 5px 9px;
}
</style>
