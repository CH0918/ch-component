import _CTirtualTree from './src/virtualList'
import { withInstall } from '@ch/utils/withInstall'

const CTirtualTree = withInstall(_CTirtualTree)

export default CTirtualTree

export * from './src/index'

declare module 'vue' {
  export interface GlobalComponents {
    // 我们的接口可以自动合并
    CTirtualTree: typeof CTirtualTree
  }
}
