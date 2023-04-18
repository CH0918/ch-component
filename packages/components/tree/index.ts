import _CTree from './src/tree.vue'
import { withInstall } from '@ch/utils/withInstall'

const CTree = withInstall(_CTree)

export default CTree

export * from './src/tree'

declare module 'vue' {
  export interface GlobalComponents {
    // 我们的接口可以自动合并
    CTree: typeof CTree
  }
}
