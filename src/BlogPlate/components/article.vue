<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import MarkdownIt from "markdown-it";
import hljs from "highlight.js";
import "highlight.js/styles/vs.css";
import axios from "axios";
import { addView } from "@/api/api";
import { gsap } from "gsap";
import { useDeviceStore } from "@/stores/deviceType";
const store = useDeviceStore();
type Toc = {
  level: string;
  title: string;
  children?: Toc[];
};
interface GetToc {
  (md: string): Toc[];
}
interface AddAnchor {
  (md: string): string;
}
const route = useRoute();
let markdownContent = ref<string>("");
let loading = ref<boolean>(false);
// 目录结构
let toc = ref<Toc[]>([]);
// 封面路径，标题
// 获取查询参数
const coverUrl = route.query.coverUrl as string;
const title = route.query.title as string;
onMounted(() => {
  // 把滚动条重置到顶部
  scrollTop();
  // 获取route中的参数
  const md = new MarkdownIt({
    highlight: function (str: string, lang: string) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(str, { language: lang }).value;
        } catch (__) {}
      }
      return ""; // 使用这种方式防止未知语言导致的错误
    },
  });
  let path = route.query.path as string;
  axios(path).then((res) => {
    markdownContent.value = md.render(res.data);
    markdownContent.value = addAnchor(markdownContent.value);
    loading.value = true;
    // 生成目录
    toc.value = getToc(markdownContent.value);
    // 加锚点
  });
  addPreview();
});
function scrollTop(): void {
  // 重置滚动条到顶部
  window.scrollTo(0, 0);
}
// 增加浏览量
function addPreview(): void {
  let id: any = route.query.bid;
  addView(id);
}
// 处理目录
const getToc: GetToc = (md: string): Toc[] => {
  const toc: Toc[] = [];
  const reg = /<h([1-2])[^>]*>([^<]+)<\/h[1-2]>/gi;
  let result;
  while ((result = reg.exec(md)) !== null) {
    toc.push({
      level: result[1],
      title: result[2],
    });
  }
  // 遍历目录，生成树形结构
  toc.forEach((item: any, index: number) => {
    if (item.level === "1") {
      item.children = [];
      for (let i = index + 1; i < toc.length; i++) {
        if (toc[i].level === "1") {
          break;
        }
        if (toc[i].level === "2") {
          item.children.push(toc[i]);
        }
      }
    }
  });
  // 如果没有一级目录，则直接返回所有二级目录
  if (toc[0].level !== "1") {
    return toc.filter((item: any) => item.level === "2");
  }
  // 把所有二级目录放到一级目录下
  for (let i = toc.length - 1; i >= 0; i--) {
    if (toc[i].level === "2") {
      toc.splice(i, 1);
    }
  }
  return toc;
};

// 给标题加锚点
const addAnchor: AddAnchor = (md: string) => {
  return md.replace(
    /<h([1-2])[^>]*>([^<]+)<\/h[1-2]>/gi,
    '<h$1 id="$2">$2</h$1>'
  );
};

// 监听滚动
// window.addEventListener('scroll', function () {

//     const article = document.querySelector('.article')
//     const toc = document.querySelector('.toc')
//     if (article && toc) {
//         if (window.scrollY > article.getBoundingClientRect().top) {
//             gsap.to(toc, { top: 100, duration: 0.3 })
//         } else {
//             gsap.to(toc, { top: 100, duration: 0.3 })
//         }
//     }
// })

// 目录展开
let toc_isExtend = ref<boolean>(false);
const extend = ref<HTMLElement | null>(null);
function changeTocExtend() {
  toc_isExtend.value = !toc_isExtend.value;
  // 在toc_isExtend为true时使用gsap将extend元素高度从30变成auto，时长0.2s
  if (extend.value) {
    if (toc_isExtend.value) {
      gsap.to(extend.value, { height: "auto", width: "auto", duration: 0.2 });
    } else {
      gsap.to(extend.value, { height: 30, width: 30, duration: 0.2 });
    }
  }
  document.body.addEventListener("click", closeExtend);
}
function closeExtend() {
  toc_isExtend.value = false;
  document.body.removeEventListener("click", closeExtend);
}
</script>

<template>
  <div
    :class="{ container: store.isDesktop(), mob_container: store.isMobile() }"
  >
    <div class="coverUrl">
      <img :src="coverUrl" alt="" />
    </div>
    <!-- 占位元素 -->
    <div class="black" v-show="!markdownContent">
      <div>正在加载文章内容...</div>
    </div>
    <div class="article_title">
      {{ title }}
    </div>
    <div class="article" v-if="markdownContent" v-html="markdownContent"></div>
    <div class="toc" v-if="store.isDesktop()">
      <h2>目录</h2>
      <ul>
        <li v-for="item in toc" :key="item.title">
          <a :href="'#' + item.title">{{ item.title }}</a>
          <ul v-if="item.children">
            <li v-for="child in item.children" :key="child.title">
              <a :href="'#' + child.title">{{ child.title }}</a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div ref="extend" class="mob_toc" v-if="store.isMobile()">
      <img
        @click.stop="changeTocExtend"
        src="../assets/images/mulu.png"
        alt=""
      />
      <div class="extend" v-if="toc_isExtend">
        <h2 style="margin-top: 5px; margin-left: 15px">目录</h2>
        <ul>
          <li v-for="item in toc" :key="item.title">
            <a :href="'#' + item.title">{{ item.title }}</a>
            <ul v-if="item.children">
              <li v-for="child in item.children" :key="child.title">
                <a :href="'#' + child.title">{{ child.title }}</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.mob_container {
  width: 100%;
  margin: 0 auto;
  padding: 20px 15px;
  box-sizing: border-box;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-top: 30px;
  margin-bottom: 50px;
  min-height: 100vh;

  .black {
    height: 100vh;
    width: 100%;
    text-align: center;
    padding-top: 20px;
    color: var(--NeuColor);
  }

  .article_title {
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 20px;
    color: var(--NeuColor);
    text-shadow: 5px 5px 8px rgba(171, 126, 5, 0.677);
  }

  .coverUrl {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;

    img {
      width: 100%;
      max-height: 200px;
      border-radius: 5px;
      margin: 0 auto;
    }
  }

  .article {
    color: var(--NeuColor);
    border-radius: 5px;
    margin-bottom: 20px;
    transition: all 0.3s;
    overflow-x: auto;
    line-height: 1.6;
    font-family: "Roboto", sans-serif;
    min-height: 100%;
    font-size: 14px;
    pre {
      font-size: 14px !important;
      border: 0.5px solid #ccc;
    }
  }
  .mob_toc {
    position: fixed;
    top: 50px;
    right: 0;
    width: 30px;
    height: 30px;
    background-color: #535353;
    color: rgb(214, 208, 208);
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    max-height: 500px;
    overflow-y: auto;
    img {
      width: 30px;
      height: 30px;
    }
    ul {
      padding-left: 20px;
      padding-right: 20px;
      margin-top: 10px;

      li {
        margin-bottom: 10px;
        list-style: none;

        a {
          color: rgb(214, 208, 208);
          text-decoration: none;
          transition: all 0.2s;

          &:hover {
            color: var(--TerColor);
          }
        }
      }
    }
  }
}
.container {
  width: 50%;
  margin: 0 auto;
  padding: 20px 30px;
  border-radius: 5px;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-top: 50px;
  margin-bottom: 50px;
  min-height: 100vh;

  .black {
    height: 100vh;
    width: 100%;
    text-align: center;
    padding-top: 20px;
    color: var(--NeuColor);
  }

  .article_title {
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 20px;
    color: var(--NeuColor);
    text-shadow: 5px 5px 8px rgba(171, 126, 5, 0.677);
  }

  .coverUrl {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;

    img {
      width: 50%;
      border-radius: 5px;
      margin: 0 auto;
    }
  }

  .article {
    color: var(--NeuColor);
    border-radius: 5px;
    margin-bottom: 20px;
    transition: all 0.3s;
    overflow-x: auto;
    line-height: 1.6;
    font-family: "Roboto", sans-serif;
    min-height: 100%;
    font-size: 16px;
    pre {
      font-size: 18px !important;
    }
  }

  .toc {
    position: fixed;
    top: 100px;
    right: 20px;
    width: 10%;
    padding: 0px 20px;
    background-color: var(--SecColor);
    color: var(--NeuColor);
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    max-height: 500px;
    overflow-y: auto;

    ul {
      padding-left: 20px;
      margin-top: 10px;

      li {
        margin-bottom: 10px;
        list-style: none;

        a {
          color: var(--NeuColor);
          text-decoration: none;
          transition: all 0.2s;

          &:hover {
            color: var(--TerColor);
          }
        }
      }
    }
  }
}
</style>
