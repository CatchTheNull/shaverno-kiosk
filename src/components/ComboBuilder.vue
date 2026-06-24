<script setup>
import { computed } from 'vue'
import {
  state, t, nm, money, go,
  comboSet, comboPrice, comboOldPrice, comboReady, comboExtra, addCombo
} from '../store'
import { COMBO, COMBO_STEP_META, COMBO_DISCOUNT } from '../data'

const tr = computed(() => ({
  buildCombo: t('buildCombo'), pickStep: t('pickStep'),
  extraLbl: t('extraLbl'), yourCombo: t('yourCombo'), addCombo: t('addCombo')
}))

const preview = computed(() => COMBO_STEP_META.map(m => {
  const o = COMBO[m.g].find(x => x.id === state.combo[m.g])
  return {
    g: m.g, icon: o ? o.icon : '?',
    boxStyle: (o ? 'background:var(--card);border:3px solid var(--accent)' : 'background:transparent;border:3px dashed var(--accentLine);color:var(--muted2)') +
      ';width:96px;height:96px;border-radius:24px;display:flex;align-items:center;justify-content:center;font-size:46px;flex-shrink:0'
  }
}))

const oBase = 'flex:0 0 200px;text-align:center;padding:22px 14px;border-radius:20px;border:2px solid var(--line);background:var(--card);cursor:pointer'
const oSel = 'flex:0 0 200px;text-align:center;padding:22px 14px;border-radius:20px;border:3px solid var(--accent);background:var(--accentSoft);cursor:pointer'

const steps = computed(() => COMBO_STEP_META.map((m, idx) => {
  const chosen = state.combo[m.g]
  const isActive = !chosen
  return {
    g: m.g, num: idx + 1, title: nm(m), hint: isActive ? ('← ' + tr.value.pickStep) : '',
    boxStyle: isActive
      ? 'margin-bottom:22px;padding:24px;border-radius:24px;background:var(--accentSoft);border:1px solid var(--accentLine)'
      : 'margin-bottom:22px;padding:24px;border-radius:24px;border:1px solid var(--line)',
    numStyle: 'width:56px;height:56px;border-radius:50%;background:' + (chosen ? '#2f9e54' : 'var(--accent)') + ';color:#fff;font-size:30px;font-weight:800;display:flex;align-items:center;justify-content:center;flex-shrink:0',
    titleStyle: 'font-size:34px;font-weight:700;color:var(--fg)',
    options: COMBO[m.g].map(o => ({
      id: o.id, name: nm(o), icon: o.icon, priceLabel: o.price ? ('+' + money(o.price)) : '',
      style: chosen === o.id ? oSel : oBase
    }))
  }
}))

const ready = computed(() => comboReady())
const ctaStyle = computed(() => ready.value
  ? 'height:170px;border-radius:28px;background:linear-gradient(135deg,var(--accent),var(--accent2));color:#fff;display:flex;align-items:center;justify-content:center;font-size:44px;font-weight:800;box-shadow:0 12px 36px var(--accentLine);cursor:pointer'
  : 'height:170px;border-radius:28px;background:var(--card);color:var(--muted2);display:flex;align-items:center;justify-content:center;font-size:40px;font-weight:700;border:2px solid var(--line)')
const ctaLabel = computed(() => ready.value ? (tr.value.addCombo + ' 🎁') : (tr.value.pickStep + '…'))

const extra = computed(() => comboExtra())
const priceLabel = computed(() => money(comboPrice()))
const oldLabel = computed(() => money(comboOldPrice()))
const extraLabel = computed(() => money(extra.value))
</script>

<template>
  <div style="position:absolute;inset:0;display:flex;flex-direction:column;background:var(--bg)">
    <div style="height:150px;flex-shrink:0;display:flex;align-items:center;gap:24px;padding:0 48px;border-bottom:1px solid var(--line)">
      <div @click="go('menu')" style="width:80px;height:80px;border-radius:50%;background:var(--card);display:flex;align-items:center;justify-content:center;font-size:40px;cursor:pointer">←</div>
      <div style="font-family:'Montserrat';font-weight:800;font-size:48px">{{ tr.buildCombo }} 🎁</div>
      <div style="margin-left:auto;padding:14px 28px;border-radius:18px;background:var(--accentSoft);color:var(--accent);font-size:32px;font-weight:700">−{{ COMBO_DISCOUNT }} ₽</div>
    </div>

    <!-- preview row -->
    <div style="flex-shrink:0;display:flex;align-items:center;justify-content:center;gap:16px;padding:16px 48px;border-bottom:1px solid var(--line);background:var(--accentSoft)">
      <div v-for="p in preview" :key="p.g" :style="p.boxStyle">{{ p.icon }}</div>
    </div>

    <div style="flex:1;overflow-y:auto;padding:32px 48px">
      <div v-for="st in steps" :key="st.g" :style="st.boxStyle">
        <div style="display:flex;align-items:center;gap:16px;margin-bottom:18px">
          <div :style="st.numStyle">{{ st.num }}</div>
          <span :style="st.titleStyle">{{ st.title }}</span>
          <span style="margin-left:auto;font-size:24px;color:var(--accent)">{{ st.hint }}</span>
        </div>
        <div style="display:flex;gap:18px;overflow-x:auto;padding-bottom:8px">
          <div v-for="o in st.options" :key="o.id" @click="comboSet(st.g, o.id)" :style="o.style">
            <div style="font-size:70px">{{ o.icon }}</div>
            <div style="font-size:26px;font-weight:600;margin-top:8px">{{ o.name }}</div>
            <div style="font-size:22px;color:var(--muted)">{{ o.priceLabel }}</div>
          </div>
        </div>
      </div>
    </div>

    <div style="flex-shrink:0;background:var(--surface);border-top:1px solid var(--line);padding:26px 48px;box-shadow:0 -10px 40px rgba(0,0,0,.18)">
      <div v-if="extra > 0" style="display:flex;align-items:center;margin-bottom:12px"><span style="font-size:28px;color:var(--muted)">{{ tr.extraLbl }}</span><span style="margin-left:auto;font-size:32px;font-weight:700;color:var(--accent)">+{{ extraLabel }}</span></div>
      <div style="display:flex;align-items:center;margin-bottom:18px">
        <span style="font-size:30px;color:var(--muted)">{{ tr.yourCombo }}</span>
        <span style="margin-left:auto;font-size:48px;font-weight:800;color:var(--accent);font-family:'Montserrat'">{{ priceLabel }} <span style="text-decoration:line-through;color:var(--muted2);font-size:30px">{{ oldLabel }}</span></span>
      </div>
      <div @click="addCombo" v-press="'transform:scale(.99)'" :style="ctaStyle">{{ ctaLabel }}</div>
    </div>
  </div>
</template>
