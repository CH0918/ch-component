import { withInstall } from '@ch/utils/withInstall'
import _CIcon from './src/icon.vue'

// 给组件赋值一个install方法，在使用时可以直接use当成插件来使用
const CIcon = withInstall(_CIcon)
export default CIcon

declare module 'vue' {
  export interface GlobalComponents {
    // 我们的接口可以自动合并
    CIcon: typeof CIcon
  }
}
