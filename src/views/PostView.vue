<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import CanvasViz from '../components/CanvasViz.vue'
import { posts } from '../data/content.js'

const route = useRoute()
const post = computed(() => posts.find((p) => p.slug === route.params.slug))
</script>

<template>
  <article v-if="post" class="post">
    <div class="mono-label accent">Field notes / {{ post.kicker }}</div>
    <h1 class="title">{{ post.title }}</h1>
    <div class="byline">{{ post.author }} · {{ post.date }} · {{ post.read }} read</div>
    <div class="rule" />

    <p v-for="(para, i) in post.body" :key="`b${i}`" class="paragraph">{{ para }}</p>

    <blockquote v-if="post.pullQuote" class="pull-quote">"{{ post.pullQuote }}"</blockquote>

    <p v-for="(para, i) in post.bodyAfterQuote" :key="`a${i}`" class="paragraph">{{ para }}</p>

    <div v-if="post.figureCaption" class="figure">
      <div class="figure-canvas">
        <CanvasViz type="divider" kind="spectrum" :seed="42" :width="1060" :height="160" />
      </div>
      <div class="figure-caption">{{ post.figureCaption }}</div>
    </div>

    <p v-if="post.closing" class="paragraph">{{ post.closing }}</p>

    <div class="post-nav">
      <RouterLink to="/blog">← all field notes</RouterLink>
    </div>
  </article>
  <div v-else class="not-found">Post not found. <RouterLink to="/blog">Back to field notes</RouterLink></div>
</template>

<style scoped>
.post {
  position: relative;
  padding: 50px 40px 60px;
  max-width: 760px;
  margin: 0 auto;
}

.accent {
  color: var(--accent);
}

.title {
  font: 700 50px/1.08 var(--font-display);
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

.paragraph {
  font: 400 20px/1.75 var(--font-serif);
  margin: 0 0 22px;
}

.pull-quote {
  font: 500 30px/1.35 var(--font-serif);
  font-style: italic;
  color: var(--accent);
  border-left: 3px solid var(--clay);
  padding-left: 24px;
  margin: 34px 0;
}

.figure {
  margin: 30px 0;
}

.figure-canvas {
  height: 150px;
  border: 1px solid var(--line);
  border-radius: 2px;
  overflow: hidden;
  background: var(--paper-alt);
}

.figure-caption {
  font: 400 11px var(--font-mono);
  color: var(--ink-5);
  margin: 8px 0 26px;
}

.post-nav {
  margin-top: 30px;
  font: 400 12px var(--font-mono);
}

.post-nav a {
  color: var(--ink);
  text-decoration: none;
}

.not-found {
  padding: 60px 40px;
}
</style>
