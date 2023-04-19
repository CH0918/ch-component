<script setup lang="ts">
import { AddCircleSharp } from '@vicons/ionicons5'
import { ref, computed } from 'vue'
import { Key, TreeOption } from '@ch/components/tree'

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

// function createData() {
//   return [
//     {
//       label: nextLabel(),
//       key: 1,
//       isLeaf: false
//     },
//     {
//       label: nextLabel(),
//       key: 2,
//       isLeaf: false
//     }
//   ]
// }
// function nextLabel(currentLabel?: Key): Key {
//   if (!currentLabel) return 'Out of Tao, One is born'
//   if (currentLabel === 'Out of Tao, One is born') return 'Out of One, Two'
//   if (currentLabel === 'Out of One, Two') return 'Out of Two, Three'
//   if (currentLabel === 'Out of Two, Three') {
//     return 'Out of Three, the created universe'
//   }
//   if (currentLabel === 'Out of Three, the created universe') {
//     return 'Out of Tao, One is born'
//   }
//   return ''
// }
const data = ref<TreeOption[]>(createData())

// const handleLoad = (node: TreeOption) => {
//   return new Promise<TreeOption[]>(resolve => {
//     setTimeout(() => {
//       resolve([
//         {
//           label: nextLabel(node.label),
//           key: node.key + String(nextLabel(node.label)),
//           isLeaf: false
//         }
//       ])
//     }, 2000)
//   })
// }

const selectedKeys = ref<Key[]>(['1'])

const checkKeys = ref<Key[]>([])

// const data = ref<TreeOption[]>([
//   {
//     key: '0',
//     label: '0',
//     children: [
//       {
//         key: '0-0',
//         label: '0-0'
//       },
//       {
//         disabled: true,
//         key: '0-1',
//         label: '0-1',
//         children: [
//           {
//             label: '0-1-0',
//             key: '0-1-0'
//           },
//           {
//             label: '0-1-1',
//             key: '0-1-1'
//           }
//         ]
//       }
//     ]
//   }
// ])
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
  <!-- <c-tree
    label-filed="xx"
    key-filed="key"
    children-filed="children"
    :data="data"
    :default-expanded-keys="[40, '4030', '4030210', 41]"
  ></c-tree> -->
  <!-- <c-tree :data="data" :on-load="handleLoad"></c-tree> -->
  <!-- {{ selectedKeys }}
  <c-tree
    v-model:selectedKeys="selectedKeys"
    :data="data"
    selectable
    multiple
  ></c-tree> -->
  <!-- <c-tree :data="data"></c-tree> -->

  <c-tree :data="data" labelFiled="xx">
    <template #default="{ node }"> {{ node.key }}-{{ node.label }}</template>
  </c-tree>
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
