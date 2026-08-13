<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'

// Ported from the design mockup's canvas-drawing logic. `type` selects the
// generator family (ecg / umap / contour / mini / divider); `kind` selects
// the specific figure within the `mini` / `divider` families.
const props = defineProps({
  type: { type: String, required: true },
  kind: { type: String, default: '' },
  seed: { type: [Number, String], default: 7 },
  width: { type: Number, default: 360 },
  height: { type: Number, default: 120 },
})

const canvasRef = ref(null)
let raf = null

const COLORS = {
  PAPER: '#F7F4EE',
  INK: '#2E2C29',
  ACCENT: '#7E9BD0',
  CLAY: '#C99A7C',
  SAGE: '#9CAE96',
  LINE: '#E3DDD2',
}

function makeRng(seed) {
  let s = (parseInt(seed, 10) || 7) * 9301 + 49297
  const rnd = () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff
    return s / 0x7fffffff
  }
  const nrm = () => (rnd() + rnd() + rnd() + rnd() - 2) / 2
  return { rnd, nrm }
}

function setup(cv, type, kind, seed) {
  const ctx = cv.getContext('2d')
  const W = cv.width
  const H = cv.height
  const C = COLORS
  const { rnd, nrm } = makeRng(seed)

  if (type === 'umap') {
    const palette = [C.ACCENT, C.CLAY, C.SAGE, '#8E86A8', '#6f93c6']
    const cx = [0.22, 0.42, 0.6, 0.76, 0.88]
    const cy = [0.56, 0.32, 0.64, 0.4, 0.54]
    const pts = []
    for (let k = 0; k < 5; k++) {
      const bx = W * cx[k]
      const by = H * cy[k]
      const n = 80 + Math.floor(rnd() * 40)
      const sx = 80 + rnd() * 70
      const sy = 60 + rnd() * 50
      for (let i = 0; i < n; i++)
        pts.push({
          x: bx + nrm() * sx * 2.4,
          y: by + nrm() * sy * 2.4,
          r: 1.8 + rnd() * 2.0,
          c: palette[k],
          ph: rnd() * 6.283,
          amp: 2 + rnd() * 4,
        })
    }
    return {
      animated: true,
      draw: (t) => {
        ctx.clearRect(0, 0, W, H)
        ctx.fillStyle = C.PAPER
        ctx.fillRect(0, 0, W, H)
        for (const p of pts) {
          const dx = Math.sin(t * 0.3 + p.ph) * p.amp
          const dy = Math.cos(t * 0.24 + p.ph * 1.3) * p.amp
          ctx.globalAlpha = 0.55
          ctx.fillStyle = p.c
          ctx.beginPath()
          ctx.arc(p.x + dx, p.y + dy, p.r, 0, 6.2832)
          ctx.fill()
        }
        ctx.globalAlpha = 1
      },
    }
  }

  if (type === 'contour') {
    const centers = []
    for (let i = 0; i < 5; i++)
      centers.push({
        bx: W * (0.15 + 0.7 * rnd()),
        by: H * (0.15 + 0.7 * rnd()),
        a: 0.7 + rnd() * 0.7,
        sg: 60 + rnd() * 70,
        ph: rnd() * 6.28,
        rx: 18 + rnd() * 22,
        ry: 14 + rnd() * 18,
        sp: 0.12 + rnd() * 0.16,
      })
    const gs = 14
    const cols = Math.ceil(W / gs)
    const rows = Math.ceil(H / gs)
    const table = [
      [],
      [[3, 2]],
      [[2, 1]],
      [[3, 1]],
      [[0, 1]],
      [[0, 1], [2, 3]],
      [[0, 2]],
      [[0, 3]],
      [[0, 3]],
      [[0, 2]],
      [[0, 3], [1, 2]],
      [[0, 1]],
      [[3, 1]],
      [[2, 1]],
      [[3, 2]],
      [],
    ]
    const colors = [C.INK, C.SAGE, C.INK, C.ACCENT, C.INK, C.ACCENT]
    const fracs = [0.12, 0.22, 0.34, 0.48, 0.64, 0.82]
    const vals = new Float32Array((rows + 1) * (cols + 1))
    return {
      animated: true,
      draw: (t) => {
        ctx.clearRect(0, 0, W, H)
        ctx.fillStyle = C.PAPER
        ctx.fillRect(0, 0, W, H)
        for (const c of centers) {
          c.cx = c.bx + Math.sin(t * c.sp + c.ph) * c.rx
          c.cy = c.by + Math.cos(t * c.sp * 1.1 + c.ph) * c.ry
        }
        let vmax = 1e-6
        for (let j = 0; j <= rows; j++)
          for (let i = 0; i <= cols; i++) {
            let v = 0
            const px = i * gs
            const py = j * gs
            for (const c of centers) {
              const dx = px - c.cx
              const dy = py - c.cy
              v += c.a * Math.exp(-(dx * dx + dy * dy) / (2 * c.sg * c.sg))
            }
            vals[j * (cols + 1) + i] = v
            if (v > vmax) vmax = v
          }
        for (let ti = 0; ti < fracs.length; ti++) {
          const T = fracs[ti] * vmax
          ctx.strokeStyle = colors[ti]
          ctx.globalAlpha = 0.16 + 0.045 * ti
          ctx.lineWidth = 1.1
          ctx.beginPath()
          for (let j = 0; j < rows; j++)
            for (let i = 0; i < cols; i++) {
              const tl = vals[j * (cols + 1) + i]
              const tr = vals[j * (cols + 1) + i + 1]
              const br = vals[(j + 1) * (cols + 1) + i + 1]
              const bl = vals[(j + 1) * (cols + 1) + i]
              let cs = 0
              if (tl > T) cs |= 8
              if (tr > T) cs |= 4
              if (br > T) cs |= 2
              if (bl > T) cs |= 1
              const segs = table[cs]
              if (!segs.length) continue
              const x0 = i * gs
              const y0 = j * gs
              const ep = (e) => {
                const lp = (a, b) => {
                  const d = b - a
                  return Math.abs(d) < 1e-9 ? 0.5 : (T - a) / d
                }
                if (e === 0) return [x0 + gs * lp(tl, tr), y0]
                if (e === 1) return [x0 + gs, y0 + gs * lp(tr, br)]
                if (e === 2) return [x0 + gs * lp(bl, br), y0 + gs]
                return [x0, y0 + gs * lp(tl, bl)]
              }
              for (const sg of segs) {
                const a = ep(sg[0])
                const b = ep(sg[1])
                ctx.moveTo(a[0], a[1])
                ctx.lineTo(b[0], b[1])
              }
            }
          ctx.stroke()
        }
        ctx.globalAlpha = 1
      },
    }
  }

  if (type === 'spectrogram') {
    const cols = Math.max(8, Math.round(W / 14))
    const rows = Math.max(4, Math.round(H / 14))
    const tileW = W / cols
    const tileH = H / rows
    const gap = 1
    const palette = [C.ACCENT, C.CLAY, C.SAGE, '#8E86A8', '#6f93c6']
    const rgb = palette.map((hex) => {
      const n = parseInt(hex.slice(1), 16)
      return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
    })

    // Deterministic pseudo-random in [0,1) from a few integer/float seeds —
    // lets every tile pick its own period/phase/colors as a pure function
    // of (col, row, epoch), so a frame can be redrawn from scratch each
    // tick with no per-tile state to keep in sync.
    const hash = (x, y, z) => {
      const v = Math.sin(x * 12.9898 + y * 78.233 + z * 37.719) * 43758.5453
      return v - Math.floor(v)
    }
    const smooth = (x) => x * x * (3 - 2 * x)

    return {
      animated: true,
      draw: (t) => {
        ctx.fillStyle = C.LINE
        ctx.fillRect(0, 0, W, H)
        for (let row = 0; row < rows; row++) {
          for (let col = 0; col < cols; col++) {
            const period = 2.2 + hash(col, row, 1) * 3.4
            const phase = hash(col, row, 2) * period
            const te = t + phase
            const epoch = Math.floor(te / period)
            const frac = te / period - epoch
            const from = rgb[Math.floor(hash(col, row, epoch - 0.5) * palette.length)]
            const to = rgb[Math.floor(hash(col, row, epoch + 0.5) * palette.length)]
            const blend = frac < 0.3 ? smooth(frac / 0.3) : 1
            const r = from[0] + (to[0] - from[0]) * blend
            const g = from[1] + (to[1] - from[1]) * blend
            const b = from[2] + (to[2] - from[2]) * blend
            ctx.fillStyle = `rgb(${r | 0}, ${g | 0}, ${b | 0})`
            ctx.fillRect(col * tileW + gap / 2, row * tileH + gap / 2, tileW - gap, tileH - gap)
          }
        }
      },
    }
  }

  if (type === 'mini') {
    return {
      animated: false,
      draw: () => {
        ctx.clearRect(0, 0, W, H)
        ctx.fillStyle = C.PAPER
        ctx.fillRect(0, 0, W, H)
        if (kind === 'scatter') {
          const pal = [C.ACCENT, C.CLAY, C.SAGE]
          for (let i = 0; i < 90; i++) {
            ctx.globalAlpha = 0.6
            ctx.fillStyle = pal[i % 3]
            ctx.beginPath()
            ctx.arc(W * (0.1 + 0.8 * rnd()), H * (0.12 + 0.76 * rnd()), 1.6 + rnd() * 1.6, 0, 6.28)
            ctx.fill()
          }
          ctx.globalAlpha = 1
        } else if (kind === 'bars') {
          const n = 8
          const bw = (W * 0.8) / (n * 1.5)
          for (let i = 0; i < n; i++) {
            const h = H * (0.15 + 0.75 * rnd())
            ctx.globalAlpha = 0.7
            ctx.fillStyle = C.ACCENT
            ctx.fillRect(W * 0.1 + i * bw * 1.5, H - 6 - h, bw, h)
          }
          ctx.globalAlpha = 1
        } else if (kind === 'ecg2') {
          const P = 64
          const mid = H * 0.56
          const amp = H * 0.5
          const g = (p, m, sd) => Math.exp(-((p - m) ** 2) / (2 * sd * sd))
          ctx.strokeStyle = C.ACCENT
          ctx.lineWidth = 1.6
          ctx.lineJoin = 'round'
          ctx.beginPath()
          for (let x = 0; x <= W; x++) {
            const ph = (x % P) / P
            const y = mid - (1.0 * g(ph, 0.4, 0.012) - 0.16 * g(ph, 0.47, 0.02) + 0.2 * g(ph, 0.7, 0.06)) * amp
            x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
          }
          ctx.stroke()
        } else if (kind === 'heat') {
          const c2 = 10
          const r2 = 5
          const cw = W / c2
          const ch = H / r2
          for (let j = 0; j < r2; j++)
            for (let i = 0; i < c2; i++) {
              ctx.globalAlpha = 0.18 + rnd() * 0.72
              ctx.fillStyle = C.ACCENT
              ctx.fillRect(i * cw + 1, j * ch + 1, cw - 2, ch - 2)
            }
          ctx.globalAlpha = 1
        } else if (kind === 'contour2') {
          ctx.strokeStyle = C.SAGE
          const ccx = W * 0.5
          const ccy = H * 0.5
          for (let r = 6; r < Math.min(W, H) * 0.55; r += 7) {
            ctx.globalAlpha = 0.45
            ctx.beginPath()
            ctx.ellipse(ccx, ccy, r * 1.5, r * 0.95, 0.35, 0, 6.28)
            ctx.stroke()
          }
          ctx.globalAlpha = 1
        } else if (kind === 'hist') {
          ctx.strokeStyle = C.LINE
          ctx.lineWidth = 1
          ctx.setLineDash([3, 3])
          ctx.beginPath()
          ctx.moveTo(8, H - 8)
          ctx.lineTo(W - 8, 8)
          ctx.stroke()
          ctx.setLineDash([])
          ctx.strokeStyle = C.CLAY
          ctx.lineWidth = 2
          ctx.beginPath()
          for (let i = 0; i <= 10; i++) {
            const x = 8 + (W - 16) * (i / 10)
            const ideal = H - 8 - (H - 16) * (i / 10)
            const y = ideal + Math.sin(i * 1.3) * 7
            i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
          }
          ctx.stroke()
        }
      },
    }
  }

  if (type === 'divider') {
    return {
      animated: false,
      draw: () => {
        ctx.clearRect(0, 0, W, H)
        if (kind === 'spectrum') {
          const pal = [C.ACCENT, C.CLAY, C.SAGE]
          for (let k = 0; k < 3; k++) {
            ctx.strokeStyle = pal[k]
            ctx.globalAlpha = 0.55
            ctx.lineWidth = 1.4
            ctx.beginPath()
            for (let x = 0; x <= W; x++) {
              let y = H * 0.5
              for (let h = 1; h <= 4; h++) y += Math.sin(x * 0.012 * h + h + k * 1.7) * ((H * 0.13) / h)
              x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
            }
            ctx.stroke()
          }
          ctx.globalAlpha = 1
        } else if (kind === 'contour') {
          ctx.strokeStyle = C.SAGE
          for (let r = 8; r < H * 0.95; r += 11) {
            ctx.globalAlpha = 0.32
            ctx.beginPath()
            ctx.ellipse(W * 0.42, H * 0.5, r * 3.2, r, 0.1, 0, 6.28)
            ctx.stroke()
          }
          ctx.strokeStyle = C.ACCENT
          for (let r = 8; r < H * 0.7; r += 13) {
            ctx.globalAlpha = 0.28
            ctx.beginPath()
            ctx.ellipse(W * 0.78, H * 0.5, r * 2.4, r * 0.85, -0.2, 0, 6.28)
            ctx.stroke()
          }
          ctx.globalAlpha = 1
        }
      },
    }
  }

  return { animated: false, draw: () => {} }
}

onMounted(() => {
  const cv = canvasRef.value
  const item = setup(cv, props.type, props.kind, props.seed)
  const start = performance.now()
  if (item.animated) {
    const tick = (now) => {
      item.draw((now - start) / 1000)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
  } else {
    item.draw(0)
  }
})

onBeforeUnmount(() => {
  if (raf) cancelAnimationFrame(raf)
})
</script>

<template>
  <canvas ref="canvasRef" :width="width" :height="height" class="canvas-viz" />
</template>

<style scoped>
.canvas-viz {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
