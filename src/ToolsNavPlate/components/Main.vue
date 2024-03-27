<script lang="ts" setup>
import { ref, onMounted } from "vue";
import Card from "./Card.vue";
import AddTool from "../views/AddTool.vue";
import { type Item } from "../types/index";
import { useDeviceStore } from "@/stores/deviceType";
const store = useDeviceStore();
interface ClassData {
  [key: string]: Item[];
}

const props = defineProps({
  data: {
    type: Array<Item>,
    default: [],
  },
});

onMounted(() => {
  handleClass();
});

// data
let classData = ref<ClassData>({});
function handleClass() {
  // 分类，把数据按照class分类，返回一个对象
  let classObj: ClassData = {};
  props.data.forEach((item: Item) => {
    if (!item.class) return;
    if (classObj[item.class]) {
      classObj[item.class].push(item);
    } else {
      classObj[item.class] = [item];
    }
  });
  classData.value = classObj;
}
</script>

<template>
  <div :class="{ main: store.isDesktop(), mob_main: store.isMobile() }">
    <!-- <AddTool /> -->
    <div class="container" v-for="(lei, title) in classData" :key="title">
      <div class="title">
        <img src="../assets/imgs/category.png" alt="" />
        <div :id="title.toString()">{{ title }}</div>
      </div>
      <div class="content">
        <Card v-for="(item, index) in lei" :key="index" :data="item" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.mob_main {
  flex: 1;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  .container {
    padding: 20px;
    background-color: white;
    box-sizing: border-box;
    margin-bottom: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

    .title {
      display: flex;
      align-items: center;
      font-size: 20px;
      border-bottom: 1px solid #f3f3f3;
      padding-bottom: 10px;

      img {
        width: 20px;
        height: 20px;
        margin-right: 10px;
      }
    }

    .content {
      display: flex;
      flex-wrap: wrap;
      justify-content: left;
    }
  }
}
.main {
  flex: 1;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  .container {
    padding: 20px;
    background-color: white;
    box-sizing: border-box;
    margin-bottom: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

    .title {
      display: flex;
      align-items: center;
      font-size: 20px;
      border-bottom: 1px solid #f3f3f3;
      padding-bottom: 10px;

      img {
        width: 20px;
        height: 20px;
        margin-right: 10px;
      }
    }

    .content {
      display: flex;
      flex-wrap: wrap;
      justify-content: left;
    }
  }
}
</style>
