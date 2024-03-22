<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import MarkdownIt from "markdown-it";
import hljs from "highlight.js";
import "highlight.js/styles/vs.css";
import axios from "axios";
import { addView } from "@/api/api";
import { gsap } from "gsap";

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
const title = route.query.coverUrl as string;
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
</script>

<template>
  <div class="container">
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
    <div
      class="article pre"
      v-if="markdownContent"
      v-html="markdownContent"
    ></div>
    <div class="toc">
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
  </div>
</template>

<style scoped lang="less">
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
</style>
