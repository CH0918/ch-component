<template>
  <div :class="bem.b()">
    <c-tree-node
      v-for="node in flattenTree"
      :key="node.key"
      :node="node"
      :expanded="isExpanded(node)"
      :loadingKeys="loadingKeysRef"
      :selectedKeys="selectedKeys"
      :show-checkbox="showCheckbox"
      @toggle="expandTreeNode"
      @select="handleSelect"
    ></c-tree-node>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'

import { treeProps, type TreeNode, TreeOption, Key, treeEvents } from './tree'
import { createNamespace } from '@ch/utils/create'
import CTreeNode from './treeNode.vue'

defineOptions({
  name: 'CTree'
})
const props = defineProps(treeProps)
const bem = createNamespace('tree')

// 用户传进来的数据结构字段可以自定义，这里格式化数据结构
const tree = ref<TreeNode[]>([])
function createTreeOption(key: string, label: string, children: string) {
  return {
    getKey(node: TreeOption) {
      return node[key] as Key // 用户传递的key
    },
    getLabel(node: TreeOption) {
      return node[label] as string // 用户传递label
    },
    getChildren(node: TreeOption) {
      return node[children] as TreeOption[] // 用户传递的children获取孩子
    }
  }
}
const treeOption = createTreeOption(
  props.keyFiled,
  props.labelFiled,
  props.childrenFiled
)
function normalizedTreeData(
  data: TreeOption[],
  parent: TreeNode | null = null
): TreeNode[] {
  function traversal(data: TreeOption[], parent: TreeNode | null = null) {
    return data.map(node => {
      const children = treeOption.getChildren(node) || []
      const childrenLen = children.length
      const treeNode: TreeNode = {
        key: treeOption.getKey(node),
        label: treeOption.getLabel(node),
        children: [],
        isLeaf: node.isLeaf ?? childrenLen === 0,
        level: parent ? parent.level + 1 : 0,
        rawNode: node,
        disabled: !!node.disabled
      }
      if (childrenLen > 0) {
        treeNode.children = traversal(children, treeNode)
      }
      return treeNode
    })
  }
  const result = traversal(data, parent)
  return result
}

watch(
  () => props.data,
  (data: TreeOption[]) => {
    console.log('data = ', data)
    tree.value = normalizedTreeData(data)
    console.log('tree.value = ', tree.value)
  },
  {
    immediate: true
  }
)

// 用户可以自定义需要展开的树节点
// 用户传进来的要展开的key
//defaultExpandedKeys
const normalizeKeys = props.defaultExpandedKeys?.map(key => String(key))
const defaultExpandedKeys = ref(new Set(normalizeKeys))
// 拍平的结果
// 拍平后的树
const flattenTree = computed(() => {
  // 深度优先遍历
  // 全部数据
  const nodes = tree.value || []
  const flattenResult: TreeNode[] = []
  // 用栈来保存数据
  const stack: TreeNode[] = []
  for (let i = nodes.length - 1; i >= 0; --i) {
    stack.push(nodes[i])
  }
  while (stack.length) {
    const headNode = stack.pop()
    if (!headNode) continue
    // 最顶层的节点一定会展示
    flattenResult.push(headNode)
    if (defaultExpandedKeys.value.has(String(headNode.key))) {
      const children = headNode.children
      if (children) {
        for (let i = children.length - 1; i >= 0; --i) {
          stack.push(children[i])
        }
      }
    }
  }
  return flattenResult
})

// 展开节点
const isExpanded = (node: TreeNode) => {
  return defaultExpandedKeys.value.has(String(node.key))
}

const collepse = (node: TreeNode) => {
  defaultExpandedKeys.value.delete(String(node.key))
}
const expand = (node: TreeNode) => {
  defaultExpandedKeys.value.add(String(node.key))
  triggleLoading(node)
}

// 存储正在加载的节点
const loadingKeysRef = ref(new Set<Key>())
const expandTreeNode = (node: TreeNode) => {
  // 是否已经处于展开状态
  const isExpanded = defaultExpandedKeys.value.has(String(node.key))
  const isLoading = loadingKeysRef.value.has(String(node.key))

  if (isExpanded && !isLoading) {
    // 不是展开状态并且不是正在loading则收缩
    collepse(node)
  } else {
    // 展开
    expand(node)
  }
}

// 动态加载树节点
function triggleLoading(node: TreeNode) {
  if (!node.children.length && !node.isLeaf) {
    // 节点本身没有子节点，并且用户自己定义节点不是叶子节点，这时候就是用户想动态加载数据了
    const loadingKeys = loadingKeysRef.value
    if (!loadingKeys.has(String(node.key))) {
      // 防止重复加载
      if (props.onLoad) {
        loadingKeys.add(String(node.key))
        // 执行用户传进来的动态加载函数
        props.onLoad(node.rawNode).then((children: TreeOption[]) => {
          node.rawNode.children = children
          node.children = normalizedTreeData(children, node)
          // 加载完之后移除正在加载的队列
          loadingKeys.delete(String(node.key))
        })
      }
    }
  }
}

const emit = defineEmits(treeEvents)
// 多选节点
const selectedKeys = ref<Key[]>([])
let keys = selectedKeys.value
// 初始化数据
watch(
  () => props.selectedKeys,
  value => {
    if (value) {
      keys = value.map(String)
      selectedKeys.value = value.map(String)
    }
  },
  {
    immediate: true
  }
)
const handleSelect = (node: TreeNode) => {
  if (!props.selectable) return
  const nodeKey = String(node.key)
  const index = keys.indexOf(nodeKey)

  if (props.multiple) {
    // 支持多选
    if (index > -1) {
      keys.splice(index, 1)
    } else {
      keys.push(nodeKey)
    }
  } else {
    // 单选
    if (index > -1) {
      keys = []
    } else {
      keys.push(nodeKey)
    }
  }
  emit('update:selectedKeys', keys)
}
</script>

<style scoped></style>
