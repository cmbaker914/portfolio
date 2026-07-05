<script setup>
const svg =
  "data:image/svg+xml," +
  encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>"
  )
</script>

<template>
  <div class="grain" :style="{ backgroundImage: `url('${svg}')` }" />
</template>

<style scoped>
.grain {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 9998;
  opacity: 0.05;
  mix-blend-mode: multiply;
}
</style>
