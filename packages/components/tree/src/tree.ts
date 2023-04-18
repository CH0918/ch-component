import { ExtractPropTypes, PropType } from 'vue'

export type Key = string | number

export interface TreeNode extends Required<TreeOption> {
  level: number
  // isLeaf: boolean
  children: TreeNode[]
}
export interface TreeOption {
  label?: Key
  key?: Key
  children?: TreeOption[]
  isLeaf?: boolean
  [key: string]: unknown
}
export const treeProps = {
  data: {
    type: Array as PropType<TreeOption[]>,
    default: () => []
  },
  labelFiled: {
    type: String,
    default: 'label'
  },
  keyFiled: {
    type: String,
    default: 'key'
  },
  childrenFiled: {
    type: String,
    default: 'children'
  },
  defaultExpandedKeys: {
    type: Array as PropType<Key[]>,
    default: () => []
  }
} as const

export type TreeProps = Partial<ExtractPropTypes<typeof treeProps>>

// 树节点
export const treeNodeProps = {
  node: {
    type: Object as PropType<TreeNode>,
    required: true
  },
  expanded: {
    type: Boolean,
    required: true
  }
} as const
export type TreeNodeProps = ExtractPropTypes<typeof treeNodeProps>

// 展开树节点
export const treeNodeEvents = {
  toggle: (node: TreeNode) => node
}
