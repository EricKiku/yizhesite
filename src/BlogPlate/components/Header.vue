<script lang="ts" setup>
import { ref } from "vue";
import { gsap } from "gsap";
import { useRoute, useRouter } from "vue-router";
import { useDeviceStore } from "@/stores/deviceType";
const route = useRoute();
const router = useRouter();
const store = useDeviceStore();
function goPath(name: string) {
  router.push({
    name,
  });
}
</script>

<template>
  <div :class="{ header: store.isDesktop(), mob_header: store.isMobile() }">
    <div class="item home" @click="goPath('/')">主站</div>
    <div
      class="item"
      :class="{ active: route.path === '/blog/home' }"
      @click="goPath('blog')"
    >
      首页
    </div>
    <div
      class="item"
      :class="{ active: route.path === '/blog/list' }"
      @click="goPath('list')"
    >
      博客
    </div>
    <div
      class="item"
      :class="{ active: route.path === '/blog/essay' }"
      @click="goPath('essay')"
    >
      随笔
    </div>
  </div>
</template>

<style scoped lang="less">
.mob_header {
  width: 100%;
  height: 40px;
  background-color: white;
  border-radius: 5px;
  border: 1px solid #e8e8e8;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  z-index: 100;

  .home {
    transition: all 0.2s;
    padding-right: 5px;
    border-right: 3px solid var(--AccColor);
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;

    &:hover {
      transform: scale(1.1);
      color: var(--TerColor);
      text-shadow: 5px 5px 8px rgba(171, 126, 5, 0.677);
    }
  }

  .item {
    font-weight: bold;
    cursor: pointer;

    &:hover {
      color: var(--TerColor);
    }
  }

  .active {
    color: var(--TerColor);
    border-bottom: 3px solid var(--AccColor);
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
  }
}
.header {
  width: 20%;
  height: 40px;
  background-color: white;
  border-radius: 20px;
  border: 1px solid #e8e8e8;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  top: 5px;
  z-index: 100;

  .home {
    transition: all 0.2s;
    padding-right: 5px;
    border-right: 3px solid var(--AccColor);
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;

    &:hover {
      transform: scale(1.1);
      color: var(--TerColor);
      text-shadow: 5px 5px 8px rgba(171, 126, 5, 0.677);
    }
  }

  .item {
    font-weight: bold;
    cursor: pointer;

    &:hover {
      color: var(--TerColor);
    }
  }

  .active {
    color: var(--TerColor);
    border-bottom: 3px solid var(--AccColor);
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
  }
}
</style>
