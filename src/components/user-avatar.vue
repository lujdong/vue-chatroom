<template>
  <div class="avatar">
    <el-avatar :size="50" :src="props.src" />
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    src: string;
  }>(),
  {
    src: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
  }
);
console.log("头像：", props.src);
</script>

<style scoped>
.avatar {
  cursor: pointer;
}
</style>
