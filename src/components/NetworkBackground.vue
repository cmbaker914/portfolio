<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'

// A faint, slowly-drifting node graph rendered behind the page. Sits on a
// fixed full-viewport canvas at z-index -1 — above the paper background but
// behind all content. Colour is read from the --ink token each frame, so it
// follows the light/dark theme automatically.

const canvasRef = ref<HTMLCanvasElement | null>(null)
let raf: number | null = null

interface Node {
  x: number
  y: number
  vx: number
  vy: number
}

const LINK_DIST = 150 // px within which two nodes are linked
const DENSITY = 9000 // one node per ~this many px² of viewport
const COLOR = '100, 149, 237' // cornflower blue, as rgb channels for rgba()

onMounted(() => {
  const cv = canvasRef.value
  if (!cv) return
  const ctx = cv.getContext('2d')
  if (!ctx) return

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  let W = 0
  let H = 0
  let nodes: Node[] = []

  const seed = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    W = window.innerWidth
    H = window.innerHeight
    cv.width = W * dpr
    cv.height = H * dpr
    cv.style.width = W + 'px'
    cv.style.height = H + 'px'
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

    const count = Math.max(24, Math.min(90, Math.round((W * H) / DENSITY)))
    nodes = Array.from({ length: count }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
    }))
  }

  const draw = () => {
    ctx.clearRect(0, 0, W, H)

    // Edges: fade with distance.
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i]
      for (let j = i + 1; j < nodes.length; j++) {
        const c = nodes[j]
        const dx = a.x - c.x
        const dy = a.y - c.y
        const d2 = dx * dx + dy * dy
        if (d2 > LINK_DIST * LINK_DIST) continue
        const alpha = (1 - Math.sqrt(d2) / LINK_DIST) * 0.14
        ctx.strokeStyle = `rgba(${COLOR}, ${alpha})`
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(a.x, a.y)
        ctx.lineTo(c.x, c.y)
        ctx.stroke()
      }
    }

    // Nodes.
    ctx.fillStyle = `rgba(${COLOR}, 0.24)`
    for (const n of nodes) {
      ctx.beginPath()
      ctx.arc(n.x, n.y, 1.6, 0, 6.2832)
      ctx.fill()
    }
  }

  const step = () => {
    for (const n of nodes) {
      n.x += n.vx
      n.y += n.vy
      if (n.x < 0 || n.x > W) n.vx *= -1
      if (n.y < 0 || n.y > H) n.vy *= -1
    }
    draw()
    raf = requestAnimationFrame(step)
  }

  let resizeTimer: number | undefined
  const onResize = () => {
    window.clearTimeout(resizeTimer)
    resizeTimer = window.setTimeout(() => {
      seed()
      if (reduced) draw()
    }, 150)
  }

  seed()
  if (reduced) {
    draw()
  } else {
    raf = requestAnimationFrame(step)
  }
  window.addEventListener('resize', onResize)

  onBeforeUnmount(() => {
    if (raf) cancelAnimationFrame(raf)
    window.removeEventListener('resize', onResize)
    window.clearTimeout(resizeTimer)
  })
})
</script>

<template>
  <canvas ref="canvasRef" class="network-bg" aria-hidden="true" />
</template>

<style scoped>
.network-bg {
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
}
</style>
