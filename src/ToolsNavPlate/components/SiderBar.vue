<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { type Item } from "../types/index";
import axios from "axios";
import { useDeviceStore } from "@/stores/deviceType";
import { gsap } from "gsap";
const store = useDeviceStore();
const props = defineProps({
  data: {
    type: Array<Item>,
    default: [],
  },
});
// 所有分类
let allClass = ref<string[]>([]);
onMounted(() => {
  allClass.value = getAllClass(props.data);
});
// 获取所有分类
function getAllClass(data: Array<Item>): string[] {
  // 遍历data，获取所有class
  let classArr: string[] = [];
  data.forEach((item: Item) => {
    let tempClass: string = item.class as string;
    classArr.push(tempClass);
  });
  return Array.from(new Set(classArr));
}

// 展开目录
let class_isExtend = ref<boolean>(false);
const class_toc = ref<HTMLElement | null>(null);
const right_img = ref<HTMLElement | null>(null);
function changeExtend() {
  if (store.isDesktop()) return;
  new Promise((resolve, reject) => {
    class_isExtend.value = !class_isExtend.value;
    resolve(true);
  }).then(() => {
    // 使用gsap让元素的宽度变为50%
    if (class_isExtend.value) {
      gsap.to(class_toc.value, {
        width: "50%",
        duration: 0.2,
        overwrite: "auto",
      });
      // right_img元素旋转180度
      gsap.to(right_img.value, {
        rotate: 180,
        duration: 0.2,
        overwrite: "auto",
      });
    } else {
      gsap.to(class_toc.value, {
        width: "20px",
        duration: 0.2,
        overwrite: "auto",
      });
      // right_img元素旋转180度
      gsap.to(right_img.value, {
        rotate: 0,
        duration: 0.2,
        overwrite: "auto",
      });
    }
    // 全局点击事件
    document.addEventListener("click", close_extend);
  });
}
function close_extend() {
  class_isExtend.value = false;
  gsap.to(class_toc.value, {
    width: "20px",
    duration: 0.2,
    overwrite: "auto",
  });
  // right_img元素旋转180度
  gsap.to(right_img.value, {
    rotate: 0,
    duration: 0.2,
    overwrite: "auto",
  });
  document.removeEventListener("click", close_extend);
}
</script>

<template>
  <div
    ref="class_toc"
    :class="{ outside: store.isDesktop(), mob_outside: store.isMobile() }"
  >
    <img
      ref="right_img"
      v-if="store.isMobile()"
      @click.stop="changeExtend"
      src="../assets/imgs/right.png"
      alt=""
    />
    <template v-if="store.isDesktop()">
      <div class="siderbar">
        <div class="class" v-for="item in allClass" :key="item">
          <a :href="'#' + item">
            <div class="item">
              <img
                v-if="store.isMobile()"
                src="../../assets/images/nav.png"
                alt=""
              />
              <span>{{ item }}</span>
            </div>
          </a>
        </div>
      </div>
    </template>
    <template v-if="store.isMobile()">
      <div class="siderbar" v-if="class_isExtend">
        <div class="class" v-for="item in allClass" :key="item">
          <a :href="'#' + item">
            <div class="item">
              <img src="../../assets/images/nav.png" alt="" />
              <span>{{ item }}</span>
            </div>
          </a>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped lang="less">
.mob_outside {
  width: 20px;
  position: fixed;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  background-color: white;
  height: auto;
  min-height: 20px;
  z-index: 999;
  overflow: hidden;
  border: 1px solid #ccc;
  border-radius: 5px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  img {
    width: 20px;
    height: 20px;
  }
  .siderbar {
    font-family: "ZCOOL KuaiLe", sans-serif;
    display: flex;
    flex-direction: column;
    justify-content: right;

    .class {
      padding: 10px;
      color: var(--NeuColor);
      cursor: pointer;
      display: flex;
      align-items: center;
      transition: all 0.2s;
      justify-content: center;

      &:hover {
        color: var(--AccColor);
      }

      a {
        text-decoration: none;
        color: var(--NeuColor);
        width: 100%;
        &:hover {
          color: var(--AccColor);
        }
      }

      .item {
        display: flex;
        align-items: center;
        border-bottom: 0.5px solid rgba(0, 0, 0, 0.1);
        img {
          width: 20px;
          height: 20px;
          margin-right: 15px;
          opacity: 0.5;
        }
      }
    }
  }
}
.outside {
  width: 150px;
  .siderbar {
    font-family: "ZCOOL KuaiLe", sans-serif;
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: right;

    .class {
      padding: 10px;
      color: var(--NeuColor);
      cursor: pointer;
      display: flex;
      align-items: center;
      transition: all 0.2s;
      justify-content: center;

      &:hover {
        color: var(--AccColor);
      }

      img {
        width: 20px;
        height: 20px;
      }

      a {
        text-decoration: none;
        color: var(--NeuColor);

        &:hover {
          color: var(--AccColor);
        }
      }

      .item {
        width: 100px;
        text-align: left;
      }
    }
  }
}
</style>
