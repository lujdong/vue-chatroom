<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <div class="container">
    <RouterView />
  </div>
</template>

<style scoped>
.container {
  background-image: url(./assets/bg.png);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
