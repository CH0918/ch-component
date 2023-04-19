<template>
  <div
    :class="[
      bem.b(),
      bem.is('selected', isSelected),
      bem.is('disabled', node.disabled)
    ]"
    :style="{ marginLeft: `${16 * node.level}px` }"
    @click.stop="select(node)"
  >
    <span
      :class="[
        bem.e('expand-icon'),
        bem.is('leaf', node.isLeaf),
        { expanded: !node.isLeaf && expanded }
      ]"
    >
      <c-icon v-if="!isLoading" :size="20">
        <switcher @click="expandTreeNode(node)"></switcher>
      </c-icon>
      <c-icon v-else :size="14">
        <loading></loading>
      </c-icon>
    </span>
    <span :class="bem.e('label')">
      <tree-node-content :node="node"> </tree-node-content>
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { treeNodeProps, treeNodeEvents, TreeNode } from './tree'
import { createNamespace } from '@ch/utils/create'
import Switcher from './icon/Switcher'
import Loading from './icon/Loading'
import treeNodeContent from './treeNodeContent'

defineOptions({
  name: 'TreeNode'
})
const bem = createNamespace('tree-node')
const props = defineProps(treeNodeProps)

// 收缩功能
const emit = defineEmits(treeNodeEvents)
const expandTreeNode = (node: TreeNode) => {
  emit('toggle', node)
}
// 是否正在加载
const isLoading = computed(() => {
  return props.loadingKeys.has(String(props.node.key))
})

// 点击选择节点
const select = (node: TreeNode) => {
  if (props.disabled) return
  emit('select', node)
}
// 是否选中
const isSelected = computed(() => {
  return props.selectedKeys.includes(String(props.node.key))
})
</script>

<style scoped></style>
