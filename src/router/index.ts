import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/home-page.vue"),
    },
    {
      path: "/chat",
      name: "chat",
      redirect: "chat/chat-room",
      component: () => import("@/views/chat-index.vue"),
      children: [
        {
          path: "chat-room",
          name: "chat-room",
          component: () => import("@/views/chat-room.vue"),
        },
      ],
    },
  ],
});

export default router;
