import { ExtractPropTypes, PropType } from 'vue'

export type Key = string | number

export interface TreeNode extends Required<TreeOption> {
  level: number
  // isLeaf: boolean
  children: TreeNode[]
  rawNode: TreeOption
  disabled: boolean
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
  },
  multiple: {
    type: Boolean
  },
  selectable: {
    type: Boolean,
    default: false
  },
  selectedKeys: {
    type: Array as PropType<Key[]>
  },
  showCheckbox: {
    type: Boolean,
    default: false
  },
  defaultCheckedKeys: {
    type: Array as PropType<Key[]>,
    default: () => []
  },
  onLoad: {
    type: Function as PropType<(node: TreeOption) => Promise<TreeOption[]>>
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
  },
  loadingKeys: {
    type: Object as PropType<Set<Key>>,
    default: () => []
  },
  selectedKeys: {
    type: Object as PropType<Key[]>,
    default: () => []
  },
  showCheckbox: {
    type: Boolean,
    default: false
  },
  checked: Boolean,
  disabled: Boolean
} as const
export type TreeNodeProps = ExtractPropTypes<typeof treeNodeProps>

export const treeNodeEvents = {
  // 展开树节点
  toggle: (node: TreeNode) => node,
  select: (node: TreeNode) => node
}

// 树事件
export const treeEvents = {
  // 双向绑定树
  'update:selectedKeys': (keys: Key[]) => keys,
  update: (keys: Key[]) => keys
}
