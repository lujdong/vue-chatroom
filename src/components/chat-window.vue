<template>
  <div class="room-content">
    <div class="room-header">
      <div class="title">
        {{ socketStore.currentRoom?.groupName }}（{{
          socketStore.roomUsers.length
        }}）
      </div>
      <el-icon class="icon">
        <MoreFilled />
      </el-icon>
    </div>
    <div class="chat-content">
      <chat-record></chat-record>
    </div>
    <div class="room-footer">
      <div class="media-row">
        <el-icon>
          <img
            @click="showEmojiPicker = !showEmojiPicker"
            src="../assets/emotion-happy.png"
            alt=""
            class="smile-icon"
          />
          <emoji-picker
            v-show="showEmojiPicker"
            class="emoji-picker"
            display-recent
            @select="onSelectEmoji"
          ></emoji-picker>
        </el-icon>
        <el-icon>
          <Picture />
        </el-icon>
        <el-icon>
          <Files />
        </el-icon>
      </div>
      <el-input
        ref="inputRef"
        v-model="content"
        :rows="6"
        type="textarea"
        placeholder="请输入内容"
        resize="none"
      />
      <div class="send-btn">
        <el-button type="primary" @click="sendMessage">发 送</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSocketStore } from "@/store/socket";
import { useUserStore } from "@/store/user";
import type { ChatGroupMap } from "@/types/chat-group";
import { MoreFilled, Picture, Files } from "@element-plus/icons-vue";
import { ElIcon, ElInput, ElButton } from "element-plus";
import { ref } from "vue";
import chatRecord from "./chat-record.vue";

const props = defineProps<{
  currentChat: ChatGroupMap | null;
}>();
console.log("props: ", props.currentChat);

const content = ref("");

const socketStore = useSocketStore();
const { user } = useUserStore();

const sendMessage = () => {
  if (!content.value) return;
  if (socketStore.socket?.connected) {
    socketStore.socket.emit("message", {
      fromId: user?.id,
      toId: socketStore.currentRoom?.id,
      content: content.value,
    });
    content.value = "";
  }
};

const inputRef = ref<HTMLFormElement | null>(null);
const showEmojiPicker = ref(false);
const onSelectEmoji = (emoji: any) => {
  if (inputRef.value?.selectionStart || inputRef.value?.selectionStart === 0) {
    // 得到光标前的位置
    const startPos = inputRef.value?.selectionStart;
    // 得到光标后的位置
    const endPos = inputRef.value?.selectionEnd;
    // 在加入数据之前获得滚动条的高度
    const restoreTop = inputRef.value?.scrollTop;
    // emoji表情插入至当前光标指定位置
    content.value =
      content.value.substring(0, startPos) +
      emoji.i +
      content.value.substring(endPos || 0, content.value.length);
    // 如果滚动条高度大于0
    if (restoreTop > 0) {
      // 返回
      inputRef.value.scrollTop = restoreTop;
    }
    inputRef.value?.focus();
    // 设置光标位置至emoji表情后一位
    const position = startPos + emoji.length;
    if (inputRef.value?.setSelectionRange) {
      inputRef.value?.focus();
      setTimeout(() => {
        inputRef.value?.setSelectionRange(position, position);
      }, 10);
    } else if (inputRef.value?.createTextRange) {
      const range = inputRef.value?.createTextRange();
      range.collapse(true);
      range.moveEnd("character", position);
      range.moveStart("character", position);
      range.select();
    }
  } else {
    content.value += emoji.i;
    inputRef.value?.focus();
  }
  showEmojiPicker.value = false;
};
</script>

<style scoped lang="scss">
.room-content {
  display: flex;
  flex-direction: column;
  .room-header {
    height: 48px;
    line-height: 48px;
    padding: 0 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #eee;

    .icon {
      cursor: pointer;
    }
  }
  .chat-content {
    flex: 1;
    background: #f9f9f9;
    border-bottom: 1px solid #eee;
  }

  .room-footer {
    // padding: 8px 16px;
    height: 220px;
    .media-row {
      display: flex;
      align-items: center;
      height: 32px;
      padding: 0 8px;
      i {
        margin-right: 12px;
        cursor: pointer;
      }
      .smile-icon {
        width: 16px;
        height: 16px;
      }
    }
    .send-btn {
      margin-top: 12px;
      padding-right: 32px;
      text-align: right;
    }
  }
}

.emoji-picker {
  position: absolute;
  left: 20px;
  z-index: 99;
  bottom: 0;
}
</style>
