<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from "vue";
import BlogPlate from "@/components/HomePlate/BlogPlate.vue";
import MyInfoPlate from "@/components/HomePlate/MyInfoPlate.vue";
import Footer from "@/components/Footer.vue";
import { useRouter } from "vue-router";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useDeviceStore } from "@/stores/deviceType";
const store = useDeviceStore();
const router = useRouter();
interface CallBackFunction {
  (): void;
}
interface Throttle {
  (callback: CallBackFunction, time: number): CallBackFunction;
}
gsap.registerPlugin(ScrollTrigger);
// 获取所有的section，并设置背景图片
const sections = ref<HTMLElement[]>([]);
// 第一个区域DOM元素
const section_dom1 = ref<HTMLElement | null>(null);
onMounted(() => {
  sections.value = Array.from(document.querySelectorAll("section"));
  scroll();
  // 监听滚动事件
  watchScroll();
});
// 滚动效果
function scroll() {
  if (store.isDesktop()) {
    sections.value.forEach((section) => {
      gsap.fromTo(
        section,
        {
          backgroundPositionY: `-${window.innerHeight / 2}px`,
        },
        {
          backgroundPositionY: `${window.innerHeight / 2}px`,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            scrub: true,
          },
        }
      );
    });
  } else {
    if (section_dom1.value) {
      gsap.fromTo(
        section_dom1.value,
        {
          backgroundPositionY: `-${section_dom1.value.clientHeight / 2}px`,
        },
        {
          backgroundPositionY: `${section_dom1.value.clientHeight / 2}px`,
          ease: "none",
          scrollTrigger: {
            trigger: section_dom1.value,
            scrub: true,
          },
        }
      );
    }
  }
}
let lastScrollTop = 0;
// 监听滚动事件
function watchScroll() {
  // 以节流方式监听滚动事件
  window.addEventListener("scroll", handleScroll, false);
}

const throttle: Throttle = (callback: CallBackFunction, time: number) => {
  let lastTime: number = 0;
  return function () {
    const now: number = new Date().getTime();
    if (now - lastTime > time) {
      callback();
      lastTime = now;
    }
  };
};
const handleScroll: CallBackFunction = throttle(() => {
  // 监听滚动条是向上还是向下滚动
  let st = window.pageYOffset || document.documentElement.scrollTop;
  if (store.isDesktop()) {
    if (st > lastScrollTop) {
      // 向下滚动，收缩.header
      gsap.to(".header", { y: "-64px", duration: 0.5 });
    } else {
      // 向上滚动，展开.header
      gsap.to(".header", { y: "2px", duration: 0.5 });
    }
  } else {
    if (st > lastScrollTop) {
      // 向下滚动，收缩.header
      gsap.to(".mob_header", { y: "-64px", duration: 0.5 });
    } else {
      // 向上滚动，展开.header
      gsap.to(".mob_header", { y: "0px", duration: 0.5 });
    }
  }
  lastScrollTop = st <= 0 ? 0 : st; // 为负则置为0，因为iOS有负的滚动
}, 100);

onUnmounted(() => {
  // 移除滚动事件
  window.removeEventListener("scroll", handleScroll, false);
});

function goPath(name: string) {
  router.push({
    name,
  });
}

// mobild
const header_isExtend = ref<boolean>(false);
const extend = ref<HTMLElement | null>(null);
const close = ref<HTMLElement | null>(null);
function changeStatus(): void {
  new Promise((resolve) => {
    header_isExtend.value = !header_isExtend.value;
    resolve(true);
  }).then(() => {
    // 使用gsap实现header_isExtend为true时，extend的高度从0到100%的动画
    if (extend.value) {
      if (header_isExtend.value) {
        gsap.to(extend.value, {
          height: "auto",
          duration: 0.3,
          ease: "power1.inOut",
        });
      } else {
        gsap.to(extend.value, {
          height: "0px",
          duration: 0.2,
          ease: "power1.inOut",
        });
      }
    }
    // 旋转close图标
    if (close.value) {
      if (header_isExtend.value) {
        gsap.to(close.value, {
          rotate: 90,
          duration: 0.3,
          ease: "power1.inOut",
        });
      } else {
        gsap.to(close.value, {
          rotate: 0,
          duration: 0.3,
          ease: "power1.inOut",
        });
      }
    }
  });
}
</script>

<template>
  <div class="home">
    <div :class="{ header: store.isDesktop(), mob_header: store.isMobile() }">
      <div class="avatar pointer">
        <a href="https://github.com/EricKiku" target="_blank">
          <img src="../assets/images/yizhe_avatar.png" alt="yizhe"
        /></a>
      </div>
      <div class="header_list" v-if="store.isDesktop()">
        <div class="item" @click="goPath('blog')">博客</div>
        <div class="item" @click="goPath('tools')">藏宝阁</div>
      </div>
      <div class="avatar pointer" v-if="store.isDesktop()">
        <a href="https://github.com/EricKiku/yizhesite" target="_blank">
          <img src="../assets/images/github.png" alt="yizhe"
        /></a>
      </div>
      <div class="avatar pointer list" v-if="store.isMobile()">
        <img
          v-if="!header_isExtend"
          @click="changeStatus"
          src="../assets/images/list.png"
        />
        <img
          ref="close"
          v-if="header_isExtend"
          @click="changeStatus"
          src="../assets/images/close.png"
        />
      </div>
      <div ref="extend" class="header_list" v-if="store.isMobile()">
        <div class="item" @click="goPath('blog')">
          <img src="../assets/images/nav.png" alt="" /> <span>博客</span>
        </div>
        <div class="item" @click="goPath('tools')">
          <img src="../assets/images/nav.png" alt="" /> <span>藏宝阁</span>
        </div>
        <div class="bottom">
          <a href="https://github.com/EricKiku/yizhesite" target="_blank">
            <img src="../assets/images/github.png" alt="yizhe"
          /></a>
        </div>
      </div>
    </div>
    <section ref="section_dom1" class="section section1">
      <MyInfoPlate />
    </section>
    <section
      class="section2"
      :class="{ section: store.isDesktop(), mob_section: store.isMobile() }"
    >
      <BlogPlate
        :img="'https://cdn.jsdelivr.net/gh/EricKiku/pictures@main/img/preview2.png'"
        :toPath="'/blog'"
      />
    </section>
    <section
      class="section3"
      :class="{ section: store.isDesktop(), mob_section: store.isMobile() }"
    >
      <BlogPlate
        :img="'https://cdn.jsdelivr.net/gh/EricKiku/pictures@main/img/plate_visual.png'"
        :toPath="'http://www.erickiku.top:8111'"
        target="_blank"
      />
    </section>
    <section
      class="section4"
      :class="{ section: store.isDesktop(), mob_section: store.isMobile() }"
    >
      <BlogPlate
        :img="'https://cdn.jsdelivr.net/gh/EricKiku/pictures@main/img/toolspreview.png'"
        :toPath="'/tools'"
      />
    </section>
  </div>
  <Footer />
</template>

<style scoped lang="less">
.header {
  height: 60px;
  background-color: var(--SecColor);
  color: var(--PriColor);
  display: flex;
  align-items: center;
  padding: 0px 15px;
  box-sizing: border-box;
  font-size: 2em;
  position: fixed;
  width: 60%;
  top: 2px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 30px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  z-index: 10;

  .avatar {
    width: 40px;
    height: 40px;

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }

  .header_list {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
    align-items: center;

    .item {
      margin: 0 20px;
      cursor: pointer;
      transition: all 0.2s;
      font-size: 20px;
      font-family: "Roboto", sans-serif;
      border-radius: 25px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 10px 20px;

      &:hover {
        background-color: var(--PriColor);
        color: var(--SecColor);
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
      }
    }
  }
}
.mob_header {
  background-color: var(--SecColor);
  color: var(--PriColor);
  display: flex;
  justify-content: space-between;
  align-items: center;
  // padding: 10px 15px;
  box-sizing: border-box;
  font-size: 2em;
  position: fixed;
  width: 100%;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  z-index: 10;
  padding: 5px;
  .avatar {
    display: flex;
    align-items: center;
    width: 40px;
    a {
      display: flex;
      align-items: center;
    }
    img {
      width: 80%;
      height: 80%;
      border-radius: 50%;
    }
  }

  .header_list {
    position: absolute;
    top: 100%;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 0%;
    background-color: inherit;
    overflow: hidden;
    .item {
      margin: 10px 0;
      cursor: pointer;
      transition: all 0.2s;
      font-size: 16px;
      border-radius: 5px;
      width: 70%;
      display: flex;
      align-items: center;
      padding: 10px 5px;
      border-bottom: 1px solid #ccc;
      &:hover {
        background-color: var(--PriColor);
        color: var(--SecColor);
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
      }
      img {
        width: 20px;
        height: 20px;
        margin-right: 5px;
      }
    }
    .bottom {
      margin: 5px 0px;
      img {
        width: 30px;
        height: 30px;
      }
    }
  }

  .list {
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 20px;
      height: 20px;
    }
  }
}
.section {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3em;
  /* 图片背景铺满不重复 */
  background: no-repeat center center/cover;
  color: var(--PrimaryColor);
}
.mob_section {
  padding: 50px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3em;
  /* 图片背景铺满不重复 */
  background: no-repeat center center/cover;
  color: var(--PrimaryColor);
}
.section1 {
  /** background-image: url(https://yizhesite-1317876382.cos.ap-beijing.myqcloud.com/my-info-bg.jpg); */
  background-image: url(https://cdn.jsdelivr.net/gh/EricKiku/pictures@main/img/8048.jpg);
}

.section2 {
  background-image: url(https://cdn.jsdelivr.net/gh/EricKiku/pictures@main/img/blogbgsmall.jpg);
}

.section3 {
  background-image: url(https://cdn.jsdelivr.net/gh/EricKiku/pictures@main/img/visual_plate_bg.png);
}

.section4 {
  background-image: url(https://cdn.jsdelivr.net/gh/EricKiku/pictures@main/img/toolsbg.jpg);
}
</style>
