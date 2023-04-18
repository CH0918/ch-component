<template>
  <div :class="bem.b()" :style="{ marginLeft: `${16 * node.level}px` }">
    <span
      :class="[
        bem.e('expand-icon'),
        bem.is('leaf', node.isLeaf),
        { expanded: !node.isLeaf && expanded }
      ]"
    >
      <c-icon :size="20" color="blue">
        <Switcher @click="expandTreeNode(node)"></Switcher>
      </c-icon>
    </span>
    <span>
      {{ node.label }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { treeNodeProps, treeNodeEvents, TreeNode } from './tree'
import { createNamespace } from '@ch/utils/create'
import Switcher from './switcher'

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
</script>

<style scoped></style>
