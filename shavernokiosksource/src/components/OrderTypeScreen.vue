<script setup>
import { computed } from 'vue'
import { state, t, setOtype, go } from '../store'

const tr = computed(() => ({
  howReceive: t('howReceive'), here: t('here'), toGo: t('toGo'),
  hereDesc: t('hereDesc'), toGoDesc: t('toGoDesc')
}))

function pickHere () { setOtype('here'); go('menu') }
function pickToGo () { setOtype('togo'); go('menu') }
</script>

<template>
  <div style="position:absolute;inset:0;display:flex;flex-direction:column;background:var(--bg)">
    <div style="padding:90px 48px 0;text-align:center">
      <div style="font-family:'Montserrat';font-weight:900;font-size:44px;background:linear-gradient(135deg,var(--accent),var(--accent2));-webkit-background-clip:text;-webkit-text-fill-color:transparent">ШАВЕРНО</div>
      <div style="font-family:'Montserrat';font-weight:800;font-size:60px;margin-top:120px;line-height:1.1">{{ tr.howReceive }}</div>
    </div>
    <div style="flex:1;display:flex;flex-direction:row;gap:40px;padding:80px 48px;align-items:center;justify-content:center">
      <div @click="pickHere" v-press="'transform:scale(.98)'" style="width:440px;height:480px;border-radius:34px;border:3px solid var(--accent);background:linear-gradient(160deg,var(--accentSoft),transparent);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:34px;padding:60px 36px;cursor:pointer;box-shadow:0 0 60px var(--accentLine)">
        <div style="font-size:150px;line-height:1">🍽️</div>
        <div style="font-size:54px;font-weight:800;font-family:'Montserrat'">{{ tr.here }}</div>
        <div style="font-size:28px;color:var(--muted);text-align:center">{{ tr.hereDesc }}</div>
      </div>
      <div @click="pickToGo" v-press="'transform:scale(.98)'" style="width:440px;height:480px;border-radius:34px;border:3px solid var(--line);background:var(--card);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:34px;padding:60px 36px;cursor:pointer">
        <div style="font-size:150px;line-height:1">🛍️</div>
        <div style="font-size:54px;font-weight:800;font-family:'Montserrat'">{{ tr.toGo }}</div>
        <div style="font-size:28px;color:var(--muted);text-align:center">{{ tr.toGoDesc }}</div>
      </div>
    </div>
  </div>
</template>
