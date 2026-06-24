<script setup>
import { computed } from 'vue'
import {
  state, t, money,
  goCart, openAuth, choosePay, setBonus, maxBonus, bonusApplied, payTotal, cartTotal
} from '../store'

const tr = computed(() => ({
  payTitle: t('payTitle'), authForBonus: t('authForBonus'), login: t('login'),
  useBonusLbl: t('useBonusLbl'), available: t('available'), allBtn: t('allBtn'),
  payCash: t('payCash'), payCard: t('payCard'), paySbp: t('paySbp'),
  paying: t('paying'), paid: t('paid')
}))

const methodStep = computed(() => state.payStep === 'method')
const processStep = computed(() => state.payStep === 'process')
const successStep = computed(() => state.payStep === 'success')
const isSbp = computed(() => state.payMethod === 'sbp')
const payIcon = computed(() => (state.payMethod === 'cash' ? '💵' : '💳'))
const procHint = computed(() => state.payMethod === 'cash' ? t('cashHint') : (state.payMethod === 'sbp' ? t('sbpHint') : t('cardHint')))

const payTotalLabel = computed(() => money(payTotal()))
const bonusUseLabel = computed(() => money(bonusApplied()))
const maxBonusLabel = computed(() => money(maxBonus()))

const payOptStyle = 'display:flex;align-items:center;gap:24px;height:150px;padding:0 40px;border-radius:26px;background:var(--card);border:2px solid var(--line);font-size:40px;font-weight:700;cursor:pointer;box-shadow:0 6px 18px rgba(0,0,0,.08)'
const bonusBtn = 'width:96px;height:96px;border-radius:24px;background:var(--card);border:2px solid var(--line);display:flex;align-items:center;justify-content:center;font-size:48px;cursor:pointer;color:var(--fg)'

function openAuthH (e) { if (e) e.stopPropagation && e.stopPropagation(); openAuth() }
</script>

<template>
  <div style="position:absolute;inset:0;display:flex;flex-direction:column;background:var(--bg)">
    <div @click="goCart" style="position:absolute;top:48px;left:48px;width:88px;height:88px;border-radius:50%;background:var(--card);display:flex;align-items:center;justify-content:center;font-size:44px;cursor:pointer;z-index:5">←</div>

    <!-- method selection -->
    <div v-if="methodStep" style="flex:1;overflow-y:auto;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:28px;padding:90px 80px 60px">
      <div style="font-family:'Montserrat';font-weight:800;font-size:60px">{{ tr.payTitle }}</div>
      <div style="font-size:56px;font-weight:900;color:var(--accent);font-family:'Montserrat'">{{ payTotalLabel }}</div>

      <div v-if="!state.loggedIn" @click="openAuthH" v-press="'transform:scale(.99)'" style="display:flex;align-items:center;gap:16px;width:100%;max-width:780px;padding:24px 30px;border-radius:22px;background:var(--accentSoft);border:2px dashed var(--accentLine);cursor:pointer"><span style="font-size:40px">⭐</span><span style="font-size:28px;font-weight:600;flex:1;text-align:left">{{ tr.authForBonus }}</span><span style="padding:14px 28px;border-radius:16px;background:var(--accent);color:#fff;font-size:26px;font-weight:700">{{ tr.login }}</span></div>

      <div v-if="state.loggedIn" style="width:100%;max-width:780px;padding:24px 30px;border-radius:22px;background:var(--accentSoft);border:2px solid var(--accentLine)">
        <div style="display:flex;align-items:center;gap:14px;margin-bottom:18px"><span style="font-size:36px">⭐</span><span style="font-size:28px;font-weight:600;flex:1;text-align:left">{{ tr.useBonusLbl }}</span><span style="font-size:26px;color:var(--muted)">{{ tr.available }}: {{ maxBonusLabel }}</span></div>
        <div style="display:flex;align-items:center;gap:16px">
          <div @click="setBonus((state.bonusUse || 0) - 50)" :style="bonusBtn">−</div>
          <div style="flex:1;text-align:center;font-size:44px;font-weight:800;color:var(--accent);font-family:'Montserrat'">{{ bonusUseLabel }}</div>
          <div @click="setBonus((state.bonusUse || 0) + 50)" :style="bonusBtn">+</div>
          <div @click="setBonus(maxBonus())" style="padding:0 28px;height:96px;border-radius:24px;background:var(--accent);color:#fff;display:flex;align-items:center;font-size:30px;font-weight:700;cursor:pointer">{{ tr.allBtn }}</div>
        </div>
      </div>

      <div style="display:flex;flex-direction:column;gap:20px;width:100%;max-width:780px">
        <div @click="choosePay('cash')" :style="payOptStyle"><span style="font-size:54px">💵</span><span style="flex:1;text-align:left">{{ tr.payCash }}</span><span style="font-size:40px">→</span></div>
        <div @click="choosePay('card')" :style="payOptStyle"><span style="font-size:54px">💳</span><span style="flex:1;text-align:left">{{ tr.payCard }}</span><span style="font-size:40px">→</span></div>
        <div @click="choosePay('sbp')" :style="payOptStyle"><span style="font-size:54px">📱</span><span style="flex:1;text-align:left">{{ tr.paySbp }}</span><span style="font-size:40px">→</span></div>
      </div>
    </div>

    <!-- processing -->
    <div v-if="processStep" style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:40px;padding:0 80px;text-align:center">
      <div v-if="isSbp" style="width:360px;height:360px;background:#fff;border-radius:24px;padding:26px;box-shadow:0 14px 40px rgba(0,0,0,.25)">
        <div style="width:100%;height:100%;position:relative;background:radial-gradient(#111 32%,transparent 34%);background-size:24px 24px">
          <div style="position:absolute;top:0;left:0;width:84px;height:84px;border:16px solid #111;background:#fff"></div>
          <div style="position:absolute;top:0;right:0;width:84px;height:84px;border:16px solid #111;background:#fff"></div>
          <div style="position:absolute;bottom:0;left:0;width:84px;height:84px;border:16px solid #111;background:#fff"></div>
        </div>
      </div>
      <div v-else style="width:300px;height:300px;border-radius:50%;background:var(--accentSoft);display:flex;align-items:center;justify-content:center;font-size:150px;animation:ksoGlow 1.8s infinite">{{ payIcon }}</div>
      <div style="font-family:'Montserrat';font-weight:800;font-size:54px;line-height:1.1">{{ procHint }}</div>
      <div style="font-size:60px;font-weight:900;color:var(--accent);font-family:'Montserrat'">{{ payTotalLabel }}</div>
      <div style="display:flex;align-items:center;gap:18px;color:var(--muted);font-size:32px"><div style="width:40px;height:40px;border:5px solid var(--line);border-top-color:var(--accent);border-radius:50%;animation:ksoSpin 1s linear infinite"></div>{{ tr.paying }}</div>
    </div>

    <!-- success -->
    <div v-if="successStep" style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:40px">
      <div style="width:320px;height:320px;border-radius:50%;background:#1f8a5b;display:flex;align-items:center;justify-content:center;font-size:170px;color:#fff;animation:ksoPop .5s ease">✓</div>
      <div style="font-family:'Montserrat';font-weight:900;font-size:80px;color:#1f8a5b">{{ tr.paid }}</div>
    </div>
  </div>
</template>
