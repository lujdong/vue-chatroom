<template>
  <div class="list-container">
    <room-item
      :class="[{ active: item.selected }]"
      v-for="item in data.roomList"
      :key="item.id"
      :info="item"
      @select="selectRoomItem(item)"
    ></room-item>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import roomItem from "./room-item.vue";

const data = reactive({
  roomList: [
    {
      id: 1,
      avatar:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      title: "无话不谈",
      content: "你好你好",
      date: "2023/1/24",
      selected: false,
    },
    {
      id: 2,
      avatar:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      title: "李四",
      content: "呵呵呵呵呵",
      date: "2023/1/23",
      selected: false,
    },
    {
      id: 3,
      avatar:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      title: "张三",
      content: "黑二级",
      date: "2023/1/20",
      selected: false,
    },
  ],
});

const selectRoomItem = (item: any) => {
  console.log("item: ", item);
  data.roomList.forEach((i) => {
    i.selected = i.id == item.id;
  });
  console.log("selectRoomItem");
};
</script>

<style scoped lang="scss">
.list-container {
  width: 260px;
  height: 100%;
  border-right: 1px solid #eee;
}
.active {
  background: #ccc;
}
</style>
