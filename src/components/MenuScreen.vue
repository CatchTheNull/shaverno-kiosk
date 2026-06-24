<script setup>
import { computed } from 'vue'
import VideoBg from './VideoBg.vue'
import ImageSlot from './ImageSlot.vue'
import Flag from './Flag.vue'
import {
  state, t, nm, money, VIDEO,
  setCat, openProduct, go, goCart, cartCount, cartTotal,
  setOtype, toggleLower, toggleTheme, callStaff, forceIdle, openAuth,
  toggleLangPick, closeLangPick, setLang, editLine, removeLine, comboPrice
} from '../store'
import { CATS, PRODUCTS, COMBO_DISCOUNT } from '../data'
import { LANG_LABEL, LANG_NAME } from '../i18n'

const tr = computed(() => ({
  here: t('here'), toGo: t('toGo'), checkout: t('checkout'), positions: t('positions'),
  emptyCart: t('emptyCart'), buildCombo: t('buildCombo'), scrLbl: t('scrLbl'),
  themeLbl: t('themeLbl'), loyalty: t('loyalty'), help: t('help'), resetLbl: t('resetLbl'),
  hit: t('hit'), newb: t('newb')
}))

const otype = computed(() => state.otype || 'here')
const themeIcon = computed(() => (state.theme === 'dark' ? '☀️' : '🌙'))
const langLabel = computed(() => LANG_LABEL[state.lang])
const loyaltyLabel = computed(() => (state.loggedIn ? money(state.bonus || 0) : t('loyalty')))
const activeCatLabel = computed(() => nm(CATS.find(c => c.id === state.catId) || CATS[0]))
const comboPriceLabel = computed(() => money(comboPrice()))

// segment (order-type) styles
function segMini (on) {
  return on
    ? 'display:flex;align-items:center;gap:10px;padding:12px 22px;border-radius:22px;font-size:26px;font-weight:700;cursor:pointer;white-space:nowrap;background:linear-gradient(135deg,var(--accent),var(--accent2));color:#fff'
    : 'display:flex;align-items:center;gap:10px;padding:12px 22px;border-radius:22px;font-size:26px;font-weight:700;cursor:pointer;white-space:nowrap;color:var(--muted)'
}

// categories
const cats = computed(() => CATS.map(c => ({
  id: c.id, label: nm(c), img: c.img, icon: c.icon,
  active: state.catId === c.id,
  imgStyle: state.catId === c.id ? 'width:158px;height:158px;display:block' : 'width:120px;height:120px;display:block;opacity:.5',
  labelStyle: state.catId === c.id
    ? 'font-size:27px;font-weight:700;color:var(--accent);text-align:center;line-height:1.15'
    : 'font-size:24px;font-weight:500;color:var(--muted);text-align:center;line-height:1.15'
})))

// products (with combo card injected into shawarma)
const cardBase = 'background:var(--card);border-radius:26px;overflow:hidden;position:relative;cursor:pointer;display:flex;flex-direction:column;border:1px solid var(--line);min-height:480px'
const comboCard = 'border-radius:26px;overflow:hidden;position:relative;cursor:pointer;display:flex;flex-direction:column;min-height:480px;background:linear-gradient(150deg,var(--accent),var(--accent2))'

const products = computed(() => {
  const list = (PRODUCTS[state.catId] || []).slice()
  const out = []
  if (state.catId === 'shawarma') out.push({ key: 'combo', isCombo: true })
  list.forEach(p => {
    out.push({
      key: p.id, isCombo: false, raw: p, name: nm(p), vol: p.vol, icon: p.icon, img: p.img,
      priceLabel: money(p.price),
      badge: !!p.badge, badgeLabel: p.badge === 'new' ? tr.value.newb : tr.value.hit,
      badgeStyle: p.badge === 'new'
        ? 'position:absolute;top:18px;left:18px;padding:8px 16px;border-radius:12px;background:#2f9e54;color:#fff;font-size:22px;font-weight:800'
        : 'position:absolute;top:18px;left:18px;padding:8px 16px;border-radius:12px;background:var(--accent);color:#fff;font-size:22px;font-weight:800',
      spicy: ['sh_sp', 'sc_sp', 'ht_lk'].includes(p.id)
    })
  })
  return out
})

function onCard (p) { if (p.isCombo) go('combo'); else openProduct(p.raw) }
function onPlus (p, e) { if (e) e.stopPropagation && e.stopPropagation(); openProduct(p.raw) }

// cart
const cartItems = computed(() => state.cart.map(c => ({
  key: c.key, icon: c.icon, qty: c.qty, multi: c.qty > 1, line: c
})))
const cartEmpty = computed(() => state.cart.length === 0)
const cartTotalLabel = computed(() => money(cartTotal()))

// toolbar tile styles
const tbTile = 'display:flex;flex-direction:column;align-items:center;gap:10px;cursor:pointer'
const tbCircle = 'width:90px;height:90px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:38px;background:var(--card);border:1px solid var(--line);box-shadow:0 4px 14px rgba(0,0,0,.08);color:var(--fg)'
const tbCircleAccent = 'width:90px;height:90px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:38px;background:linear-gradient(135deg,var(--accent),var(--accent2));color:#fff;box-shadow:0 6px 18px var(--accentLine)'
const tbLbl = 'font-size:18px;color:var(--muted);font-weight:600'

// language picker
const langs = ['ru', 'en', 'zh', 'de', 'tr']
function langItemStyle (code) {
  const on = state.lang === code
  return (on ? 'border:2px solid var(--accent);background:var(--accentSoft);color:var(--accent);font-weight:700;' : 'border:2px solid transparent;color:var(--fg);font-weight:600;') +
    'display:flex;align-items:center;gap:20px;padding:20px 26px;border-radius:18px;cursor:pointer;font-size:32px'
}

function openLangPick (e) { if (e) e.stopPropagation && e.stopPropagation(); toggleLangPick() }
function auth (e) { if (e) e.stopPropagation && e.stopPropagation(); openAuth() }
function lower (e) { if (e) e.stopPropagation && e.stopPropagation(); toggleLower() }
</script>

<template>
  <div style="position:absolute;inset:0;display:flex;flex-direction:column;background:var(--bg)">
    <!-- Zone A: video banner header -->
    <div style="height:230px;flex-shrink:0;position:relative;overflow:hidden">
      <VideoBg :src="VIDEO.banner" fit="cover" />
      <div style="position:absolute;inset:0;z-index:1;background:linear-gradient(90deg,rgba(0,0,0,.62),rgba(0,0,0,.22) 45%,rgba(0,0,0,.55))"></div>
      <div style="position:absolute;inset:0;z-index:2;display:flex;align-items:center;justify-content:space-between;padding:0 48px">
        <div style="font-family:'Montserrat';font-weight:900;font-size:58px;color:#fff;text-shadow:0 2px 14px rgba(0,0,0,.7)">ШАВЕРНО</div>
        <div style="font-family:'Montserrat';font-weight:700;font-size:46px;color:#fff;text-shadow:0 2px 14px rgba(0,0,0,.7)">{{ activeCatLabel }}</div>
      </div>
      <div @click="auth" v-press="'transform:scale(.96)'" style="position:absolute;top:22px;right:40px;z-index:3;display:flex;align-items:center;gap:12px;padding:14px 26px;border-radius:50px;background:rgba(255,255,255,.22);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border:2px solid rgba(255,255,255,.5);color:#fff;font-size:26px;font-weight:700;cursor:pointer">⭐ {{ loyaltyLabel }}</div>
    </div>

    <!-- Zone B: rail + grid -->
    <div style="flex:1;display:flex;overflow:hidden">
      <div style="width:248px;flex-shrink:0;overflow-y:auto;padding:32px 14px 40px;display:flex;flex-direction:column;gap:36px;align-items:center">
        <div v-for="c in cats" :key="c.id" @click="setCat(c.id)" v-press="'transform:scale(.93)'" style="display:flex;flex-direction:column;align-items:center;gap:14px;cursor:pointer;width:100%">
          <ImageSlot :style="c.imgStyle" :src="c.img" :emoji="c.icon" shape="circle" :placeholder="c.label" emojiSize="60%" />
          <div :style="c.labelStyle">{{ c.label }}</div>
        </div>
      </div>

      <div style="flex:1;overflow-y:auto;padding:32px 48px 40px">
        <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:32px">
          <div v-for="p in products" :key="p.key" @click="onCard(p)" :style="p.isCombo ? comboCard : cardBase">
            <!-- combo card -->
            <template v-if="p.isCombo">
              <div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:20px;padding:30px;color:#fff;position:relative">
                <ImageSlot style="width:230px;height:230px;display:block" emoji="🎁" shape="circle" placeholder="Фото комбо" emojiSize="56%" />
                <div style="font-size:40px;font-weight:800;font-family:'Montserrat';text-align:center">{{ tr.buildCombo }}</div>
                <div style="display:flex;align-items:center;gap:12px"><span style="font-size:40px;font-weight:800">{{ comboPriceLabel }}</span><span style="padding:8px 18px;border-radius:14px;background:rgba(255,255,255,.25);font-size:24px;font-weight:700">−{{ COMBO_DISCOUNT }} ₽</span></div>
              </div>
            </template>
            <!-- real product -->
            <template v-else>
              <div style="position:relative">
                <ImageSlot style="width:100%;height:300px;display:block" :src="p.img" shape="rect" :placeholder="p.name" />
                <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:90px;pointer-events:none;opacity:.25">{{ p.icon }}</div>
                <div v-if="p.badge" :style="p.badgeStyle">{{ p.badgeLabel }}</div>
                <div v-if="p.spicy" style="position:absolute;top:16px;right:16px;width:64px;height:64px;border-radius:50%;background:#e0392b;display:flex;align-items:center;justify-content:center;font-size:34px;box-shadow:0 6px 16px rgba(224,57,43,.5)">🌶️</div>
              </div>
              <div style="padding:22px 24px 24px;display:flex;flex-direction:column;flex:1">
                <div style="font-size:38px;font-weight:700;line-height:1.1">{{ p.name }}</div>
                <div style="font-size:24px;color:var(--muted);margin-top:6px">{{ p.vol }}</div>
                <div style="margin-top:auto;display:flex;align-items:flex-end;justify-content:space-between;padding-top:20px">
                  <div style="font-size:46px;font-weight:800;color:var(--accent);font-family:'Montserrat'">{{ p.priceLabel }}</div>
                  <div @click="onPlus(p, $event)" v-press="'transform:scale(.9)'" style="width:104px;height:104px;border-radius:50%;background:linear-gradient(135deg,var(--accent),var(--accent2));color:#fff;display:flex;align-items:center;justify-content:center;font-size:56px;font-weight:300;box-shadow:0 8px 24px var(--accentLine)">+</div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>

    <!-- Zone C: sticky cart -->
    <div style="flex-shrink:0;background:var(--surface);border-top:1px solid var(--line);border-radius:28px 28px 0 0;padding:22px 48px 24px;box-shadow:0 -10px 40px rgba(0,0,0,.18)">
      <div v-if="cartEmpty" style="height:150px;display:flex;align-items:center;justify-content:center;color:var(--muted);font-size:32px">🛒 {{ tr.emptyCart }}</div>
      <template v-else>
        <div style="display:flex;align-items:center;margin-bottom:14px">
          <span style="font-size:28px;font-weight:600;color:var(--muted)">🛒 {{ cartCount() }} {{ tr.positions }}</span>
          <span style="margin-left:auto;font-size:44px;font-weight:800;color:var(--accent);font-family:'Montserrat'">{{ cartTotalLabel }}</span>
        </div>
        <div @click="goCart" v-press="'transform:scale(.99)'" style="height:140px;border-radius:24px;background:linear-gradient(135deg,var(--accent),var(--accent2));color:#fff;display:flex;align-items:center;justify-content:center;gap:18px;font-size:40px;font-weight:800;box-shadow:0 10px 30px var(--accentLine)">{{ tr.checkout }} · {{ cartTotalLabel }} →</div>
      </template>
    </div>

    <!-- Bottom toolbar: order type + utilities -->
    <div style="flex-shrink:0;display:flex;align-items:center;gap:14px;padding:12px 36px;border-top:1px solid var(--line);background:linear-gradient(180deg,var(--bg),var(--surface))">
      <div style="display:flex;gap:8px;background:var(--card);border:2px solid var(--line);border-radius:38px;padding:7px;box-shadow:0 6px 18px rgba(0,0,0,.1)">
        <div @click="setOtype('here')" :style="segMini(otype === 'here')">🍽️ {{ tr.here }}</div>
        <div @click="setOtype('togo')" :style="segMini(otype === 'togo')">🛍️ {{ tr.toGo }}</div>
      </div>
      <div style="margin-left:auto;display:flex;align-items:center;gap:12px">
        <div @click="lower" :style="tbTile"><div :style="tbCircle">♿</div><div :style="tbLbl">{{ tr.scrLbl }}</div></div>
        <div @click="openLangPick" :style="tbTile"><div :style="tbCircle">🌐</div><div :style="tbLbl">{{ langLabel }} ▾</div></div>
        <div @click="toggleTheme" :style="tbTile"><div :style="tbCircle">{{ themeIcon }}</div><div :style="tbLbl">{{ tr.themeLbl }}</div></div>
        <div @click="auth" :style="tbTile"><div :style="tbCircle">⭐</div><div :style="tbLbl">{{ tr.loyalty }}</div></div>
        <div @click="callStaff" :style="tbTile"><div :style="tbCircleAccent">🔔</div><div :style="tbLbl">{{ tr.help }}</div></div>
        <div @click="forceIdle" :style="tbTile"><div :style="tbCircle">↺</div><div :style="tbLbl">{{ tr.resetLbl }}</div></div>
      </div>
    </div>

    <!-- Floating cart balls -->
    <div style="position:absolute;right:44px;bottom:600px;z-index:20;display:flex;flex-direction:column-reverse;gap:18px;align-items:center;pointer-events:none">
      <div v-for="i in cartItems" :key="i.key" style="position:relative;pointer-events:auto;animation:ksoPop .35s ease">
        <div @click="editLine(i.line)" v-press="'transform:scale(.92)'" style="width:118px;height:118px;border-radius:50%;background:var(--surface);border:3px solid var(--accent);display:flex;align-items:center;justify-content:center;font-size:56px;cursor:pointer;box-shadow:0 12px 30px rgba(0,0,0,.3)">{{ i.icon }}</div>
        <div v-if="i.multi" style="position:absolute;bottom:-4px;left:-6px;min-width:50px;height:50px;padding:0 12px;border-radius:25px;background:var(--accent);color:#fff;display:flex;align-items:center;justify-content:center;font-size:28px;font-weight:800;border:3px solid var(--bg)">{{ i.qty }}</div>
        <div @click.stop="removeLine(i.key)" v-press="'transform:scale(.9)'" style="position:absolute;top:-8px;right:-8px;width:50px;height:50px;border-radius:50%;background:#e0392b;color:#fff;display:flex;align-items:center;justify-content:center;font-size:24px;cursor:pointer;border:3px solid var(--bg)">✕</div>
      </div>
    </div>

    <!-- Language picker popup -->
    <template v-if="state.showLangPick">
      <div @click="closeLangPick" style="position:absolute;inset:0;z-index:30"></div>
      <div style="position:absolute;left:48px;bottom:150px;z-index:31;background:var(--surface);border:2px solid var(--line);border-radius:26px;padding:18px;box-shadow:0 24px 60px rgba(0,0,0,.35);display:flex;flex-direction:column;gap:10px;min-width:420px">
        <div v-for="l in langs" :key="l" @click="setLang(l)" :style="langItemStyle(l)">
          <div style="width:72px;height:72px;border-radius:50%;overflow:hidden;flex-shrink:0;box-shadow:0 2px 8px rgba(0,0,0,.25)"><Flag :code="l" :size="72" /></div>
          {{ LANG_NAME[l] }}
        </div>
      </div>
    </template>
  </div>
</template>
