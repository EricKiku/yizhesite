<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { gsap } from "gsap";
import { useRoute } from "vue-router";
import { useDeviceStore } from "@/stores/deviceType";
const route = useRoute();
const store = useDeviceStore();
onMounted(() => {
  // 选择图片元素
  const image: HTMLElement = document.querySelector(".image-3d") as HTMLElement;

  // 监听鼠标移动事件
  image.addEventListener("mousemove", (e: MouseEvent) => {
    // 计算鼠标相对于图片的位置
    const rect = image.getBoundingClientRect();
    const x: number = e.clientX - rect.left;
    const y: number = e.clientY - rect.top;
    const width = rect.width;
    const height = rect.height;

    // 根据鼠标位置计算旋转角度
    const rotateX = (x / width - 0.5) * 50; // 左右移动，范围约为-10度到10度
    const rotateY = (y / height - 0.5) * 50; // 上下移动，范围约为-10度到10度

    // 应用3D旋转和缩放动画
    gsap.to(image, {
      duration: 0.3,
      transform: `perspective(500px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale3d(1.02, 1.02, 1)`,
      immediateRender: true,
    });
  });

  // 监听鼠标离开事件，重置图片位置
  image.addEventListener("mouseleave", () => {
    gsap.to(image, {
      duration: 0.3,
      transform:
        "perspective(500px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)",
    });
  });
});
</script>

<template>
  <div
    :class="{ me: store.isDesktop(), mob_me: store.isMobile() }"
    v-show="route.path === '/blog/home'"
  >
    <div class="left" v-if="store.isDesktop()">
      <h1>Hi!👋</h1>
      <h1 class="name">
        <span>I'm </span>
        <span class="_name">yizhe</span>
      </h1>
    </div>
    <div class="right">
      <img class="image-3d" src="../../assets/images/yizhe_avatar.png" alt="" />
    </div>
    <div class="left" v-if="store.isMobile()">
      <h1>Hi!👋</h1>
      <h1 class="name">
        <span>I'm </span>
        <span class="_name">yizhe</span>
      </h1>
    </div>
  </div>
</template>

<style scoped lang="less">
.mob_me {
  width: 100%;
  height: auto;
  padding-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .left {
    h1 {
      font-size: 4rem;
      font-weight: bold;
      font-family: "Madimi One", monospace;
      text-shadow: 5px 5px 8px rgba(171, 126, 5, 0.677);
    }

    .name {
      display: flex;
      align-items: center;

      ._name {
        color: var(--TerColor);
        font-family: "Madimi One", sans-serif;
        margin-left: 25px;
      }
    }
  }

  .right {
    img {
      width: 200px;
      height: 200px;
      border-radius: 50%;
      transition: transform 0.3s ease;
      transform-style: preserve-3d;
      perspective: 500px;
    }
  }
}
.me {
  height: 100vh;
  width: 50%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .left {
    h1 {
      font-size: 5rem;
      font-weight: bold;
      font-family: "Madimi One", monospace;
      text-shadow: 5px 5px 8px rgba(171, 126, 5, 0.677);
    }

    .name {
      display: flex;
      align-items: center;

      ._name {
        color: var(--TerColor);
        font-family: "Madimi One", sans-serif;
        margin-left: 25px;
      }
    }
  }

  .right {
    img {
      width: 300px;
      height: 300px;
      border-radius: 50%;
      transition: transform 0.3s ease;
      transform-style: preserve-3d;
      /* 子元素的3D位置得以保持 */
      perspective: 500px;
      /* 设置观察者的视角 */
    }
  }
}
</style>
