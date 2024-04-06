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
      }, 100);
    }
  );
}

function goBolgList() {
  router.push({
    name: "list",
  });
}

// go article
function goArticle(article: Article) {
  router.push({
    name: "article",
    query: {
      path: article.file,
      coverUrl: article.cover,
      bid: article.bid,
      title: article.title,
    },
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
      <template v-if="store.isMobile()">
        <ArticleCover
          v-for="article in articles"
          :key="article.bid"
          :article="article"
        />
      </template>
      <template v-if="store.isDesktop()">
        <div
          class="card"
          v-for="(article, index) in articles"
          :key="index"
          @click="goArticle(article)"
        >
          <div class="align">
            <span class="red"></span>
            <span class="yellow"></span>
            <span class="green"></span>
          </div>
          <h2>{{ article.title }}</h2>
          <img :src="article.cover" alt="" />
          <p>
            {{ article.sectitle }}
          </p>
        </div>
      </template>
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
    grid-template-rows: 260px 260px;
    grid-gap: 30px;

    .card {
      width: 90%;
      height: 190px;
      padding: 0.5rem;
      background: rgba(198, 198, 198, 0.34);
      border-radius: 8px;
      backdrop-filter: blur(5px);
      border-bottom: 3px solid rgba(255, 255, 255, 0.44);
      border-left: 2px rgba(255, 255, 255, 0.545) outset;
      box-shadow: -40px 50px 30px rgba(0, 0, 0, 0.28);
      transform: skewX(10deg);
      transition: 0.4s;
      overflow: hidden;
      color: black;
      cursor: pointer;
      &:hover {
        height: 260px;
        transform: skew(0deg);
      }
      h2 {
        text-align: center;
        margin: 15px;
        color: var(--PriColor);
        text-shadow: -10px 5px 10px rgba(50, 50, 50, 0.37);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      img {
        width: 100%;
        max-height: 100px;
        object-fit: cover;
      }
      .align {
        height: 40px;
        padding: 1rem;
        display: flex;
        flex-direction: row;
        gap: 5px;
        align-self: flex-start;
        box-sizing: border-box;
        .red {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: #ff605c;
          box-shadow: -5px 5px 5px rgba(0, 0, 0, 0.28);
        }

        .yellow {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: #ffbd44;
          box-shadow: -5px 5px 5px rgba(0, 0, 0, 0.28);
        }

        .green {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: #00ca4e;
          box-shadow: -5px 5px 5px rgba(0, 0, 0, 0.28);
        }
      }
    }
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
