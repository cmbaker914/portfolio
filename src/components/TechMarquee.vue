<script setup lang="ts">
import { computed, reactive, watchEffect } from 'vue'
import { Icon, loadIcon } from '@iconify/vue'
import type { Technology } from '../data/content.js'

const props = defineProps<{ items: Technology[] }>()

// Alternate items between the two rows so each gets a mix of groups.
const rows = computed(() => [
  props.items.filter((_, i) => i % 2 === 0),
  props.items.filter((_, i) => i % 2 === 1),
])

// Each track holds its row four times and scrolls by half its width, so the
// second half lands exactly where the first began — a seamless loop that still
// fills wide screens when a row is short.
const COPIES = 4

// Tint per icon name, picked from the icon's own SVG once it has loaded.
const derived = reactive<Record<string, string>>({})

function saturationLightness(hex: string): [number, number] {
  let h = hex.slice(1)
  if (h.length === 3) h = [...h].map((c) => c + c).join('')
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255)
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const l = (max + min) / 2
  const s = max === min ? 0 : (max - min) / (1 - Math.abs(2 * l - 1))
  return [s, l]
}

// The most vivid colour in the SVG: saturated, and neither near-black nor
// near-white (so dark outlines and white highlights don't win).
function vividColor(body: string): string | undefined {
  const hexes = body.match(/#(?:[0-9a-f]{6}|[0-9a-f]{3})\b/gi) ?? []
  let best: string | undefined
  let bestScore = 0
  for (const hex of hexes) {
    const [s, l] = saturationLightness(hex)
    const score = s * (1 - Math.abs(l - 0.5) * 1.6)
    if (score > bestScore) {
      bestScore = score
      best = hex
    }
  }
  return best
}

watchEffect(() => {
  for (const t of props.items) {
    if (t.color || t.icon in derived) continue
    loadIcon(t.icon)
      .then((data) => {
        const c = vividColor(data.body)
        if (c) derived[t.icon] = c
      })
      .catch(() => {})
  }
})

const tint = (t: Technology) => t.color ?? derived[t.icon] ?? 'var(--accent)'
</script>

<template>
  <div class="marquee">
    <div
      v-for="(row, r) in rows"
      :key="r"
      class="marquee-row"
      :class="{ reverse: r % 2 === 1 }"
      :style="{ '--duration': `${row.length * 5}s` }"
    >
      <ul class="marquee-track">
        <template v-for="copy in COPIES" :key="copy">
          <li
            v-for="t in row"
            :key="`${copy}-${t.name}`"
            class="tech"
            :style="{ '--c': tint(t) }"
            :aria-hidden="copy > 1 ? 'true' : undefined"
          >
            <span class="tech-badge">
              <Icon :icon="t.icon" class="tech-icon" aria-hidden="true" />
            </span>
            <span class="tech-name">{{ t.name }}</span>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.marquee {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

/* Vertical padding leaves room for the chips' hover glow and lift, which
   `overflow: hidden` would otherwise clip; the negative margin cancels it out
   of the layout. That padding makes neighbouring rows overlap, so the rows
   ignore the pointer and only the chips take it (`:hover` on the row still
   fires via its chips, which keeps pause-on-hover working). */
.marquee-row {
  overflow: hidden;
  padding: 36px 0;
  margin: -36px 0;
  pointer-events: none;
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
  mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
}

.marquee-track {
  display: flex;
  width: max-content;
  margin: 0;
  padding: 0;
  list-style: none;
  animation: marquee var(--duration) linear infinite;
}

.reverse .marquee-track {
  animation-direction: reverse;
}

.marquee-row:hover .marquee-track {
  animation-play-state: paused;
}

@keyframes marquee {
  to {
    transform: translateX(-50%);
  }
}

/* Every chip is washed in its icon's colour (`--c`): a soft gradient fill and
   tinted border, with a coloured glow added on hover.
   Spacing is a right margin rather than flex `gap` so every item (including
   the last) carries the same trailing space — keeps the -50% loop exact. */
.tech {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-right: 14px;
  padding: 8px 18px 8px 8px;
  border: 1px solid color-mix(in srgb, var(--c) 35%, var(--line));
  border-radius: var(--radius);
  background: linear-gradient(
    135deg,
    color-mix(in srgb, var(--c) 22%, var(--paper)),
    color-mix(in srgb, var(--c) 6%, var(--paper)) 70%
  );
  color: var(--ink);
  white-space: nowrap;
  pointer-events: auto;
  transition: transform 300ms ease, box-shadow 300ms ease, border-color 300ms ease;
}

.tech:hover {
  transform: translateY(-3px);
  border-color: var(--c);
  box-shadow:
    0 10px 30px -8px var(--c),
    0 0 0 3px color-mix(in srgb, var(--c) 18%, transparent);
}

.tech-badge {
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  /* A light plate behind the logo keeps dark logos legible in dark mode. */
  background: radial-gradient(circle, #fff 55%, color-mix(in srgb, var(--c) 35%, #fff));
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--c) 30%, transparent);
  flex-shrink: 0;
}

.tech-icon {
  width: 22px;
  height: 22px;
  /* Single-colour icons draw in currentColor; keep them dark on the light plate. */
  color: #2e2c29;
}

.tech-name {
  font: 600 15px var(--font-display);
  letter-spacing: -0.01em;
}

/* No scrolling: show the list once, wrapped. */
@media (prefers-reduced-motion: reduce) {
  .marquee-row {
    -webkit-mask-image: none;
    mask-image: none;
  }

  .marquee-track {
    width: auto;
    flex-wrap: wrap;
    row-gap: 12px;
    animation: none;
  }

  .tech[aria-hidden='true'] {
    display: none;
  }

  .tech,
  .tech:hover {
    transform: none;
  }
}
</style>
