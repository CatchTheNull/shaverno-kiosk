<script setup>
import { computed } from 'vue'
import { state, t, money, fmtPhone, closeAuth, authDigit, authBack, authSend } from '../store'

const tr = computed(() => ({
  loyaltyTitle: t('loyaltyTitle'), enterPhone: t('enterPhone'), getCode: t('getCode'),
  enterCode: t('enterCode'), codeSentTo: t('codeSentTo'), welcomeBack: t('welcomeBack'),
  yourBonuses: t('yourBonuses'), doneBtn: t('doneBtn')
}))

const a = computed(() => state.auth)
const phoneStep = computed(() => a.value.step === 'phone')
const otpStep = computed(() => a.value.step === 'otp')
const doneStep = computed(() => a.value.step === 'done')
const inputStep = computed(() => a.value.step === 'phone' || a.value.step === 'otp')
const phoneDisplay = computed(() => fmtPhone(a.value.phone))
const codeBoxes = computed(() => [0, 1, 2, 3].map(i => ({
  ch: a.value.code[i] || '',
  style: ((a.value.code[i]) ? 'background:var(--accentSoft);border:3px solid var(--accent)' : 'background:var(--card);border:3px solid var(--line)') +
    ';width:118px;height:140px;border-radius:24px;display:flex;align-items:center;justify-content:center;font-size:68px;font-weight:800;color:var(--fg)'
})))
const canSend = computed(() => a.value.phone.length >= 10)
const sendStyle = computed(() => (canSend.value
  ? 'height:130px;border-radius:24px;background:linear-gradient(135deg,var(--accent),var(--accent2));color:#fff;box-shadow:0 10px 30px var(--accentLine)'
  : 'height:130px;border-radius:24px;background:var(--card);color:var(--muted2);border:2px solid var(--line)') +
  ';display:flex;align-items:center;justify-content:center;font-size:38px;font-weight:800;cursor:pointer;margin-top:22px')

const keyStyle = 'height:116px;border-radius:22px;background:var(--card);border:2px solid var(--line);display:flex;align-items:center;justify-content:center;font-size:52px;font-weight:700;cursor:pointer;color:var(--fg)'
const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
</script>

<template>
  <div style="position:absolute;inset:0;background:rgba(0,0,0,.6);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;z-index:95;padding:50px">
    <div style="width:860px;background:var(--surface);border-radius:44px;padding:48px;box-shadow:0 40px 110px rgba(0,0,0,.6);position:relative">
      <div @click="closeAuth" style="position:absolute;top:26px;right:26px;width:78px;height:78px;border-radius:50%;background:var(--card);display:flex;align-items:center;justify-content:center;font-size:38px;color:var(--muted);cursor:pointer">✕</div>

      <template v-if="phoneStep">
        <div style="text-align:center;font-size:72px">⭐</div>
        <div style="text-align:center;font-family:'Montserrat';font-weight:800;font-size:46px;margin-top:6px">{{ tr.loyaltyTitle }}</div>
        <div style="text-align:center;font-size:30px;color:var(--muted);margin-top:8px">{{ tr.enterPhone }}</div>
        <div style="text-align:center;font-family:'Montserrat';font-weight:800;font-size:60px;margin:24px 0 6px">{{ phoneDisplay }}</div>
      </template>

      <template v-if="otpStep">
        <div style="text-align:center;font-size:72px">✉️</div>
        <div style="text-align:center;font-family:'Montserrat';font-weight:800;font-size:44px;margin-top:6px">{{ tr.enterCode }}</div>
        <div style="text-align:center;font-size:26px;color:var(--muted);margin-top:8px">{{ tr.codeSentTo }} {{ phoneDisplay }}</div>
        <div style="display:flex;gap:22px;justify-content:center;margin:28px 0 6px"><div v-for="(b, idx) in codeBoxes" :key="idx" :style="b.style">{{ b.ch }}</div></div>
      </template>

      <template v-if="inputStep">
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:20px">
          <div v-for="k in keys" :key="k" @click="authDigit(k)" :style="keyStyle">{{ k }}</div>
          <div @click="authBack" :style="keyStyle">⌫</div>
          <div @click="authDigit('0')" :style="keyStyle">0</div>
          <div></div>
        </div>
      </template>

      <div v-if="phoneStep" @click="authSend" :style="sendStyle">{{ tr.getCode }}</div>

      <template v-if="doneStep">
        <div style="text-align:center;font-size:120px">🎉</div>
        <div style="text-align:center;font-family:'Montserrat';font-weight:900;font-size:54px">{{ tr.welcomeBack }}</div>
        <div style="text-align:center;font-size:30px;color:var(--muted);margin-top:14px">{{ tr.yourBonuses }}</div>
        <div style="text-align:center;font-family:'Montserrat';font-weight:900;font-size:88px;color:var(--accent);margin-top:4px">350 ₽</div>
        <div @click="closeAuth" style="height:140px;border-radius:24px;background:linear-gradient(135deg,var(--accent),var(--accent2));color:#fff;display:flex;align-items:center;justify-content:center;font-size:40px;font-weight:800;margin-top:28px;cursor:pointer">{{ tr.doneBtn }}</div>
      </template>
    </div>
  </div>
</template>
