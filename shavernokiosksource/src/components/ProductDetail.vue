<script setup>
import { computed } from 'vue'
import ImageSlot from './ImageSlot.vue'
import {
  state, t, nm, money, kcalFor,
  go, setSize, setMilk, toggleAddon, pdQty, pdUnit, addProduct, addCross
} from '../store'
import { MILK, ADDONS, CROSS, COMBO_DISCOUNT } from '../data'

const tr = computed(() => ({
  kcal: t('kcal'), customize: t('customize'), customizeSub: t('customizeSub'),
  milk: t('milk'), required: t('required'), addons: t('addons'),
  withThis: t('withThis'), comboOffer: t('comboOffer'),
  pickPrefix: t('pickPrefix'), addToCart: t('addToCart')
}))

const pr = computed(() => state.product)
const p = computed(() => state.product.p)
const kc = computed(() => kcalFor(pr.value.cat))
const locked = computed(() => !pr.value.milk)
const comboOffer = computed(() => ['shawarma', 'signature', 'doner', 'rolls'].includes(pr.value.cat))

const szBase = 'flex:1;padding:24px;border-radius:42px;text-align:center;font-weight:700;font-size:36px;cursor:pointer;color:var(--muted)'
const szSel = 'flex:1;padding:24px;border-radius:42px;text-align:center;font-weight:700;font-size:36px;cursor:pointer;background:var(--fg);color:var(--bg);box-shadow:0 6px 18px rgba(0,0,0,.25)'
const swBase = 'width:150px;height:150px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:64px;background:var(--card);border:3px solid var(--line);cursor:pointer'
const swSel = 'width:150px;height:150px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:64px;background:var(--accentSoft);border:4px solid var(--accent);box-shadow:0 0 0 6px var(--accentSoft),0 12px 26px var(--accentLine);cursor:pointer'
const nmBase = 'font-size:24px;font-weight:500;color:var(--fg);margin-top:12px;text-align:center'
const nmSel = 'font-size:24px;font-weight:700;color:var(--accent);margin-top:12px;text-align:center'

const sizes = computed(() => [
  { label: 'M', style: pr.value.size === 'M' ? szSel : szBase, val: 'M' },
  { label: 'L', style: pr.value.size === 'L' ? szSel : szBase, val: 'L' }
])
const milk = computed(() => MILK.map(m => ({
  id: m.id, name: nm(m), icon: m.icon, priceLabel: m.price ? ('+' + money(m.price)) : '',
  circleStyle: pr.value.milk === m.id ? swSel : swBase, nameStyle: pr.value.milk === m.id ? nmSel : nmBase
})))
const addons = computed(() => ADDONS.map(a => ({
  id: a.id, name: nm(a), icon: a.icon, priceLabel: '+' + money(a.price),
  circleStyle: pr.value.addons[a.id] ? swSel : swBase, nameStyle: pr.value.addons[a.id] ? nmSel : nmBase
})))
const cross = computed(() => CROSS.filter(c => c.id !== p.value.id).slice(0, 3).map(u => ({
  id: u.id, raw: u, name: nm(u), icon: u.icon, priceLabel: money(u.price)
})))

const total = computed(() => money(pdUnit() * pr.value.qty))
const ctaLabel = computed(() => locked.value ? ('🔒 ' + tr.value.pickPrefix + ' ' + tr.value.milk) : (tr.value.addToCart + ' · ' + total.value))
const ctaStyle = computed(() => locked.value
  ? 'flex:1;height:160px;border-radius:26px;background:var(--card);color:var(--muted2);display:flex;align-items:center;justify-content:center;font-size:38px;font-weight:700;border:2px solid var(--line)'
  : 'flex:1;height:160px;border-radius:26px;background:linear-gradient(135deg,var(--accent),var(--accent2));color:#fff;display:flex;align-items:center;justify-content:center;font-size:42px;font-weight:800;box-shadow:0 10px 30px var(--accentLine)')

function doAdd () { if (!locked.value) addProduct() }
</script>

<template>
  <div style="position:absolute;inset:0;background:rgba(0,0,0,.34);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;z-index:80;padding:50px">
    <div style="width:930px;max-height:1580px;background:var(--bg);border-radius:44px;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 40px 110px rgba(0,0,0,.6)">
      <div style="position:relative;height:440px;flex-shrink:0;background:var(--card)">
        <ImageSlot style="width:100%;height:440px;display:block" :src="p.img" shape="rect" :placeholder="nm(p)" />
        <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:170px;pointer-events:none;opacity:.22">{{ p.icon }}</div>
        <div @click="go('menu')" style="position:absolute;top:28px;right:28px;width:84px;height:84px;border-radius:50%;background:rgba(0,0,0,.5);backdrop-filter:blur(8px);color:#fff;display:flex;align-items:center;justify-content:center;font-size:40px;cursor:pointer">✕</div>
      </div>
      <div style="flex:1;overflow-y:auto;padding:44px 48px 40px;text-align:center">
        <div style="font-family:'Montserrat';font-weight:800;font-size:60px;letter-spacing:6px;text-transform:uppercase;line-height:1.05">{{ nm(p) }}</div>
        <div style="font-size:28px;color:var(--muted);margin-top:12px">{{ p.vol }}</div>
        <div style="display:flex;justify-content:center;gap:12px;margin-top:22px;flex-wrap:wrap">
          <span style="padding:12px 22px;border-radius:18px;background:var(--card);font-size:24px;color:var(--muted)"><b style="color:var(--fg)">{{ kc.k }}</b> {{ tr.kcal }}</span>
          <span style="padding:12px 22px;border-radius:18px;background:var(--card);font-size:24px;color:var(--muted)"><b style="color:var(--fg)">{{ kc.p }}</b> Б</span>
          <span style="padding:12px 22px;border-radius:18px;background:var(--card);font-size:24px;color:var(--muted)"><b style="color:var(--fg)">{{ kc.f }}</b> Ж</span>
          <span style="padding:12px 22px;border-radius:18px;background:var(--card);font-size:24px;color:var(--muted)"><b style="color:var(--fg)">{{ kc.c }}</b> У</span>
        </div>

        <!-- size segmented -->
        <div style="display:flex;gap:8px;margin:36px auto 0;max-width:780px;background:var(--card);border:2px solid var(--line);border-radius:50px;padding:8px">
          <div v-for="s in sizes" :key="s.val" @click="setSize(s.val)" :style="s.style">{{ s.label }}</div>
        </div>

        <div v-if="comboOffer" @click="go('combo')" v-press="'transform:scale(.99)'" style="display:flex;align-items:center;gap:20px;margin-top:36px;padding:26px 30px;border-radius:24px;background:linear-gradient(135deg,var(--accent),var(--accent2));color:#fff;cursor:pointer;box-shadow:0 10px 28px var(--accentLine)">
          <span style="font-size:54px">🎁</span>
          <span style="font-size:30px;font-weight:700;text-align:left;flex:1">{{ tr.comboOffer }} {{ COMBO_DISCOUNT }} ₽</span>
          <span style="font-size:44px">→</span>
        </div>

        <div style="font-family:'Montserrat';font-weight:700;font-size:40px;margin-top:48px">{{ tr.customize }}</div>
        <div style="font-size:26px;color:var(--muted);margin-top:8px">{{ tr.customizeSub }}</div>

        <!-- meat (required) -->
        <div style="display:flex;align-items:center;margin:34px 0 18px">
          <span style="font-size:28px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:var(--muted)">{{ tr.milk }}</span>
          <span style="margin-left:auto;padding:8px 18px;border-radius:14px;background:var(--accentSoft);color:var(--accent);font-size:22px;font-weight:700;text-transform:uppercase">{{ tr.required }}</span>
        </div>
        <div style="display:flex;gap:26px;overflow-x:auto;padding-bottom:10px;justify-content:safe center">
          <div v-for="m in milk" :key="m.id" @click="setMilk(m.id)" v-press="'transform:scale(.94)'" style="display:flex;flex-direction:column;align-items:center;flex:0 0 auto;cursor:pointer">
            <div :style="m.circleStyle">{{ m.icon }}</div>
            <div :style="m.nameStyle">{{ m.name }}</div>
            <div style="font-size:22px;color:var(--muted)">{{ m.priceLabel }}</div>
          </div>
        </div>

        <!-- addons -->
        <div style="display:flex;align-items:center;margin:36px 0 18px">
          <span style="font-size:28px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:var(--muted)">{{ tr.addons }}</span>
        </div>
        <div style="display:flex;gap:26px;overflow-x:auto;padding-bottom:10px;justify-content:safe center">
          <div v-for="a in addons" :key="a.id" @click="toggleAddon(a.id)" v-press="'transform:scale(.94)'" style="display:flex;flex-direction:column;align-items:center;flex:0 0 auto;cursor:pointer">
            <div :style="a.circleStyle">{{ a.icon }}</div>
            <div :style="a.nameStyle">{{ a.name }}</div>
            <div style="font-size:22px;color:var(--accent)">{{ a.priceLabel }}</div>
          </div>
        </div>

        <!-- INLINE UPSELL "при выборе" -->
        <div style="margin-top:44px;padding:28px;border-radius:24px;background:var(--accentSoft);border:1px solid var(--accentLine);text-align:left">
          <div style="font-size:30px;font-weight:700;color:var(--accent);margin-bottom:20px">🤝 {{ tr.withThis }}</div>
          <div style="display:flex;gap:18px;overflow-x:auto">
            <div v-for="u in cross" :key="u.id" @click="addCross(u.raw)" v-press="'transform:scale(.97)'" style="flex:0 0 200px;text-align:center;padding:22px 16px;background:var(--card);border-radius:20px;border:2px solid var(--line);cursor:pointer">
              <div style="font-size:60px">{{ u.icon }}</div>
              <div style="font-size:26px;font-weight:600;margin-top:8px">{{ u.name }}</div>
              <div style="font-size:28px;font-weight:800;color:var(--accent);margin-top:6px">+{{ u.priceLabel }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Zone C bottom -->
      <div style="flex-shrink:0;background:var(--surface);border-top:1px solid var(--line);padding:26px 48px;display:flex;align-items:center;gap:28px;box-shadow:0 -10px 40px rgba(0,0,0,.18)">
        <div style="display:flex;align-items:center;gap:8px;background:var(--card);border-radius:24px;padding:8px">
          <div @click="pdQty(-1)" v-press="'transform:scale(.92)'" style="width:104px;height:104px;border-radius:20px;background:var(--bg);display:flex;align-items:center;justify-content:center;font-size:50px;cursor:pointer">−</div>
          <span style="font-size:46px;font-weight:800;min-width:70px;text-align:center">{{ pr.qty }}</span>
          <div @click="pdQty(1)" v-press="'transform:scale(.92)'" style="width:104px;height:104px;border-radius:20px;background:var(--bg);display:flex;align-items:center;justify-content:center;font-size:50px;cursor:pointer">+</div>
        </div>
        <div @click="doAdd" :style="ctaStyle">{{ ctaLabel }}</div>
      </div>
    </div>
  </div>
</template>
