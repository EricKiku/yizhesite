<script lang="ts" setup>
import { onMounted, ref, onUnmounted } from "vue";
import Footer from "@/components/Footer.vue";
import SiderBar from "./components/SiderBar.vue";
import Main from "./components/Main.vue";
import axios from "axios";
import { getTools } from "@/api/api";
import gsap from "gsap";
import Loading from "./components/Loading.vue";
import { useRouter } from "vue-router";
import { useDeviceStore } from "@/stores/deviceType";
const store = useDeviceStore();
const router = useRouter();
let allTools = ref<any>(null);

onMounted(() => {
  getToolsFun();
  watchScroll();
});

function getToolsFun() {
  getTools()
    .then((res) => {
      if (res.status === 200) {
        allTools.value = res.data;
      } else {
        setTimeout(() => {
          getToolsFun();
        }, 1000);
      }
    })
    .catch((err) => {
      setTimeout(() => {
        getToolsFun();
      }, 1000);
    });
}
const head = ref<any>(null);
// 监听滚动事件，如果当前滚动条不在顶部
function watchScroll() {
  window.addEventListener("scroll", handleScroll);
}
onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

function handleScroll() {
  if (store.isMobile()) return;
  if (window.scrollY > 0) {
    // 使用gsap将元素width变为auto
    gsap.to(head.value, {
      width: "auto",
      duration: 0.2,
      overwrite: "auto",
    });
  } else {
    gsap.to(head.value, {
      width: "100%",
      duration: 0.2,
      overwrite: "auto",
    });
  }
}
function toHome() {
  router.push("/");
}
</script>

<template>
  <div
    :class="{ head: store.isDesktop(), mob_head: store.isMobile() }"
    ref="head"
  >
    <div class="logo">
      <div>yizhe <span class="bold">藏宝阁</span></div>
    </div>
    <div class="btn" @click="toHome">主站->></div>
  </div>
  <Loading v-if="!allTools" />
  <div class="tools" v-if="allTools">
    <div
      :class="{ container: store.isDesktop(), mob_container: store.isMobile() }"
    >
      <SiderBar :data="allTools" />
      <Main :data="allTools" />
    </div>
  </div>
  <Footer />
</template>

<style scoped lang="less">
.mob_head {
  width: 100%;
  height: 40px;
  background-color: #f9f7f7;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 100;
  display: flex;
  align-items: center;
  font-size: 22px;
  font-family: "ZCOOL KuaiLe", sans-serif;
  color: var(--NeuColor);
  box-sizing: border-box;
  padding: 0 20px;
  transition: all 0.2s;
  border-bottom: 1px solid #e0e0e0;
  position: fixed;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.1);

  &:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  }

  .bold {
    font-weight: bold;
    font-size: 22px;
    text-shadow: 5px 5px 8px rgba(171, 126, 5, 0.677);
  }

  .btn {
    margin-left: auto;
    padding: 1px 3px;
    background-color: var(--AccColor);
    color: white;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.2s;
    font-size: 16px;
    margin: 0px 10px;

    &:hover {
      background-color: var(--TerColor);
    }
  }
}
.head {
  width: 100%;
  height: 70px;
  background-color: #f9f7f7;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 100;
  display: flex;
  align-items: center;
  font-size: 30px;
  font-family: "ZCOOL KuaiLe", sans-serif;
  color: var(--NeuColor);
  box-sizing: border-box;
  padding: 0 20px;
  transition: all 0.2s;
  border-bottom: 1px solid #e0e0e0;
  position: fixed;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.1);

  &:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  }

  .bold {
    font-weight: bold;
    font-size: 32px;
    text-shadow: 5px 5px 8px rgba(171, 126, 5, 0.677);
  }

  .btn {
    margin-left: auto;
    padding: 1px 3px;
    background-color: var(--AccColor);
    color: white;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.2s;
    font-size: 16px;
    margin: 0px 10px;

    &:hover {
      background-color: var(--TerColor);
    }
  }
}

.tools {
  width: 100%;
  background-color: #fefefe;
  display: flex;
  justify-content: center;
  .mob_container {
    margin-top: 50px;
    width: 100%;
    height: 100%;
    display: flex;
    padding: 10px;
    box-sizing: border-box;
  }
  .container {
    margin-top: 100px;
    width: 80%;
    height: 100%;
    display: flex;
    padding: 40px;
    box-sizing: border-box;
  }
}
</style>
