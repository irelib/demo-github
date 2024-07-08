<template>
  <div class="SlideIn">
    <div class="slide" v-slide-in="{ distance: 100, duration: 500 }" v-for="i in 50" :style="`background: ${colorList[(i - 1) % 10]}`">
      {{ i }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { colorList } from "@/utils";
</script>

<style scoped lang="scss">
.SlideIn {
  width: 1000px;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 50px;

  .slide {
    width: 100%;
    height: 750px;
    border-radius: 12px;
    font-size: 68px;
    line-height: 750px;
    text-align: center;
    flex-shrink: 0;
  }
}
</style>
