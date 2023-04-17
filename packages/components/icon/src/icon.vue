<template>
  <i :class="bem.b()" :style="style">
    <slot></slot>
  </i>
</template>

<script lang="ts" setup>
import { createNamespace } from '@ch/utils/create';
import { computed } from 'vue';
import { iconProps } from './icon';

// 给组件命名
defineOptions({
  name: 'CIcon',
});
const bem = createNamespace('icon');
const props = defineProps(iconProps);

const style = computed(() => {
  if (!props.color && !props.size) return {};
  return {
    ...(props.color ? { color: props.color } : {}),
    ...(props.size ? { 'font-size': props.size + 'px' } : {}),
  };
});
</script>

<style scoped></style>
