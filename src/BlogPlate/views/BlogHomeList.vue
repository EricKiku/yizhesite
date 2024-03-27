<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { getActicles } from "@/api/api";
import ArticleCover from "../components/ArticleCover.vue";
import { type Article } from "../type/index";
import { useDeviceStore } from "@/stores/deviceType";
const store = useDeviceStore();
const router = useRouter();
let articles = ref<Article[]>([]);
let loading = ref(false);
let loadFail = ref(false);
onMounted(() => {
  scrollTop();
  loadArticles();
});
function scrollTop() {
  // 重置滚动条到顶部
  window.scrollTo(0, 0);
}
// 加载文章列表
function loadArticles() {
  loading.value = true;
  getActicles().then(
    (res) => {
      articles.value = res.data.reverse().slice(0, 6);
      loading.value = false;
      loadFail.value = false;
    },
    () => {
      loading.value = false;
      loadFail.value = true;
      // 再次加载
      setTimeout(() => {
        loadArticles();
      }, 2000);
    }
  );
}

function goBolgList() {
  router.push({
    name: "list",
  });
}
</script>

<template>
  <div
    :class="{
      article_list: store.isDesktop(),
      mob_article_list: store.isMobile(),
    }"
  >
    <div class="title">
      <h1>文章列表</h1>
    </div>
    <div class="loading" v-show="loading && articles.length === 0">
      正在加载...
    </div>
    <div class="loading" v-show="loadFail && articles.length === 0">
      加载失败...
    </div>
    <div class="list">
      <ArticleCover
        v-for="article in articles"
        :key="article.bid"
        :article="article"
      />
    </div>
    <div class="more">
      <div class="btn" @click="goBolgList">
        <div>更多</div>
        <img src="../assets/images/more.png" alt="" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.mob_article_list {
  width: 100%;
  margin-bottom: 150px;
  padding: 20px;
  box-sizing: border-box;
  .title {
    color: var(--TerColor);
    font-family: "ZCOOL KuaiLe", sans-serif;
    font-size: 14px;
  }

  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
    font-size: 20px;
    letter-spacing: 4px;
    color: var(--TerColor);
    font-weight: bold;
    font-family: "ZCOOL KuaiLe", sans-serif;
  }

  .list {
    display: flex;
    flex-direction: column;
  }

  .more {
    margin-top: 20px;

    .btn {
      width: fit-content;
      color: var(--NeuColor);
      letter-spacing: 3px;
      font-size: 20px;
      font-family: "ZCOOL KuaiLe", sans-serif;
      border-radius: 5px;
      cursor: pointer;
      transition: all 0.2s;
      background-color: white;
      border: 1px solid #ccc;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 10px;

      img {
        width: 30px;
        height: 30px;
        margin-left: 5px;
      }

      &:hover {
        border: 1px solid var(--TerColor);
      }
    }
  }
}
.article_list {
  width: 50%;
  margin-bottom: 150px;

  .title {
    color: var(--TerColor);
    font-family: "ZCOOL KuaiLe", sans-serif;
  }

  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
    font-size: 20px;
    letter-spacing: 4px;
    color: var(--TerColor);
    font-weight: bold;
    font-family: "ZCOOL KuaiLe", sans-serif;
  }

  .list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 30px;
  }

  .more {
    margin-top: 20px;

    .btn {
      width: fit-content;
      color: var(--NeuColor);
      letter-spacing: 3px;
      font-size: 20px;
      font-family: "ZCOOL KuaiLe", sans-serif;
      border-radius: 5px;
      cursor: pointer;
      transition: all 0.2s;
      background-color: white;
      border: 1px solid #ccc;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 10px;

      img {
        width: 30px;
        height: 30px;
        margin-left: 5px;
      }

      &:hover {
        border: 1px solid var(--TerColor);
      }
    }
  }
}
</style>
