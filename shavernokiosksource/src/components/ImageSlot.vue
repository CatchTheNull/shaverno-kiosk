<script setup>
import { computed } from 'vue'

const props = defineProps({
  src: { type: String, default: '' },
  emoji: { type: String, default: '' },
  shape: { type: String, default: 'rect' }, // 'rect' | 'circle'
  placeholder: { type: String, default: '' },
  emojiSize: { type: String, default: '56%' }
})

const radius = computed(() => (props.shape === 'circle' ? '50%' : '0'))
</script>

<template>
  <!-- width/height come from the parent's inline :style (attribute fallthrough) -->
  <div
    class="image-slot"
    :style="{ borderRadius: radius, position: 'relative', overflow: 'hidden', display: 'block' }"
  >
    <img
      v-if="src"
      :src="src"
      :alt="placeholder"
      style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block"
    />
    <div
      v-else-if="emoji"
      style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;line-height:1"
      :style="{ fontSize: emojiSize }"
    >{{ emoji }}</div>
    <div
      v-else
      style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;text-align:center;padding:8%;color:var(--muted2);font-size:22px;font-weight:600;background:var(--card)"
    >{{ placeholder }}</div>
  </div>
</template>
