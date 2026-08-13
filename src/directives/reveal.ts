import type { Directive, DirectiveBinding } from 'vue'

// v-reveal — fades / slides an element in the first time it scrolls into view.
//
// Usage:
//   v-reveal                     default fade-up
//   v-reveal="{ delay: 120 }"    stagger by 120ms
//   v-reveal="{ y: 40, delay: n * 80 }"  custom offset + stagger
//   v-reveal:left                slide in from the left (also :right, :up, :down, :none)
//
// Honours prefers-reduced-motion: the element is shown immediately, unanimated.

interface RevealOptions {
  /** ms to wait before animating in (for staggering siblings) */
  delay?: number
  /** vertical travel distance in px (ignored when a direction arg is given) */
  y?: number
  /** how much of the element must be visible before it fires, 0–1 */
  threshold?: number
}

type Direction = 'up' | 'down' | 'left' | 'right' | 'none'

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

function offsetFor(dir: Direction, y: number): string {
  switch (dir) {
    case 'up':
      return `translate3d(0, ${y}px, 0)`
    case 'down':
      return `translate3d(0, ${-y}px, 0)`
    case 'left':
      return `translate3d(${y}px, 0, 0)`
    case 'right':
      return `translate3d(${-y}px, 0, 0)`
    case 'none':
      return 'none'
  }
}

// Share one observer across every element on the page.
let observer: IntersectionObserver | null = null
const revealMap = new WeakMap<Element, () => void>()

function getObserver(threshold: number): IntersectionObserver {
  if (observer) return observer
  observer = new IntersectionObserver(
    (entries, obs) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        const run = revealMap.get(entry.target)
        run?.()
        revealMap.delete(entry.target)
        obs.unobserve(entry.target)
      }
    },
    { threshold, rootMargin: '0px 0px -8% 0px' },
  )
  return observer
}

export const reveal: Directive<HTMLElement, RevealOptions | undefined> = {
  mounted(el, binding: DirectiveBinding<RevealOptions | undefined>) {
    const opts = binding.value ?? {}
    const dir = (binding.arg as Direction) ?? 'up'
    const y = opts.y ?? 22
    const delay = opts.delay ?? 0
    const threshold = opts.threshold ?? 0.15

    if (prefersReducedMotion()) {
      el.style.opacity = '1'
      return
    }

    // Initial hidden state.
    el.style.opacity = '0'
    el.style.transform = offsetFor(dir, y)
    el.style.willChange = 'opacity, transform'

    revealMap.set(el, () => {
      el.style.transition =
        'opacity 720ms cubic-bezier(0.22, 1, 0.36, 1), transform 720ms cubic-bezier(0.22, 1, 0.36, 1)'
      el.style.transitionDelay = `${delay}ms`
      // Next frame so the transition actually runs from the hidden state.
      requestAnimationFrame(() => {
        el.style.opacity = '1'
        el.style.transform = 'none'
      })
      const cleanup = () => {
        el.style.willChange = ''
        el.style.transition = ''
        el.style.transitionDelay = ''
        el.removeEventListener('transitionend', cleanup)
      }
      el.addEventListener('transitionend', cleanup)
    })

    getObserver(threshold).observe(el)
  },
  unmounted(el) {
    revealMap.delete(el)
    observer?.unobserve(el)
  },
}

export default reveal
