<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import WelcomeScreen from './components/WelcomeScreen.vue'
import OrderTypeScreen from './components/OrderTypeScreen.vue'
import MenuScreen from './components/MenuScreen.vue'
import ProductDetail from './components/ProductDetail.vue'
import ComboBuilder from './components/ComboBuilder.vue'
import CartScreen from './components/CartScreen.vue'
import PaymentScreen from './components/PaymentScreen.vue'
import ConfirmScreen from './components/ConfirmScreen.vue'
import LoyaltyAuth from './components/LoyaltyAuth.vue'
import {
  state, t, nm, money, themeVars,
  startLifecycle, stopLifecycle,
  toggleLower, keepGoing, newOrder, dismissUpsell, addUpsell
} from './store'
import { CROSS } from './data'

// ===== screen flags =====
const isWelcome = computed(() => state.screen === 'welcome')
const isType = computed(() => state.screen === 'type')
const isMenu = computed(() => state.screen === 'menu' || state.screen === 'product')
const isProduct = computed(() => state.screen === 'product')
const isCombo = computed(() => state.screen === 'combo')
const isCart = computed(() => state.screen === 'cart')
const isPay = computed(() => state.screen === 'pay')
const isConfirm = computed(() => state.screen === 'confirm')

const frameStyle = computed(() => themeVars() + ';transform:scale(' + scale.value + ')')
const shiftStyle = computed(() => (state.lowered ? 'transform:scale(.84);transform-origin:bottom center' : ''))

const tr = computed(() => ({
  raiseScreen: t('raiseScreen'), loweredBanner: t('loweredBanner'),
  addToOrder: t('addToOrder'), add: t('add'), noThanks: t('noThanks'),
  stillHere: t('stillHere'), resetIn: t('resetIn'), sec: t('sec'),
  yesContinue: t('yesContinue'), newOrder: t('newOrder')
}))

// popup upsell: cross-sells not already in the cart
const popupUpsell = computed(() => {
  const usedIds = state.cart.map(c => c.pid)
  return CROSS.filter(u => !usedIds.includes(u.id)).slice(0, 3).map(u => ({
    id: u.id, raw: u, name: nm(u), icon: u.icon, priceLabel: money(u.price)
  }))
})

// ===== scale-to-fit =====
const scale = ref(1)
function fit () {
  scale.value = Math.min(window.innerWidth / 1080, window.innerHeight / 1920)
}

onMounted(() => {
  fit()
  window.addEventListener('resize', fit)
  startLifecycle()
})
onUnmounted(() => {
  window.removeEventListener('resize', fit)
  stopLifecycle()
})
</script>

<template>
  <div class="kiosk-viewport">
    <div class="kiosk-frame" :style="frameStyle">

      <!-- shiftable content (accessibility lower) -->
      <div :style="shiftStyle" style="position:absolute;inset:0">
        <WelcomeScreen v-if="isWelcome" />
        <OrderTypeScreen v-if="isType" />
        <MenuScreen v-if="isMenu" />
        <ProductDetail v-if="isProduct" />
        <ComboBuilder v-if="isCombo" />
        <CartScreen v-if="isCart" />
        <PaymentScreen v-if="isPay" />
        <ConfirmScreen v-if="isConfirm" />
      </div>

      <!-- lowered banner -->
      <div v-if="state.lowered" @click="toggleLower" style="position:absolute;top:0;left:0;right:0;height:90px;display:flex;align-items:center;justify-content:center;gap:18px;background:var(--accent);color:#fff;font-size:30px;font-weight:700;z-index:40;cursor:pointer">↥ {{ tr.raiseScreen }} · {{ tr.loweredBanner }}</div>

      <!-- toast -->
      <div v-if="state.toast" style="position:absolute;bottom:160px;left:50%;transform:translateX(-50%);padding:26px 44px;border-radius:22px;background:var(--fg);color:var(--bg);font-size:32px;font-weight:700;z-index:60;box-shadow:0 12px 40px rgba(0,0,0,.4);animation:ksoRise .3s ease">{{ state.toast }}</div>

      <!-- upsell popup -->
      <div v-if="state.showUpsell" style="position:absolute;inset:0;background:rgba(0,0,0,.55);backdrop-filter:blur(6px);display:flex;align-items:flex-end;z-index:70">
        <div style="width:100%;background:var(--surface);border-radius:40px 40px 0 0;padding:48px;animation:ksoRise .35s ease">
          <div style="width:80px;height:8px;border-radius:4px;background:var(--line);margin:0 auto 30px"></div>
          <div style="font-family:'Montserrat';font-weight:800;font-size:54px;text-align:center">✨ {{ tr.addToOrder }}</div>
          <div style="display:flex;gap:24px;margin:40px 0;justify-content:center">
            <div v-for="u in popupUpsell" :key="u.id" @click="addUpsell(u.raw)" v-press="'transform:scale(.96)'" style="flex:1;max-width:280px;text-align:center;padding:30px 20px;background:var(--card);border-radius:28px;border:2px solid var(--line);cursor:pointer">
              <div style="font-size:90px">{{ u.icon }}</div>
              <div style="font-size:32px;font-weight:700;margin-top:14px">{{ u.name }}</div>
              <div style="font-size:38px;font-weight:800;color:var(--accent);margin-top:8px">+{{ u.priceLabel }}</div>
              <div style="margin-top:18px;padding:18px 0;border-radius:18px;background:linear-gradient(135deg,var(--accent),var(--accent2));color:#fff;font-size:30px;font-weight:700">{{ tr.add }}</div>
            </div>
          </div>
          <div @click="dismissUpsell" v-press="'transform:scale(.99)'" style="height:130px;border-radius:24px;border:3px solid var(--line);display:flex;align-items:center;justify-content:center;font-size:38px;font-weight:700;color:var(--muted);cursor:pointer">{{ tr.noThanks }} →</div>
        </div>
      </div>

      <!-- idle dialog -->
      <div v-if="state.idle" style="position:absolute;inset:0;background:rgba(0,0,0,.7);backdrop-filter:blur(8px);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:50px;z-index:90;padding:0 80px;text-align:center">
        <div style="font-size:140px;animation:ksoBob 1.6s infinite">👋</div>
        <div style="font-family:'Montserrat';font-weight:900;font-size:80px;color:#fff">{{ tr.stillHere }}</div>
        <div style="font-size:40px;color:rgba(255,255,255,.7)">{{ tr.resetIn }} <b style="color:var(--accent)">{{ state.idleCount }}</b> {{ tr.sec }}</div>
        <div style="display:flex;gap:30px;width:100%;max-width:820px;margin-top:20px">
          <div @click="keepGoing" v-press="'transform:scale(.98)'" style="flex:1;height:180px;border-radius:28px;background:linear-gradient(135deg,var(--accent),var(--accent2));color:#fff;display:flex;align-items:center;justify-content:center;font-size:42px;font-weight:800;box-shadow:0 12px 36px var(--accentLine)">{{ tr.yesContinue }}</div>
          <div @click="newOrder" v-press="'transform:scale(.98)'" style="flex:1;height:180px;border-radius:28px;border:3px solid rgba(255,255,255,.3);color:#fff;display:flex;align-items:center;justify-content:center;font-size:40px;font-weight:700">{{ tr.newOrder }}</div>
        </div>
      </div>

      <!-- loyalty auth -->
      <LoyaltyAuth v-if="state.auth && state.auth.open" />

    </div>
  </div>
</template>
