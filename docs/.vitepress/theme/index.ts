import DefaultTheme from 'vitepress/theme'

import CIcon from '@ch/components/icon'
import '@ch/theme-chalk/src/index.scss'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.use(CIcon) // 在vitepress中 注册全局组件
  }
}
