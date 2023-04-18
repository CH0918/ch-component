<template>
  <div :class="bem.b()" :style="{ marginLeft: `${16 * node.level}px` }">
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
    <span>
      {{ node.label }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { treeNodeProps, treeNodeEvents, TreeNode } from './tree'
import { createNamespace } from '@ch/utils/create'
import Switcher from './icon/Switcher'
import Loading from './icon/Loading'
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
</script>

<style scoped></style>
