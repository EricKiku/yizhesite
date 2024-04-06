<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useDeviceStore } from "@/stores/deviceType";
const router = useRouter();
const store = useDeviceStore();
interface RouterFunction {
  (url: string, target: string): void;
}
interface menu {
  name: string;
  url: string;
  icon: string;
  isBlank: boolean;
  active_background: string;
}
interface content {
  url: string;
  icon: string;
  title: string;
}
const goPage: RouterFunction = (url: string, target: string): void => {
  if (target === "_blank") {
    window.open(url);
  } else {
    router.push(url);
  }
};

const menus = ref<Array<menu>>([
  {
    name: "博客",
    url: "/blog",
    icon: "https://cdn.jsdelivr.net/gh/EricKiku/pictures@main/img/blog.png",
    isBlank: false,
    active_background: "#4D94FF",
  },
  {
    name: "可视化",
    url: "http://www.erickiku.top:8111/",
    icon: "https://cdn.jsdelivr.net/gh/EricKiku/pictures@main/img/keshihua.png",
    isBlank: true,
    active_background: "#0E5FAE",
  },
  {
    name: "藏宝阁",
    url: "/tools",
    icon: "https://cdn.jsdelivr.net/gh/EricKiku/pictures@main/img/cang1.png",
    isBlank: false,
    active_background: "#FFA500",
  },
]);
const contents = ref<Array<content>>([
  {
    url: "https://github.com/EricKiku",
    icon: "M12,2.2467A10.00042,10.00042,0,0,0,8.83752,21.73419c.5.08752.6875-.21247.6875-.475,0-.23749-.01251-1.025-.01251-1.86249C7,19.85919,6.35,18.78423,6.15,18.22173A3.636,3.636,0,0,0,5.125,16.8092c-.35-.1875-.85-.65-.01251-.66248A2.00117,2.00117,0,0,1,6.65,17.17169a2.13742,2.13742,0,0,0,2.91248.825A2.10376,2.10376,0,0,1,10.2,16.65923c-2.225-.25-4.55-1.11254-4.55-4.9375a3.89187,3.89187,0,0,1,1.025-2.6875,3.59373,3.59373,0,0,1,.1-2.65s.83747-.26251,2.75,1.025a9.42747,9.42747,0,0,1,5,0c1.91248-1.3,2.75-1.025,2.75-1.025a3.59323,3.59323,0,0,1,.1,2.65,3.869,3.869,0,0,1,1.025,2.6875c0,3.83747-2.33752,4.6875-4.5625,4.9375a2.36814,2.36814,0,0,1,.675,1.85c0,1.33752-.01251,2.41248-.01251,2.75,0,.26251.1875.575.6875.475A10.0053,10.0053,0,0,0,12,2.2467Z",
    title: "GitHub",
  },
  {
    url: "https://space.bilibili.com/350120067",
    icon: "M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 0 1-.373-.906c0-.356.124-.658.373-.907l.027-.027c.267-.249.573-.373.92-.373.347 0 .653.124.92.373L9.653 4.44c.071.071.134.142.187.213h4.267a.836.836 0 0 1 .16-.213l2.853-2.747c.267-.249.573-.373.92-.373.347 0 .662.151.929.4.267.249.391.551.391.907 0 .355-.124.657-.373.906zM5.333 7.24c-.746.018-1.373.276-1.88.773-.506.498-.769 1.13-.786 1.894v7.52c.017.764.28 1.395.786 1.893.507.498 1.134.756 1.88.773h13.334c.746-.017 1.373-.275 1.88-.773.506-.498.769-1.129.786-1.893v-7.52c-.017-.765-.28-1.396-.786-1.894-.507-.497-1.134-.755-1.88-.773zM8 11.107c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c0-.373.129-.689.386-.947.258-.257.574-.386.947-.386zm8 0c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c.017-.391.15-.711.4-.96.249-.249.56-.373.933-.373Z",
    title: "BiliBili",
  },
  {
    url: "https://blog.csdn.net/Eirckiku?spm=1000.2115.3001.5343",
    icon: "M 8.974 6.872 C 0.693 15.153 6.647 26.664 17.750 23.838 C 20.357 23.175 22.000 22.183 22.000 21.271 C 22.000 20.234 21.472 20.015 20.250 20.545 C 13.281 23.570 8.000 21.300 8.000 15.279 C 8.000 8.546 12.007 4.932 17.123 7.051 C 20.649 8.511 22.286 7.413 19.557 5.418 C 16.390 3.102 12.164 3.682 8.974 6.872",
    title: "CSDN",
  },
  {
    url: "mailto:2966678301@qq.com",
    icon: "M7 18.4299H11L15.45 21.39C16.11 21.83 17 21.3599 17 20.5599V18.4299C20 18.4299 22 16.4299 22 13.4299V7.42993C22 4.42993 20 2.42993 17 2.42993H7C4 2.42993 2 4.42993 2 7.42993V13.4299C2 16.4299 4 18.4299 7 18.4299Z",
    title: "Email",
  },
]);
</script>

<template>
  <div :class="{ my: store.isDesktop(), mob_my: store.isMobile() }">
    <div class="container left">
      <div class="top">
        <img class="name" src="../../assets/images/yizhe_text.png" alt="" />
      </div>
      <div class="bottom boli">
        <a
          class="btn"
          v-for="(content, index) in contents"
          :key="index"
          :href="content.url"
          target="_blank"
          :title="content.title"
        >
          <svg
            width="30"
            height="30"
            fill="#333333"
            viewBox="0 0 24 24"
            id="github"
          >
            <path :d="content.icon"></path>
          </svg>
        </a>
      </div>
    </div>
    <div class="container right" v-if="store.isDesktop()">
      <div class="btn-conteiner">
        <div
          class="btn-content"
          v-for="(menu, index) in menus"
          :key="index"
          @click="goPage(menu.url, menu.isBlank ? '_blank' : '')"
          :style="{ '--active-background': menu.active_background }"
        >
          <div class="btn-title" style="display: flex; align-items: center">
            <img :src="menu.icon" alt="" />
            <div class="btn-text">{{ menu.name }}</div>
          </div>
          <span class="icon-arrow">
            <svg
              width="66px"
              height="43px"
              viewBox="0 0 66 43"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
            >
              <g
                id="arrow"
                stroke="none"
                stroke-width="1"
                fill="none"
                fill-rule="evenodd"
              >
                <path
                  id="arrow-icon-one"
                  d="M40.1543933,3.89485454 L43.9763149,0.139296592 C44.1708311,-0.0518420739 44.4826329,-0.0518571125 44.6771675,0.139262789 L65.6916134,20.7848311 C66.0855801,21.1718824 66.0911863,21.8050225 65.704135,22.1989893 C65.7000188,22.2031791 65.6958657,22.2073326 65.6916762,22.2114492 L44.677098,42.8607841 C44.4825957,43.0519059 44.1708242,43.0519358 43.9762853,42.8608513 L40.1545186,39.1069479 C39.9575152,38.9134427 39.9546793,38.5968729 40.1481845,38.3998695 C40.1502893,38.3977268 40.1524132,38.395603 40.1545562,38.3934985 L56.9937789,21.8567812 C57.1908028,21.6632968 57.193672,21.3467273 57.0001876,21.1497035 C56.9980647,21.1475418 56.9959223,21.1453995 56.9937605,21.1432767 L40.1545208,4.60825197 C39.9574869,4.41477773 39.9546013,4.09820839 40.1480756,3.90117456 C40.1501626,3.89904911 40.1522686,3.89694235 40.1543933,3.89485454 Z"
                  fill="#FFFFFF"
                ></path>
                <path
                  id="arrow-icon-two"
                  d="M20.1543933,3.89485454 L23.9763149,0.139296592 C24.1708311,-0.0518420739 24.4826329,-0.0518571125 24.6771675,0.139262789 L45.6916134,20.7848311 C46.0855801,21.1718824 46.0911863,21.8050225 45.704135,22.1989893 C45.7000188,22.2031791 45.6958657,22.2073326 45.6916762,22.2114492 L24.677098,42.8607841 C24.4825957,43.0519059 24.1708242,43.0519358 23.9762853,42.8608513 L20.1545186,39.1069479 C19.9575152,38.9134427 19.9546793,38.5968729 20.1481845,38.3998695 C20.1502893,38.3977268 20.1524132,38.395603 20.1545562,38.3934985 L36.9937789,21.8567812 C37.1908028,21.6632968 37.193672,21.3467273 37.0001876,21.1497035 C36.9980647,21.1475418 36.9959223,21.1453995 36.9937605,21.1432767 L20.1545208,4.60825197 C19.9574869,4.41477773 19.9546013,4.09820839 20.1480756,3.90117456 C20.1501626,3.89904911 20.1522686,3.89694235 20.1543933,3.89485454 Z"
                  fill="#FFFFFF"
                ></path>
                <path
                  id="arrow-icon-three"
                  d="M0.154393339,3.89485454 L3.97631488,0.139296592 C4.17083111,-0.0518420739 4.48263286,-0.0518571125 4.67716753,0.139262789 L25.6916134,20.7848311 C26.0855801,21.1718824 26.0911863,21.8050225 25.704135,22.1989893 C25.7000188,22.2031791 25.6958657,22.2073326 25.6916762,22.2114492 L4.67709797,42.8607841 C4.48259567,43.0519059 4.17082418,43.0519358 3.97628526,42.8608513 L0.154518591,39.1069479 C-0.0424848215,38.9134427 -0.0453206733,38.5968729 0.148184538,38.3998695 C0.150289256,38.3977268 0.152413239,38.395603 0.154556228,38.3934985 L16.9937789,21.8567812 C17.1908028,21.6632968 17.193672,21.3467273 17.0001876,21.1497035 C16.9980647,21.1475418 16.9959223,21.1453995 16.9937605,21.1432767 L0.15452076,4.60825197 C-0.0425130651,4.41477773 -0.0453986756,4.09820839 0.148075568,3.90117456 C0.150162624,3.89904911 0.152268631,3.89694235 0.154393339,3.89485454 Z"
                  fill="#FFFFFF"
                ></path>
              </g>
            </svg>
          </span>
        </div>
      </div>
    </div>

    <!-- Mobile -->
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
          <span>可视化</span>
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
    position: absolute;
    left: 30%;
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
      .btn {
        display: grid;
        place-items: center;
        background: #e3edf7;
        border-radius: 10px;
        padding: 3px 7px;
        margin: 5px;
        box-shadow: inset 4px 4px 6px -1px rgba(0, 0, 0, 0.2),
          inset -4px -4px 6px -1px rgba(255, 255, 255, 0.7),
          -0.5px -0.5px 0px rgba(255, 255, 255, 1),
          0.5px 0.5px 0px rgba(0, 0, 0, 0.15),
          0px 12px 10px -10px rgba(0, 0, 0, 0.05);
        border: 1px solid rgba(0, 0, 0, 0.1);
        cursor: pointer;
        transition: transform 0.5s;
        &:hover {
          box-shadow: 6px 6px 10px -1px rgba(0, 0, 0, 0.15),
            -6px -6px 10px -1px rgba(255, 255, 255, 0.7);
          border: 1px solid rgba(0, 0, 0, 0);
          transform: translateY(5px);

          svg {
            transform: scale(1.1);
            fill: #0092e4;
          }
        }
        svg {
          transition: transform 0.5s;
        }
      }
    }
  }

  .right {
    margin-left: 30px;
    position: absolute;
    left: 50%;
    //
    .btn-conteiner {
      display: flex;
      justify-content: center;
      flex-direction: column;
      --color-text: #ffffff;
      --color-background: #1f1f1f46;
      --color-shadow: #00000080;
      position: relative;
    }

    .btn-content {
      display: flex;
      align-items: center;
      padding: 5px 30px;
      text-decoration: none;
      font-weight: 400;
      font-size: 22px;
      color: var(--color-text);
      background: var(--color-background);
      transition: 1s;
      border-radius: 100px;
      box-shadow: 0 0 0.2em 0 var(--color-background);
      cursor: pointer;
      margin: 10px 0;
      position: relative;
      width: fit-content;
      img {
        width: 25px;
        height: 25px;
        margin-right: 15px;
        vertical-align: middle;
      }
      .btn-text {
        width: 80px;
        font-size: 24px;
        font-family: "Madimi One", sans-serif;
        // 内容文字两边对齐
        text-align: justify;
        text-align-last: justify;
      }
    }

    .btn-content:hover,
    .btn-content:focus {
      transition: 0.5s;
      -webkit-animation: btn-content 1s;
      animation: btn-content 1s;
      outline: 0.1em solid transparent;
      outline-offset: 0.2em;
      box-shadow: 0 0 0.4em 0 #e98a0e6f;
      background-color: var(--active-background);
    }

    .btn-content .icon-arrow {
      transition: 0.5s;
      margin-right: 0px;
      transform: scale(0.6);
    }

    .btn-content:hover .icon-arrow {
      transition: 0.5s;
      margin-right: 25px;
    }

    .icon-arrow {
      width: 20px;
      margin-left: 15px;
      position: relative;
      top: 6%;
    }

    /* SVG */
    #arrow-icon-one {
      transition: 0.4s;
      transform: translateX(-60%);
    }

    #arrow-icon-two {
      transition: 0.5s;
      transform: translateX(-30%);
    }

    .btn-content:hover #arrow-icon-three {
      animation: color_anim 1s infinite 0.2s;
    }

    .btn-content:hover #arrow-icon-one {
      transform: translateX(0%);
      animation: color_anim 1s infinite 0.6s;
    }

    .btn-content:hover #arrow-icon-two {
      transform: translateX(0%);
      animation: color_anim 1s infinite 0.4s;
    }

    /* SVG animations */
    @keyframes color_anim {
      0% {
        fill: white;
      }

      50% {
        fill: var(--color-background);
      }

      100% {
        fill: white;
      }
    }

    /* Button animations */
    @-webkit-keyframes btn-content {
      0% {
        outline: 0.2em solid var(--color-background);
        outline-offset: 0;
      }
    }

    @keyframes btn-content {
      0% {
        outline: 0.2em solid var(--color-background);
        outline-offset: 0;
      }
    }
  }
}
</style>
