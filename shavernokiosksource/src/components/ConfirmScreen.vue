<script setup>
import { computed } from 'vue'
import { state, t, newOrder } from '../store'

const tr = computed(() => ({
  yourNumber: t('yourNumber'), paid: t('paid'), trackOrder: t('trackOrder'), newOrder: t('newOrder')
}))
</script>

<template>
  <div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:30px;background:radial-gradient(120% 50% at 50% 30%,var(--accentSoft),transparent 60%),var(--bg);padding:0 80px;text-align:center">
    <div style="font-size:64px">🎉</div>
    <div style="font-family:'Montserrat';font-weight:700;font-size:42px;color:var(--muted)">{{ tr.yourNumber }}</div>
    <div style="font-family:'Montserrat';font-weight:900;font-size:210px;line-height:.9;background:linear-gradient(135deg,var(--accent),var(--accent2));-webkit-background-clip:text;-webkit-text-fill-color:transparent;animation:ksoPop .6s ease">{{ state.orderNumber }}</div>
    <div style="font-size:38px;font-weight:700;color:#1f8a5b">✓ {{ tr.paid }}</div>
    <div style="width:300px;height:300px;background:#fff;border-radius:24px;padding:24px;box-shadow:0 14px 40px rgba(0,0,0,.2);margin-top:12px">
      <div style="width:100%;height:100%;position:relative;background:radial-gradient(#111 32%,transparent 34%);background-size:22px 22px">
        <div style="position:absolute;top:0;left:0;width:72px;height:72px;border:14px solid #111;background:#fff"></div>
        <div style="position:absolute;top:0;right:0;width:72px;height:72px;border:14px solid #111;background:#fff"></div>
        <div style="position:absolute;bottom:0;left:0;width:72px;height:72px;border:14px solid #111;background:#fff"></div>
      </div>
    </div>
    <div style="font-size:30px;color:var(--muted);max-width:620px">{{ tr.trackOrder }}</div>
    <div @click="newOrder" v-press="'transform:scale(.97)'" style="margin-top:24px;padding:32px 80px;border-radius:28px;border:3px solid var(--line);font-size:38px;font-weight:700;cursor:pointer">{{ tr.newOrder }}</div>
  </div>
</template>
