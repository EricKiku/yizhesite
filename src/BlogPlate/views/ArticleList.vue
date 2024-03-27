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
let tempArticles = ref<Article[]>([]);
onMounted(() => {
  getActicles().then((res) => {
    articles.value = filterBlog(res.data.reverse());
    // 浅拷贝数组
    tempArticles.value = [...articles.value];
    // 获取所有标签
    getTags();
  });
});
// 过滤所有，只要class为blog的
function filterBlog(arr: Array<Article>): Article[] {
  return arr.filter((item: any) => {
    return item.class === "blog";
  });
}

// 获取所有标签
let tags = ref<string[]>([]);
function getTags() {
  let tempTags: string[] = [];
  tempArticles.value.forEach((item: Article) => {
    tempTags.push(item.tag);
  });
  tags.value = Array.from(new Set(tempTags));
}
// 点击标签过滤
let activeTag = ref<string>("ALL");
function handleTag(tag: string) {
  activeTag.value = tag;
  if (tag === "ALL") {
    tempArticles.value = articles.value;
  } else {
    tempArticles.value = articles.value.filter((item: Article) => {
      return item.tag === tag;
    });
  }
}

// 搜索关键字
let searchValue = ref<string>("");
// 搜索栏获得焦点
let searchFocus = ref<boolean>(false);
function handleFocus(val: boolean) {
  searchFocus.value = val;
}

// 回车搜索
function handleSearch() {
  if (searchValue.value === "") {
    tempArticles.value = articles.value;
  } else {
    tempArticles.value = articles.value.filter((item: Article) => {
      let title = item.title.toUpperCase();
      let sectitle = item.sectitle.toUpperCase();
      return (
        title.includes(searchValue.value.toUpperCase()) ||
        sectitle.includes(searchValue.value.toUpperCase())
      );
    });
  }
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
      <h1>博客列表</h1>
      <h4>My learning experience has increased as a witness。</h4>
    </div>
    <div class="search" :class="{ search_focus: searchFocus }">
      <div class="icon">
        <img src="../assets/images/search.png" alt="search" />
      </div>
      <input
        v-model="searchValue"
        @keydown.enter="handleSearch"
        @focus="handleFocus(true)"
        @blur="handleFocus(false)"
        type="text"
        placeholder="Search..."
      />
    </div>
    <div class="tags">
      <div
        class="tag"
        :class="{ tag_active: activeTag === 'ALL' }"
        @click="handleTag('ALL')"
      >
        ALL
      </div>
      <div
        class="tag"
        :class="{ tag_active: activeTag === tag }"
        v-for="tag in tags"
        :key="tag"
        @click="handleTag(tag)"
      >
        {{ tag }}
      </div>
    </div>
    <div class="list">
      <ArticleCover
        v-for="article in tempArticles"
        :key="article.bid"
        :article="article"
      />
    </div>
  </div>
</template>

<style scoped lang="less">
.mob_article_list {
  width: 100%;
  min-height: 100vh;
  margin-bottom: 150px;
  margin-top: 50px;
  padding: 15px;
  box-sizing: border-box;
  .title {
    color: var(--TerColor);
    font-family: "ZCOOL KuaiLe", sans-serif;

    h1 {
      text-shadow: 2px 2px 4px rgba(171, 126, 5, 0.677);
    }

    h4 {
      text-shadow: 2px 2px 4px rgba(233, 231, 224, 0.677);
      color: var(--AccColor);
    }
  }

  .search {
    width: 100%;
    padding: 5px 10px;
    border-radius: 5px;
    display: flex;
    border: 1px solid #ccc;
    margin: 5px 0px 10px 0px;
    box-sizing: border-box;
    background-color: white;
    transition: all 0.2s;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

    .icon {
      width: 30px;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        width: 20px;
        height: 20px;
      }
    }

    input {
      width: 100%;
      border: none;
      outline: none;
      padding: 5px;
      box-sizing: border-box;
    }
  }

  .search_focus {
    border: 1px solid var(--TerColor);
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 10px;

    .tag {
      display: inline-block;
      padding: 5px 10px;
      font-size: 14px;
      color: #007bff;
      border-radius: 5px;
      /* 圆角边框 */
      text-transform: uppercase;
      letter-spacing: 0.5px;
      cursor: pointer;
      transition: all 0.3s ease;
      margin: 5px;
      position: relative;
      overflow: hidden;

      &:hover {
        color: white;
        background-color: #0056b3;
        /* 悬停时的背景颜色 */
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        /* 悬停时的阴影 */

        &::before {
          width: 200%;
          height: 200%;
          border-radius: 20px;
          /* 与标签圆角保持一致 */
          opacity: 0;
        }
      }

      &::before {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.2);
        transform: translate(-50%, -50%);
        transition: width 0.3s ease, height 0.3s ease;
      }
    }

    .tag_active {
      background-color: var(--TerColor);
      color: var(--SecColor);
    }
  }

  .list {
    display: flex;
    flex-direction: column;
  }
}
.article_list {
  width: 50%;
  min-height: 100vh;
  margin-bottom: 150px;
  margin-top: 150px;

  .title {
    color: var(--TerColor);
    font-family: "ZCOOL KuaiLe", sans-serif;

    h1 {
      text-shadow: 2px 2px 4px rgba(171, 126, 5, 0.677);
    }

    h4 {
      text-shadow: 2px 2px 4px rgba(233, 231, 224, 0.677);
      color: var(--AccColor);
    }
  }

  .search {
    width: 100%;
    padding: 5px 10px;
    border-radius: 5px;
    display: flex;
    border: 1px solid #ccc;
    margin: 5px 0px 10px 0px;
    box-sizing: border-box;
    background-color: white;
    transition: all 0.2s;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

    .icon {
      width: 30px;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        width: 20px;
        height: 20px;
      }
    }

    input {
      width: 100%;
      border: none;
      outline: none;
      padding: 5px;
      box-sizing: border-box;
    }
  }

  .search_focus {
    border: 1px solid var(--TerColor);
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 10px;

    .tag {
      /* padding: 5px 10px;
            margin: 5px 10px;
            border-radius: 5px;
            background-color: var(--SecColor);
            color: var(--TerColor);
            cursor: pointer;
            transition: all 0.2s;*/
      display: inline-block;
      padding: 5px 10px;
      font-size: 14px;
      color: #007bff;
      border-radius: 5px;
      /* 圆角边框 */
      text-transform: uppercase;
      letter-spacing: 0.5px;
      cursor: pointer;
      transition: all 0.3s ease;
      margin: 5px;
      position: relative;
      overflow: hidden;

      &:hover {
        /*transform: scale(1.1);
                background-color: var(--TerColor);
                color: var(--SecColor);*/
        color: white;
        background-color: #0056b3;
        /* 悬停时的背景颜色 */
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        /* 悬停时的阴影 */

        &::before {
          width: 200%;
          height: 200%;
          border-radius: 20px;
          /* 与标签圆角保持一致 */
          opacity: 0;
        }
      }

      &::before {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.2);
        transform: translate(-50%, -50%);
        transition: width 0.3s ease, height 0.3s ease;
      }
    }

    .tag_active {
      background-color: var(--TerColor);
      color: var(--SecColor);
    }
  }

  .list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 30px;
  }
}
</style>
