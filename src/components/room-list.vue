<template>
  <div class="list-container">
    <room-item
      :class="[{ active: activeGroup }]"
      v-for="item in socketStore.roomList"
      :key="item.id"
      :info="item"
      @select="selectRoomItem(item)"
    ></room-item>
  </div>
</template>

<script setup lang="ts">
import { useSocketStore } from "@/store/socket";
import { reactive, ref } from "vue";
import roomItem from "./room-item.vue";

const props = defineProps<{
  data: any[];
}>();
const emits = defineEmits<{
  (event: "change", room: any): void;
}>();

const activeGroup = ref(false);

const selectRoomItem = (item: any) => {
  activeGroup.value = true;
  emits("change", item);
  socketStore.currentRoom = item;
};

const socketStore = useSocketStore();
console.log(socketStore.roomList);
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
