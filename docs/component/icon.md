# Icon 图标

c-ui 推荐使用 xicons 作为图标库。

```
$ pnpm install @vicons/ionicons5
```

## 使用图标

- 如果你想像用例一样直接使用，你需要全局注册组件，才能够直接在项目里使用。

<script setup lang="ts">
import { CashOutline } from '@vicons/ionicons5'
</script>
<c-icon color="red" size="40">
  <CashOutline/>
</c-icon>

<c-icon color="green" size="40">
  <CashOutline/>
</c-icon>
<c-icon color="blue" size="40">
  <CashOutline/>
</c-icon>
<div>

<c-icon color="red" size="60">
  <CashOutline/>
</c-icon>

<c-icon color="green" size="60">
  <CashOutline/>
</c-icon>

<c-icon color="blue" size="60">
  <CashOutline/>
</c-icon>
</div>

```vue
<script setup lang="ts">
import { CashOutline } from '@vicons/ionicons5'
</script>
<template>
  <c-icon color="red" size="40">
    <CashOutline />
  </c-icon>
</template>
```

## API

### Icon Props

| 名称  | 类型             | 默认值    | 说明     |
| ----- | ---------------- | --------- | -------- |
| color | string           | undefined | 图标颜色 |
| size  | number \| string | undefined | 图片大小 |
