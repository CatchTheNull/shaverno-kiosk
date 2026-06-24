<script setup>
import { ref, onMounted, watch } from 'vue'

const props = defineProps({
  src: { type: String, required: true },
  fit: { type: String, default: 'cover' } // 'cover' | 'contain'
})

const el = ref(null)

function ensure () {
  const v = el.value
  if (!v) return
  if (v.getAttribute('src') !== props.src) {
    v.setAttribute('src', props.src)
    if (v.load) v.load()
  }
  v.loop = true
  v.muted = true
  const p = v.play && v.play()
  if (p && p.catch) p.catch(() => {})
}

function onEnded () {
  const v = el.value
  try { v.currentTime = 0; const p = v.play && v.play(); if (p && p.catch) p.catch(() => {}) } catch (e) {}
}

onMounted(ensure)
watch(() => props.src, ensure)
</script>

<template>
  <video
    ref="el"
    autoplay loop muted playsinline preload="auto"
    @ended="onEnded"
    :style="{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit: fit, background:'#0d0d0d', zIndex:0 }"
  ></video>
</template>
