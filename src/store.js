import { reactive } from 'vue'
import { I18N } from './i18n'
import {
  CATS, PRODUCTS, CROSS, MILK, ADDONS, COMBO, KCAL,
  DEFAULT_VIDEO, BANNER_VIDEO, COMBO_BASE_PRICE, COMBO_DISCOUNT
} from './data'

const IDLE_TIMEOUT_MS = 30000   // inactivity before the "still there?" dialog
const IDLE_COUNTDOWN = 10       // seconds shown in the idle dialog

function lsGet (k) { try { return localStorage.getItem(k) } catch (e) { return null } }
function lsSet (k, v) { try { localStorage.setItem(k, v) } catch (e) {} }

const saved = {
  theme: lsGet('ksoTheme'),
  lang: lsGet('ksoLang'),
  lowered: lsGet('ksoLowered')
}

export const state = reactive({
  screen: 'welcome',
  lang: saved.lang || 'ru',
  theme: saved.theme || 'dark',
  lowered: saved.lowered === '1',
  catId: 'shawarma',
  cart: [],
  product: null,
  combo: { main: 'shawarma', side: 'fries', drink: null, sauce: null },
  showUpsell: false,
  idle: false,
  idleCount: IDLE_COUNTDOWN,
  toast: '',
  payStep: 'method',
  payMethod: '',
  bonusUse: 0,
  orderNumber: '',
  otype: 'here',
  showLangPick: false,
  returnToCart: false,
  loggedIn: false,
  bonus: 0,
  showCartRec: false,
  auth: { open: false, step: 'phone', phone: '', code: '' }
})

// ===== module-local (non-reactive) state =====
let lastAct = Date.now()
let toastTimer = null
let payTimer1 = null
let payTimer2 = null

export const VIDEO = { default: DEFAULT_VIDEO, banner: BANNER_VIDEO }

// ===== i18n / formatting helpers =====
export function t (k) { const e = I18N[k]; return e ? (e[state.lang] || e.en) : k }
export function nm (o) { return o[state.lang] || o.en || o.ru }
export function money (n) {
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' ₽'
}
export function kcalFor (cat) { return KCAL[cat] || { k: 0, p: 0, f: 0, c: 0 } }
function bump () { lastAct = Date.now() }

// ===== theme =====
export function themeVars () {
  if (state.theme === 'light') {
    return '--bg:#f3efe9;--bg2:#fff;--surface:#ffffff;--card:#ffffff;--fg:#1c1712;--muted:#8a8174;--muted2:#b7afa3;--line:rgba(0,0,0,.09);--accent:#E85D1F;--accent2:#FF8A4C;--accentSoft:rgba(232,93,31,.09);--accentLine:rgba(232,93,31,.28)'
  }
  return '--bg:#0d0d0d;--bg2:#161018;--surface:#161616;--card:#1c1c1c;--fg:#ffffff;--muted:#8a8a8a;--muted2:#5a5a5a;--line:rgba(255,255,255,.08);--accent:#FF6B2C;--accent2:#FF8F5C;--accentSoft:rgba(255,107,44,.10);--accentLine:rgba(255,107,44,.30)'
}

// ===== lifecycle (idle watcher) =====
let tickTimer = null
let pointerHandler = null
export function startLifecycle () {
  pointerHandler = () => bump()
  document.addEventListener('pointerdown', pointerHandler, true)
  tickTimer = setInterval(() => {
    if (state.idle) {
      const n = state.idleCount - 1
      if (n <= 0) newOrder()
      else state.idleCount = n
      return
    }
    if (state.screen === 'welcome' || state.screen === 'confirm') return
    if (Date.now() - lastAct > IDLE_TIMEOUT_MS) {
      state.idle = true
      state.idleCount = IDLE_COUNTDOWN
    }
  }, 1000)
}
export function stopLifecycle () {
  clearInterval(tickTimer)
  if (pointerHandler) document.removeEventListener('pointerdown', pointerHandler, true)
  clearTimeout(payTimer1); clearTimeout(payTimer2)
}

// ===== navigation =====
export function go (screen) { bump(); state.screen = screen }
export function chooseLang (l) { bump(); lsSet('ksoLang', l); state.lang = l; state.screen = 'type'; state.catId = 'shawarma' }
export function setOtype (ot) { bump(); state.otype = ot }
export function setLang (l) { bump(); lsSet('ksoLang', l); state.lang = l; state.showLangPick = false }
export function toggleLangPick () { bump(); state.showLangPick = !state.showLangPick }
export function closeLangPick () { state.showLangPick = false }
export function toggleTheme () { const th = state.theme === 'dark' ? 'light' : 'dark'; lsSet('ksoTheme', th); state.theme = th }
export function toggleLower () { const lo = !state.lowered; lsSet('ksoLowered', lo ? '1' : '0'); state.lowered = lo }
export function setCat (id) { bump(); state.catId = id }
export function callStaff () { bump(); showToast(t('staffCalled')) }
export function showToast (m) { state.toast = m; clearTimeout(toastTimer); toastTimer = setTimeout(() => { state.toast = '' }, 2400) }
export function forceIdle () { state.idle = true; state.idleCount = IDLE_COUNTDOWN }
export function keepGoing () { bump(); state.idle = false }

// ===== loyalty auth =====
export function fmtPhone (p) {
  const d = (p || '').padEnd(10, '•')
  return '+7 (' + d.slice(0, 3) + ') ' + d.slice(3, 6) + '-' + d.slice(6, 8) + '-' + d.slice(8, 10)
}
export function openAuth () { bump(); state.auth = { open: true, step: 'phone', phone: '', code: '' } }
export function closeAuth () { state.auth = { open: false, step: 'phone', phone: '', code: '' } }
export function authDigit (d) {
  bump()
  const a = { ...state.auth }
  if (a.step === 'phone') {
    if (a.phone.length < 10) a.phone += d
  } else if (a.step === 'otp') {
    if (a.code.length < 4) {
      a.code += d
      if (a.code.length === 4) { a.step = 'done'; state.loggedIn = true; state.bonus = 350 }
    }
  }
  state.auth = a
}
export function authBack () {
  bump()
  const a = { ...state.auth }
  if (a.step === 'phone') a.phone = a.phone.slice(0, -1)
  else if (a.step === 'otp') a.code = a.code.slice(0, -1)
  state.auth = a
}
export function authSend () {
  bump()
  const a = { ...state.auth }
  if (a.phone.length >= 10) { a.step = 'otp'; a.code = ''; state.auth = a }
}

// ===== cart totals =====
export function cartCount () { return state.cart.reduce((a, b) => a + b.qty, 0) }
export function cartTotal () { return state.cart.reduce((a, b) => a + b.price * b.qty, 0) }

function addLine (line) {
  const ex = state.cart.find(c => c.key === line.key)
  if (ex) ex.qty += line.qty
  else state.cart.push(line)
}
export function quickAdd (p) {
  bump()
  addLine({ key: 'q_' + p.id + '_' + Date.now(), pid: p.id, name: nm(p), sub: '', price: p.price, qty: 1, icon: p.icon })
  openUpsell()
}

// ===== product detail =====
export function openProduct (p) {
  bump()
  state.product = { p, cat: state.catId, size: 'M', milk: null, addons: {}, qty: 1 }
  state.screen = 'product'
}
export function setSize (s) { state.product = { ...state.product, size: s } }
export function setMilk (m) { state.product = { ...state.product, milk: m } }
export function toggleAddon (a) {
  const ad = { ...state.product.addons }; ad[a] = !ad[a]
  state.product = { ...state.product, addons: ad }
}
export function pdQty (d) { const q = Math.max(1, state.product.qty + d); state.product = { ...state.product, qty: q } }
export function pdUnit () {
  const pr = state.product, p = pr.p
  let v = p.price + (pr.size === 'L' ? 60 : 0)
  const m = MILK.find(x => x.id === pr.milk); if (m) v += m.price
  ADDONS.forEach(a => { if (pr.addons[a.id]) v += a.price })
  return v
}
export function addProduct () {
  bump()
  const pr = state.product, p = pr.p
  const subs = []
  if (pr.size === 'L') subs.push('L')
  const m = MILK.find(x => x.id === pr.milk); if (m && m.price) subs.push(nm(m).toLowerCase())
  ADDONS.forEach(a => { if (pr.addons[a.id]) subs.push('+' + nm(a).toLowerCase()) })
  addLine({
    key: 'p_' + p.id + '_' + pr.size + '_' + pr.milk + '_' + Object.keys(pr.addons).filter(k => pr.addons[k]).join(',') + '_' + Date.now(),
    pid: p.id, name: nm(p) + (pr.size === 'L' ? ' L' : ''), sub: subs.join(', '),
    price: pdUnit(), qty: pr.qty, icon: p.icon,
    edit: { pid: p.id, cat: pr.cat, size: pr.size, milk: pr.milk, addons: { ...pr.addons }, qty: pr.qty }
  })
  const back = state.returnToCart
  state.screen = back ? 'cart' : 'menu'
  state.returnToCart = false
  if (!back) openUpsell()
}
export function addCross (u) {
  bump()
  addLine({ key: 'q_' + u.id + '_' + Date.now(), pid: u.id, name: nm(u), sub: '', price: u.price, qty: 1, icon: u.icon })
  showToast(t('added'))
}

// ===== combo =====
export function comboSet (group, id) { bump(); state.combo = { ...state.combo, [group]: id } }
export function comboPrice () {
  let v = COMBO_BASE_PRICE
  const c = state.combo
  ;['main', 'side', 'drink', 'sauce'].forEach(g => { const o = COMBO[g].find(x => x.id === c[g]); if (o) v += o.price })
  return v
}
export function comboReady () { const c = state.combo; return !!(c.main && c.side && c.drink && c.sauce) }
export function comboExtra () {
  return ['main', 'side', 'drink', 'sauce'].reduce((a, g) => {
    const o = COMBO[g].find(x => x.id === state.combo[g]); return a + (o ? o.price : 0)
  }, 0)
}
export function comboOldPrice () { return comboPrice() + COMBO_DISCOUNT }
export function addCombo () {
  if (!comboReady()) return
  bump()
  const c = state.combo
  const ic = g => { const o = COMBO[g].find(x => x.id === c[g]); return o ? o.icon : '' }
  const sub = ['main', 'side', 'drink', 'sauce'].map(g => { const o = COMBO[g].find(x => x.id === c[g]); return o ? nm(o) : '' }).join(' + ')
  addLine({ key: 'combo_' + Date.now(), pid: 'combo', name: 'Комбо 🎁', sub, price: comboPrice(), qty: 1, icon: ic('main'), comboData: { ...c } })
  state.screen = state.returnToCart ? 'cart' : 'menu'
  state.returnToCart = false
}

function findProduct (pid) {
  for (const k in PRODUCTS) { const f = PRODUCTS[k].find(x => x.id === pid); if (f) return f }
  return null
}
export function editLine (line) {
  bump()
  const back = state.screen === 'cart'
  state.cart = state.cart.filter(c => c.key !== line.key)
  if (line.comboData) {
    state.combo = { ...line.comboData }; state.screen = 'combo'; state.returnToCart = back
  } else if (line.edit) {
    const p = findProduct(line.edit.pid)
    if (!p) return
    state.product = { p, cat: line.edit.cat, size: line.edit.size, milk: line.edit.milk, addons: { ...line.edit.addons }, qty: line.edit.qty }
    state.screen = 'product'; state.returnToCart = back
  }
}

// ===== cart screen =====
export function goCart () { bump(); state.screen = 'cart'; state.showCartRec = false }
export function clearCart () { bump(); state.cart = [] }
export function cartQty (key, d) {
  bump()
  const it = state.cart.find(c => c.key === key); if (!it) return
  it.qty += d
  if (it.qty <= 0) state.cart = state.cart.filter(c => c.key !== key)
}
export function removeLine (key) { bump(); state.cart = state.cart.filter(c => c.key !== key) }

// ===== upsell =====
export function openUpsell () { state.showUpsell = true }
export function dismissUpsell () { bump(); state.showUpsell = false }
export function addUpsell (u) {
  bump()
  addLine({ key: 'q_' + u.id + '_' + Date.now(), pid: u.id, name: nm(u), sub: '', price: u.price, qty: 1, icon: u.icon })
  state.showUpsell = false
  showToast(t('added'))
}

// ===== payment =====
export function maxBonus () { return Math.min(state.bonus || 0, cartTotal()) }
export function bonusApplied () { return Math.min(state.bonusUse || 0, maxBonus()) }
export function payTotal () { return cartTotal() - bonusApplied() }
export function goPay () {
  if (!state.cart.length) return
  bump()
  clearTimeout(payTimer1); clearTimeout(payTimer2)
  state.screen = 'pay'; state.payStep = 'method'; state.payMethod = ''; state.bonusUse = 0
}
export function setBonus (v) {
  bump()
  state.bonusUse = Math.max(0, Math.min(Math.round(v), maxBonus()))
}
export function choosePay (m) {
  bump()
  state.payStep = 'process'; state.payMethod = m
  clearTimeout(payTimer1); clearTimeout(payTimer2)
  payTimer1 = setTimeout(() => { state.payStep = 'success' }, 2800)
  payTimer2 = setTimeout(() => {
    state.screen = 'confirm'
    state.orderNumber = String(Math.floor(100 + Math.random() * 899))
  }, 4400)
}
export function newOrder () {
  bump()
  clearTimeout(payTimer1); clearTimeout(payTimer2)
  state.screen = 'welcome'
  state.cart = []
  state.idle = false
  state.product = null
  state.combo = { main: 'shawarma', side: 'fries', drink: null, sauce: null }
  state.catId = 'shawarma'
}
