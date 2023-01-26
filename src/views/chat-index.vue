<template>
  <el-card class="main-content">
    <side-column></side-column>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </el-card>
</template>

<script setup lang="ts">
import sideColumn from "@/components/header-row.vue";
</script>

<style scoped lang="scss">
.main-content {
  width: 980px;
  height: 680px;
  ::v-deep(.el-card__body) {
    display: flex;
    flex-direction: column;
    padding: 0;
    height: 100%;
  }
}
</style>
