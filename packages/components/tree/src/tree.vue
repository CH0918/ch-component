<template>
  <div :class="bem.b()">
    <c-tree-node
      v-for="node in flattenTree"
      :key="node.key"
      :node="node"
      :expanded="isExpanded(node)"
      @toggle="expandTreeNode"
    ></c-tree-node>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'

import { treeProps, type TreeNode, TreeOption, Key } from './tree'
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
function createData(
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
        level: parent ? parent.level + 1 : 0
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
    tree.value = createData(data)
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
}
const expandTreeNode = (node: TreeNode) => {
  // 是否已经处于展开状态
  const isExpanded = defaultExpandedKeys.value.has(String(node.key))
  if (isExpanded) {
    // 收缩
    collepse(node)
  } else {
    // 展开
    expand(node)
  }
}
</script>

<style scoped></style>
