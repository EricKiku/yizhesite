<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useDeviceStore } from "@/stores/deviceType";
const router = useRouter();
const store = useDeviceStore();
interface RouterFunction {
  (url: string, target: string): void;
}
const goPage: RouterFunction = (url: string, target: string): void => {
  if (target === "_blank") {
    window.open(url);
  } else {
    router.push(url);
  }
};
</script>

<template>
  <div :class="{ my: store.isDesktop(), mob_my: store.isMobile() }">
    <div class="container left">
      <div class="top">
        <img class="name" src="../../assets/images/yizhe_text.png" alt="" />
      </div>
      <div class="bottom boli">
        <a href="https://github.com/EricKiku" target="_blank"
          ><img
            class="contact pointer"
            src="../../assets/images/contacts/github.png"
            alt=""
        /></a>
        <a href="https://space.bilibili.com/350120067" target="_blank"
          ><img
            class="contact pointer"
            src="../../assets/images/contacts/bilibili.png"
            alt=""
        /></a>
        <a
          href="https://blog.csdn.net/Eirckiku?spm=1000.2115.3001.5343"
          target="_blank"
          ><img
            class="contact pointer"
            src="../../assets/images/contacts/csdn.png"
            alt=""
        /></a>
        <a href="mailto:2966678301@qq.com" target="_blank"
          ><img
            class="contact pointer"
            src="../../assets/images/contacts/email.png"
            alt=""
        /></a>
      </div>
    </div>
    <div class="container right" v-if="store.isDesktop()">
      <div class="line line1">
        <div class="box boli" @click="goPage('/blog', '')">
          <img src="../../assets/images/blog.png" alt="" />
          <span>博客</span>
        </div>
        <div
          class="box boli"
          @click="goPage('http://www.erickiku.top:8111/', '_blank')"
        >
          <img
            src="https://cdn.jsdelivr.net/gh/EricKiku/pictures@main/img/keshihua.png"
            alt=""
          />
          <span>可视化Demo</span>
        </div>
      </div>
      <div class="line line2">
        <div class="box boli" @click="goPage('/tools', '')">
          <img
            src="https://cdn.jsdelivr.net/gh/EricKiku/pictures@main/img/cang1.png"
            alt=""
          />
          <span>藏宝阁</span>
        </div>
        <!-- <div class="box boli">
                    <img src="../../assets/images/blog.png" alt="">
                    <span>博客</span>
                </div> -->
      </div>
    </div>
    <div class="right boli" v-if="store.isMobile()">
      <div class="right_container">
        <div class="box" @click="goPage('/blog', '')">
          <img class="nav_icon" src="../../assets/images/lupai.png" alt="" />
          <img src="../../assets/images/blog.png" alt="" />
          <span>博客</span>
        </div>
        <div
          class="box"
          @click="goPage('http://www.erickiku.top:8111/', '_blank')"
        >
          <img class="nav_icon" src="../../assets/images/lupai.png" alt="" />
          <img
            src="https://cdn.jsdelivr.net/gh/EricKiku/pictures@main/img/keshihua.png"
            alt=""
          />
          <span>可视化Demo</span>
        </div>
        <div class="box" @click="goPage('/tools', '')">
          <img class="nav_icon" src="../../assets/images/lupai.png" alt="" />
          <img
            src="https://cdn.jsdelivr.net/gh/EricKiku/pictures@main/img/cang1.png"
            alt=""
          />
          <span>藏宝阁</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.mob_my {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .boli {
    /**毛玻璃片效果**/
    backdrop-filter: blur(3px);
    background-color: rgba(29, 29, 29, 0.266);
  }

  .container {
    padding: 20px;
  }

  .left {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .top {
      .name {
        height: 60px;
      }
    }

    .bottom {
      display: flex;
      justify-content: left;
      align-items: center;
      border-radius: 5px;
      padding: 5px 10px;

      a {
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      img {
        width: 25px;
        height: 25px;
        margin: 10px;
        transition: all 0.2s;

        &:hover {
          transform: scale(1.2);
        }
      }
    }
  }

  .right {
    // display: flex;
    // flex-direction: column;
    border-radius: 5px;
    padding: 3px;
    box-shadow: rgba(151, 65, 252, 0.2) 0 15px 30px -5px;
    background-image: linear-gradient(144deg, #af40ff, #5b42f3 50%, #00ddeb);
    .right_container {
      display: flex;
      flex-direction: column;
      background: rgb(5, 6, 45);
      border-radius: 5px;
      width: 100%;
      height: 100%;
    }
    .box {
      border-radius: 5px;
      margin: 5px;
      font-size: 16px;
      padding: 20px 20px 20px 10px;
      display: flex;
      align-items: center;
      transition: all 0.2s;
      cursor: pointer;
      .nav_icon {
        width: 20px;
        height: 20px;
        margin-right: 10px;
        border-right: 1px solid white;
      }
      &:hover {
        transform: scale(1.1);
      }

      span {
        margin-left: 5px;
        color: rgb(174, 176, 184);
      }

      img {
        width: 20px;
        height: 20px;
        /**图片垂直居中 */
        vertical-align: middle;
        margin-left: 15px;
      }
    }
  }
}
.my {
  display: flex;
  justify-content: center;
  align-items: center;
  .boli {
    /**毛玻璃片效果**/
    backdrop-filter: blur(3px);
    background-color: rgba(29, 29, 29, 0.266);
  }

  .container {
    border-radius: 10px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .left {
    margin-right: 30px;

    .top {
      .avatar {
        width: 60px;
        height: 60px;
        border-radius: 50%;
      }

      .name {
        height: 60px;
      }
    }

    .bottom {
      display: flex;
      justify-content: left;
      align-items: center;
      // width: 100%;
      border-radius: 5px;
      padding: 5px 10px;

      a {
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      img {
        width: 25px;
        height: 25px;
        margin: 10px;
        transition: all 0.2s;

        &:hover {
          transform: scale(1.2);
        }
      }
    }
  }

  .right {
    margin-left: 30px;

    .line {
      display: flex;
      justify-content: center;

      .box {
        border-radius: 5px;
        margin: 10px;
        font-size: 20px;
        padding: 20px 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: all 0.2s;
        cursor: pointer;

        &:hover {
          transform: scale(1.1);
        }

        span {
          margin-left: 10px;
          color: white;
        }

        img {
          width: 25px;
          height: 25px;
          /**图片垂直居中 */
          vertical-align: middle;
        }
      }
    }
  }
}
</style>
