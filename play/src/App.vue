<script setup lang="ts">
import { AddCircleSharp } from '@vicons/ionicons5'
import { ref } from 'vue'
import { TreeOption } from '@ch/components/tree'

function createData(level = 4, parentKey = ''): any {
  if (!level) return []
  const arr = new Array(20 - level).fill(0)
  return arr.map((_, idx: number) => {
    const key = parentKey + level + idx
    return {
      xx: createLabel(level), // 显示的内容
      key, // 为了唯一性
      children: createData(level - 1, key) // 孩子
    }
  })
}
function createLabel(level: number): string {
  if (level === 4) return '道生一'
  if (level === 3) return '一生二'
  if (level === 2) return '二生三'
  if (level === 1) return '三生万物'
  return ''
}

const data = ref<TreeOption[]>(createData())
</script>

<template>
  <c-icon size="16" color="red">
    <AddCircleSharp></AddCircleSharp>
  </c-icon>
  <c-icon size="16" color="blue">
    <AddCircleSharp></AddCircleSharp>
  </c-icon>
  <c-icon size="16" color="red">
    <AddCircleSharp></AddCircleSharp>
  </c-icon>
  <c-tree
    label-filed="xx"
    key-filed="key"
    children-filed="children"
    :data="data"
    :default-expanded-keys="[40, '4030', '4030210', 41]"
  ></c-tree>
</template>

<style scoped lang="scss">
$color: red !default;
$color: green;
@mixin center($width, $height, $bg) {
  width: $width;
  height: $height;
  background: $bg;
}
.test1 {
  width: 50px;
  height: 50px;
  background: red;
}
.test {
  color: $color;
  // @include center(20px, 20px, skyblue);
  @extend .test1;
}
@mixin hover {
  &:not([disabled]):hover {
    @content;
  }
}

.button {
  border: 1px solid black;
  @include hover {
    border-width: 2px;
  }
}

.parent {
  $color: red;
  .child {
    color: $color;
    @at-root .other-child {
      color: blue;
    }
  }
}
</style>
