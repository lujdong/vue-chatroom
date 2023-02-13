<template>
  <div class="list-container">
    <room-item
      :class="[{ active: item.selected }]"
      v-for="item in props.data"
      :key="item.id"
      :info="item"
      @select="selectRoomItem(item)"
    ></room-item>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import roomItem from "./room-item.vue";

const props = defineProps<{
  data: any[];
}>();
const emits = defineEmits<{
  (event: "change", room: any): void;
}>();

const selectRoomItem = (item: any) => {
  console.log("item: ", item);
  props.data.forEach((i) => {
    i.selected = i.id == item.id;
  });
  console.log("selectRoomItem");
  emits("change", item);
};
</script>

<style scoped lang="scss">
.list-container {
  width: 260px;
  height: 100%;
  flex-shrink: 0;
  border-right: 1px solid #eee;
}
.active {
  background: #ccc;
}
</style>
