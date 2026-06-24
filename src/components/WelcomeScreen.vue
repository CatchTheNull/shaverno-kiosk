<script setup>
import { computed } from 'vue'
import VideoBg from './VideoBg.vue'
import Flag from './Flag.vue'
import { state, t, chooseLang, toggleLower, VIDEO } from '../store'
import { LANG_NAME } from '../i18n'

const tr = computed(() => ({ chooseLang: t('chooseLang'), disabledMode: t('disabledMode') }))
const langs = ['ru', 'en', 'zh', 'de', 'tr']

function pick (l, e) { if (e) e.stopPropagation && e.stopPropagation(); chooseLang(l) }
function lower (e) { if (e) e.stopPropagation && e.stopPropagation(); toggleLower() }
</script>

<template>
  <div
    @click="chooseLang('ru')"
    style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;background:#0d0d0d;cursor:pointer"
  >
    <VideoBg :src="VIDEO.default" fit="contain" />
    <div style="position:absolute;inset:0;pointer-events:none;z-index:1;background:linear-gradient(180deg,rgba(0,0,0,.3) 0%,rgba(0,0,0,0) 28%,rgba(0,0,0,.08) 48%,rgba(0,0,0,.6) 78%,rgba(0,0,0,.88) 100%)"></div>

    <div style="position:absolute;bottom:560px;left:0;right:0;text-align:center;font-family:'Montserrat';font-weight:700;font-size:48px;color:#fff;text-shadow:0 2px 14px rgba(0,0,0,.8);z-index:3;animation:ksoPulse 2.6s infinite">{{ tr.chooseLang }} · Choose language</div>

    <!-- Language glass spheres -->
    <div style="position:absolute;bottom:280px;left:0;right:0;display:flex;gap:30px;z-index:3;padding:24px 40px;overflow-x:auto;justify-content:center;scroll-snap-type:x proximity">
      <div
        v-for="l in langs" :key="l"
        @click="pick(l, $event)"
        v-press="'transform:scale(.93)'"
        style="display:flex;flex-direction:column;align-items:center;gap:20px;cursor:pointer;flex:0 0 auto;scroll-snap-align:center"
      >
        <div style="width:168px;height:168px;border-radius:50%;position:relative;display:flex;align-items:center;justify-content:center;overflow:hidden;background:radial-gradient(circle at 34% 28%,rgba(255,255,255,.45),rgba(255,255,255,.12) 46%,rgba(255,255,255,.04) 74%);border:2px solid rgba(255,255,255,.55);box-shadow:0 22px 50px rgba(0,0,0,.4),inset -12px -16px 34px rgba(0,0,0,.32),inset 12px 14px 30px rgba(255,255,255,.6);backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px)">
          <div style="width:116px;height:116px;border-radius:50%;overflow:hidden;box-shadow:0 8px 18px rgba(0,0,0,.4);position:relative">
            <Flag :code="l" :size="116" />
          </div>
          <div style="position:absolute;inset:0;border-radius:50%;pointer-events:none;background:radial-gradient(circle at 30% 22%,rgba(255,255,255,.95),rgba(255,255,255,.14) 28%,rgba(255,255,255,0) 52%)"></div>
        </div>
        <div style="font-size:30px;font-weight:700;color:#fff;text-shadow:0 2px 10px rgba(0,0,0,.75)">{{ LANG_NAME[l] }}</div>
      </div>
    </div>

    <!-- Accessibility (icon only) -->
    <div
      @click="lower"
      :title="tr.disabledMode"
      v-press="'transform:translateX(-50%) scale(.94)'"
      style="position:absolute;bottom:90px;left:50%;transform:translateX(-50%);width:124px;height:124px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,.18);border:2px solid rgba(255,255,255,.45);color:#fff;backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);font-size:64px;z-index:3;cursor:pointer;box-shadow:0 10px 26px rgba(0,0,0,.35)"
    >♿</div>
  </div>
</template>
