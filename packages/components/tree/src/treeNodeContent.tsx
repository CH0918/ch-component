import { defineComponent, inject } from 'vue'
import { treeNodeContentProps, treeInjectionKey } from './tree'

export default defineComponent({
  name: 'CTreeNodeContent',
  props: treeNodeContentProps,
  setup(props) {
    const tree = inject(treeInjectionKey)
    const defaultSlot = tree?.slots.default
    return () => {
      const node = props.node
      return defaultSlot ? defaultSlot({ node }) : '11'
    }
  }
})
