<script lang="ts" setup>
import { onMounted, ref } from "vue"
import axios from "axios";
const props = defineProps({
    data: {
        type: Array,
        default: []
    }
})
// 所有分类
let allClass = ref<any>([]);
onMounted(() => {
    allClass.value = getAllClass(props.data);
})
// 获取所有分类
function getAllClass(data: any) {
    // 遍历data，获取所有class
    let classArr: any = [];
    data.forEach((item: any) => {
        classArr.push(item.class);
    });
    return Array.from(new Set(classArr));
}
</script>

<template>
    <div class="outside">
        <div class="siderbar">
            <div class="class" v-for="item in allClass" :key="item">
                <a :href="'#' + item">
                    <div class="item">{{ item }}</div>
                </a>
            </div>
        </div>
    </div>

</template>

<style scoped lang="less">
.outside {
    width: 150px;
}

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
</style>