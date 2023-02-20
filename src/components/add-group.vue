<template>
  <el-dialog
    class="dialog"
    v-model="dialogVisible"
    title="新建分组"
    width="420px"
    top="380px"
    :close-on-click-modal="false"
    @close="onClose"
  >
    <el-form size="large">
      <el-form-item>
        <el-input
          v-model="groupName"
          autocomplete="off"
          placeholder="请输入分组名称"
          clearable
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary" @click="createGroupAction">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { createFriendGroup } from "@/api";
import { useUserStore } from "@/store/user";
import type { FriendsGroupResponse } from "@/types/friends";
import type { ResponseDataType } from "@/types/response";
import { ElMessage } from "element-plus";
import { ref, watch } from "vue";

const props = defineProps<{
  show: boolean;
}>();

const emit = defineEmits<{
  (event: "close"): void;
}>();

const dialogVisible = ref(false);

watch(
  () => props.show,
  () => {
    dialogVisible.value = props.show;
  },
  {
    immediate: true,
  }
);

const groupName = ref("");
const userStore = useUserStore();

const createGroupAction = async () => {
  const data = (await createFriendGroup({
    userId: userStore.user?.id as string,
    groupName: groupName.value,
  })) as ResponseDataType<FriendsGroupResponse>;

  ElMessage.success(data.message);
  onClose();
};

const onClose = () => {
  dialogVisible.value = false;
  emit("close");
  groupName.value = "";
};
</script>

<style scoped lang="scss">
.dialog {
  :deep(.el-dialog__body) {
    padding-bottom: 0;
  }
}
</style>
