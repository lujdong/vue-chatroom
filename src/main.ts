import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedState from "pinia-plugin-persistedstate";

import App from "./App.vue";
import router from "./router";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";

import EmojiPicker from "vue3-emoji-picker";
import "vue3-emoji-picker/css";

import "normalize.css";
import "@/assets/main.scss";

const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.component("emoji-picker", EmojiPicker);

const pinia = createPinia();
pinia.use(piniaPluginPersistedState);
app.use(pinia);
app.use(router);
app.use(ElementPlus, {
  locale: zhCn,
});

app.mount("#app");
