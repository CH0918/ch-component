import { createApp } from 'vue'
import App from './App.vue'

import CIcon from '@ch/components/icon'
import CTree from '@ch/components/tree'
import CTirtualTree from '@ch/components/virtual-list'
import '@ch/theme-chalk/src/index.scss'

const plugins = [CIcon, CTree, CTirtualTree]
const app = createApp(App)
plugins.forEach(comp => {
  app.use(comp)
})
app.mount('#app')
