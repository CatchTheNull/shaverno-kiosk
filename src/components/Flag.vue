<script setup>
import { computed } from 'vue'

const props = defineProps({
  code: { type: String, required: true },
  size: { type: Number, default: 116 }
})

const detail = computed(() => props.size >= 100) // full union-jack diagonals + multi-star CN only when large
const px = f => Math.max(1, Math.round(props.size * f)) + 'px'
const crescentSize = computed(() => Math.round(props.size * 0.48) + 'px')
const starMain = computed(() => Math.round(props.size * 0.27) + 'px')
const starSmall = computed(() => Math.round(props.size * 0.11) + 'px')
</script>

<template>
  <div :style="{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }">
    <!-- RU -->
    <div v-if="code === 'ru'" style="position:absolute;inset:0;display:flex;flex-direction:column">
      <div style="flex:1;background:#fff"></div>
      <div style="flex:1;background:#0039A6"></div>
      <div style="flex:1;background:#D52B1E"></div>
    </div>

    <!-- DE -->
    <div v-else-if="code === 'de'" style="position:absolute;inset:0;display:flex;flex-direction:column">
      <div style="flex:1;background:#000"></div>
      <div style="flex:1;background:#DD0000"></div>
      <div style="flex:1;background:#FFCE00"></div>
    </div>

    <!-- EN (Union Jack) -->
    <template v-else-if="code === 'en'">
      <div style="position:absolute;inset:0;background:#012169"></div>
      <template v-if="detail">
        <div :style="{ position:'absolute', top:'50%', left:'-25%', width:'150%', height: px(0.112), background:'#fff', transform:'rotate(33deg)', transformOrigin:'center' }"></div>
        <div :style="{ position:'absolute', top:'50%', left:'-25%', width:'150%', height: px(0.112), background:'#fff', transform:'rotate(-33deg)', transformOrigin:'center' }"></div>
        <div :style="{ position:'absolute', top:'50%', left:'-25%', width:'150%', height: px(0.052), background:'#C8102E', transform:'rotate(33deg)', transformOrigin:'center' }"></div>
        <div :style="{ position:'absolute', top:'50%', left:'-25%', width:'150%', height: px(0.052), background:'#C8102E', transform:'rotate(-33deg)', transformOrigin:'center' }"></div>
      </template>
      <div :style="{ position:'absolute', top:0, bottom:0, left:'50%', width: px(0.19), marginLeft:'-'+px(0.095), background:'#fff' }"></div>
      <div :style="{ position:'absolute', left:0, right:0, top:'50%', height: px(0.19), marginTop:'-'+px(0.095), background:'#fff' }"></div>
      <div :style="{ position:'absolute', top:0, bottom:0, left:'50%', width: px(0.103), marginLeft:'-'+px(0.051), background:'#C8102E' }"></div>
      <div :style="{ position:'absolute', left:0, right:0, top:'50%', height: px(0.103), marginTop:'-'+px(0.051), background:'#C8102E' }"></div>
    </template>

    <!-- ZH -->
    <template v-else-if="code === 'zh'">
      <div style="position:absolute;inset:0;background:#DE2910"></div>
      <span :style="{ position:'absolute', left:'15%', top:'21%', color:'#FFDE00', lineHeight:1, fontSize: starMain }">★</span>
      <template v-if="detail">
        <span :style="{ position:'absolute', left:'45%', top:'14%', color:'#FFDE00', fontSize: starSmall }">★</span>
        <span :style="{ position:'absolute', left:'53%', top:'29%', color:'#FFDE00', fontSize: starSmall }">★</span>
        <span :style="{ position:'absolute', left:'45%', top:'46%', color:'#FFDE00', fontSize: starSmall }">★</span>
      </template>
    </template>

    <!-- TR -->
    <template v-else-if="code === 'tr'">
      <div style="position:absolute;inset:0;background:#E30A17;display:flex;align-items:center;justify-content:center">
        <span :style="{ color:'#fff', lineHeight:1, fontSize: crescentSize }">☪</span>
      </div>
    </template>
  </div>
</template>
