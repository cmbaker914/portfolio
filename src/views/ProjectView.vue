<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import CanvasViz from '../components/CanvasViz.vue'
import { projects } from '../data/content.js'

const route = useRoute()
const project = computed(() => projects.find((p) => p.slug === String(route.params.slug)))

// Long-form `writeUp` paragraphs when a project has them, otherwise the single
// summary paragraph shown on the projects index.
const paragraphs = computed(() => project.value?.writeUp ?? (project.value ? [project.value.long] : []))
</script>

<template>
  <article v-if="project" class="project">
    <div class="mono-label accent">Project {{ project.n }} / {{ project.tag }} · {{ project.year }}</div>
    <h1 class="title">{{ project.title }}</h1>
    <div v-if="project.blurb" class="byline">{{ project.blurb }}</div>
    <div class="rule" />

    <div class="figure">
      <img v-if="project.image" :src="project.image" :alt="project.title" class="figure-image" />
      <CanvasViz v-else type="mini" :kind="project.fig" :seed="1" :width="1060" :height="420" />
    </div>
    <div class="figure-caption">fig. {{ project.n }}</div>

    <p v-for="(para, i) in paragraphs" :key="`p${i}`" class="paragraph">{{ para }}</p>

    <a
      v-if="project.link"
      :href="project.link"
      target="_blank"
      rel="noopener"
      class="publication-link"
      >Read the publication ↗</a
    >

    <div class="project-nav">
      <RouterLink to="/projects">← all projects</RouterLink>
    </div>
  </article>
  <div v-else class="not-found">
    Project not found. <RouterLink to="/projects">Back to projects</RouterLink>
  </div>
</template>

<style scoped>
.project {
  position: relative;
  padding: 50px 40px 60px;
  max-width: 760px;
  margin: 0 auto;
}

.accent {
  color: var(--accent);
}

.title {
  font: 700 44px/1.1 var(--font-display);
  margin: 16px 0 0;
  letter-spacing: -0.025em;
}

.byline {
  font: 400 13px var(--font-mono);
  color: var(--ink-5);
  margin: 18px 0 0;
}

.rule {
  height: 1px;
  background: var(--line);
  margin: 28px 0;
}

.figure {
  height: 320px;
  background: var(--figure-pad);
  border: 1px solid var(--line);
  border-radius: 2px;
  overflow: hidden;
}

.figure-image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.figure-caption {
  font: 400 11px var(--font-mono);
  color: var(--ink-5);
  margin: 8px 0 26px;
}

.paragraph {
  font: 400 20px/1.75 var(--font-serif);
  margin: 0 0 22px;
}

.publication-link {
  display: inline-block;
  margin-top: 6px;
  font: 500 13px var(--font-mono);
  color: var(--accent);
  text-decoration: none;
}

.project-nav {
  margin-top: 30px;
  font: 400 12px var(--font-mono);
}

.project-nav a {
  color: var(--ink);
  text-decoration: none;
}

.not-found {
  padding: 60px 40px;
}
</style>
