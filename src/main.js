import { createApp } from 'vue'
import App from './App.vue'
import './styles.css'

const app = createApp(App)

/**
 * v-press — reproduces the prototype's `style-active` attribute: while the
 * element is pressed (pointerdown), the given inline CSS is applied; on
 * release / cancel / leave it is removed. Value is a CSS text string,
 * e.g. v-press="'transform:scale(.93)'".
 */
app.directive('press', {
  mounted (el, binding) {
    const css = binding.value || 'transform:scale(.96)'
    const apply = () => { el.style.cssText += ';' + css }
    const clear = () => {
      // strip the applied declarations
      css.split(';').forEach(rule => {
        const prop = rule.split(':')[0] && rule.split(':')[0].trim()
        if (prop) el.style.removeProperty(prop)
      })
    }
    el.__pressClear = clear
    el.__pressDown = apply
    el.addEventListener('pointerdown', apply)
    el.addEventListener('pointerup', clear)
    el.addEventListener('pointerleave', clear)
    el.addEventListener('pointercancel', clear)
  },
  unmounted (el) {
    if (el.__pressDown) el.removeEventListener('pointerdown', el.__pressDown)
    if (el.__pressClear) {
      el.removeEventListener('pointerup', el.__pressClear)
      el.removeEventListener('pointerleave', el.__pressClear)
      el.removeEventListener('pointercancel', el.__pressClear)
    }
  }
})

app.mount('#app')
