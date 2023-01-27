<template>
  <div class="room-content">
    <div class="room-header">
      <div class="title">无话不谈</div>
      <el-icon class="icon">
        <MoreFilled />
      </el-icon>
    </div>
    <div class="room-content">
      <chat-record></chat-record>
    </div>
    <div class="room-footer">
      <div class="media-row">
        <el-icon>
          <img src="../assets/emotion-happy.png" alt="" class="smile-icon" />
        </el-icon>
        <el-icon>
          <Picture />
        </el-icon>
        <el-icon>
          <Files />
        </el-icon>
      </div>
      <el-input
        :rows="6"
        type="textarea"
        placeholder="请输入内容"
        resize="none"
      />
      <div class="send-btn">
        <el-button type="primary">发 送</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import chatRecord from "./chat-record.vue";
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
  .room-content {
    flex: 1;
    border-bottom: 1px solid #eee;
    background: #f9f9f9;
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
</style>
