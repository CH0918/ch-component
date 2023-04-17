<script setup lang="ts">
import { AddCircleSharp } from '@vicons/ionicons5'
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
  <div class="test">test...</div>
  <div class="button">11</div>
  <div class="parent">
    <div class="child">
      222
      <div class="other-child">333</div>
    </div>
  </div>
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
