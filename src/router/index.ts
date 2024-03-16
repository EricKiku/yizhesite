import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "/",
      component: () => import("@/views/Home.vue"),
    },
    {
      path: "/blog",
      name: "blog",
      component: () => import("@/BlogPlate/BlogHome.vue"),
      redirect: "/blog/home",
      children: [
        {
          path: "/blog/home",
          name: "home",
          component: () => import("@/BlogPlate/views/BlogHomeList.vue"),
        },
        {
          path: "/blog/list",
          name: "list",
          component: () => import("@/BlogPlate/views/ArticleList.vue"),
        },
        {
          path: "/blog/essay",
          name: "essay",
          component: () => import("@/BlogPlate/views/EssayList.vue"),
        },
        {
          path: "/blog/article",
          name: "article",
          component: () => import("@/BlogPlate/components/article.vue"),
        },
      ],
    },
    {
      path: "/tools",
      name: "tools",
      component: () => import("@/ToolsNavPlate/ToolsNavHome.vue"),
    },
  ],
});

export default router;
