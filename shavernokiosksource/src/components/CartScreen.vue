<script setup>
import { computed } from 'vue'
import {
  state, t, nm, money,
  go, setOtype, clearCart, cartQty, removeLine, editLine, addCross, goPay,
  cartCount, cartTotal
} from '../store'
import { CROSS } from '../data'

const tr = computed(() => ({
  cartTitle: t('cartTitle'), clear: t('clear'), here: t('here'), toGo: t('toGo'),
  yourBonuses: t('yourBonuses'), editItem: t('editItem'), often: t('often'),
  add: t('add'), positions: t('positions'), total: t('total'), pay: t('pay')
}))

const otype = computed(() => state.otype || 'here')
function segC (on) {
  return on
    ? 'flex:1;display:flex;align-items:center;justify-content:center;gap:14px;padding:26px;border-radius:24px;font-size:34px;font-weight:700;cursor:pointer;white-space:nowrap;background:linear-gradient(135deg,var(--accent),var(--accent2));color:#fff;box-shadow:0 8px 24px var(--accentLine)'
    : 'flex:1;display:flex;align-items:center;justify-content:center;gap:14px;padding:26px;border-radius:24px;font-size:34px;font-weight:700;cursor:pointer;white-space:nowrap;background:var(--card);color:var(--muted);border:2px solid var(--line)'
}

const items = computed(() => state.cart.map(c => ({
  key: c.key, name: c.name, sub: c.sub, icon: c.icon, qty: c.qty,
  priceLabel: money(c.price * c.qty), editable: !!(c.edit || c.comboData), line: c
})))
const upsell = computed(() => CROSS.slice(0, 4).map(u => ({ id: u.id, raw: u, name: nm(u), icon: u.icon, priceLabel: money(u.price) })))
const hasUpsell = computed(() => upsell.value.length > 0)
const bonusLabel = computed(() => money(state.bonus || 0))
const totalLabel = computed(() => money(cartTotal()))
</script>

<template>
  <div style="position:absolute;inset:0;display:flex;flex-direction:column;background:var(--bg)">
    <div style="height:150px;flex-shrink:0;display:flex;align-items:center;gap:24px;padding:0 48px;border-bottom:1px solid var(--line)">
      <div @click="go('menu')" style="width:80px;height:80px;border-radius:50%;background:var(--card);display:flex;align-items:center;justify-content:center;font-size:40px;cursor:pointer">←</div>
      <div style="font-family:'Montserrat';font-weight:800;font-size:48px">{{ tr.cartTitle }}</div>
      <div @click="clearCart" style="margin-left:auto;font-size:28px;color:var(--muted);cursor:pointer">{{ tr.clear }}</div>
    </div>

    <div style="display:flex;gap:14px;padding:24px 48px 0">
      <div @click="setOtype('here')" :style="segC(otype === 'here')">🍽️ {{ tr.here }}</div>
      <div @click="setOtype('togo')" :style="segC(otype === 'togo')">🛍️ {{ tr.toGo }}</div>
    </div>

    <div v-if="state.loggedIn" style="margin:20px 48px 0;display:flex;align-items:center;gap:16px;padding:22px 30px;border-radius:22px;background:var(--accentSoft);border:1px solid var(--accentLine)">
      <span style="font-size:40px">⭐</span>
      <span style="font-size:30px;font-weight:600;color:var(--fg)">{{ tr.yourBonuses }}</span>
      <span style="margin-left:auto;font-size:38px;font-weight:800;color:var(--accent);font-family:'Montserrat'">{{ bonusLabel }}</span>
    </div>

    <div style="flex:1;overflow-y:auto;padding:24px 48px">
      <div v-for="i in items" :key="i.key" style="display:flex;gap:24px;padding:28px 0;border-bottom:1px solid var(--line);align-items:center">
        <div style="width:130px;height:130px;border-radius:22px;background:var(--card);display:flex;align-items:center;justify-content:center;font-size:64px;flex-shrink:0">{{ i.icon }}</div>
        <div style="flex:1">
          <div style="font-size:36px;font-weight:700">{{ i.name }}</div>
          <div style="font-size:26px;color:var(--accent);margin:6px 0">{{ i.sub }}</div>
          <div v-if="i.editable" @click="editLine(i.line)" v-press="'transform:scale(.96)'" style="display:inline-flex;align-items:center;gap:8px;font-size:24px;color:var(--muted);font-weight:600;cursor:pointer;border:2px solid var(--line);border-radius:14px;padding:8px 18px;margin:2px 0 4px">✎ {{ tr.editItem }}</div>
          <div style="display:flex;align-items:center;justify-content:space-between;margin-top:14px">
            <span style="font-size:40px;font-weight:800">{{ i.priceLabel }}</span>
            <div style="display:flex;align-items:center;gap:16px">
              <div @click="cartQty(i.key, -1)" v-press="'transform:scale(.9)'" style="width:80px;height:80px;border-radius:50%;background:var(--card);display:flex;align-items:center;justify-content:center;font-size:40px;cursor:pointer">−</div>
              <span style="font-size:36px;font-weight:700;min-width:50px;text-align:center">{{ i.qty }}</span>
              <div @click="cartQty(i.key, 1)" v-press="'transform:scale(.9)'" style="width:80px;height:80px;border-radius:50%;background:var(--card);display:flex;align-items:center;justify-content:center;font-size:40px;cursor:pointer">+</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Sticky upsell recommendations -->
    <div v-if="hasUpsell" style="flex-shrink:0;background:var(--accentSoft);border-top:1px solid var(--accentLine);padding:14px 40px 12px">
      <div style="font-size:26px;font-weight:800;color:var(--accent);margin-bottom:10px">💡 {{ tr.often }}</div>
      <div style="display:flex;gap:14px;overflow-x:auto;padding-bottom:6px">
        <div v-for="u in upsell" :key="u.id" @click="addCross(u.raw)" v-press="'transform:scale(.97)'" style="flex:0 0 auto;display:flex;align-items:center;gap:14px;background:var(--card);border:2px solid var(--line);border-radius:18px;padding:12px 14px 12px 18px;cursor:pointer">
          <div style="font-size:44px">{{ u.icon }}</div>
          <div><div style="font-size:24px;font-weight:600;white-space:nowrap">{{ u.name }}</div><div style="font-size:22px;font-weight:800;color:var(--accent)">+{{ u.priceLabel }}</div></div>
          <div style="padding:12px 22px;border-radius:14px;background:var(--accent);color:#fff;font-size:24px;font-weight:700;white-space:nowrap">{{ tr.add }}</div>
        </div>
      </div>
    </div>

    <div style="flex-shrink:0;background:var(--surface);border-top:1px solid var(--line);padding:28px 48px;box-shadow:0 -10px 40px rgba(0,0,0,.18)">
      <div style="display:flex;align-items:center;margin-bottom:20px">
        <span style="font-size:30px;color:var(--muted)">{{ cartCount() }} {{ tr.positions }}</span>
        <span style="margin-left:auto;font-size:30px;color:var(--muted)">{{ tr.total }}</span>
        <span style="margin-left:18px;font-size:56px;font-weight:800;color:var(--accent);font-family:'Montserrat'">{{ totalLabel }}</span>
      </div>
      <div @click="goPay" v-press="'transform:scale(.99)'" style="height:170px;border-radius:28px;background:linear-gradient(135deg,var(--accent),var(--accent2));color:#fff;display:flex;align-items:center;justify-content:center;font-size:48px;font-weight:800;box-shadow:0 12px 36px var(--accentLine)">{{ tr.pay }} · {{ totalLabel }}</div>
    </div>
  </div>
</template>
