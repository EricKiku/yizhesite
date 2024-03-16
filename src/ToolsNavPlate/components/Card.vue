<script lang="ts" setup>
import { ref } from "vue"
import { gsap } from "gsap";
const props = defineProps(['data'])
// [ { "nick": "Github 社区", "ico": "https://cdn.jsdelivr.net/gh/EricKiku/pictures@main/img/github.png", "name": "github.com", "class": "社区", "tid": 2, "url": "https://github.com/", "desc": "开源的代码托管平台。访问概率需要魔法" } ]

const card = ref<any>(null)
const extend = ref<any>(null)
// 设置鼠标悬浮时的高度
const heightDiff = 5; // 悬浮时的高度
function mousemove() {
    gsap.to(card.value, {
        y: -heightDiff, // 向上移动，使得卡片内容向下延伸
        duration: 0.2,
        overwrite: 'auto'
    });
    gsap.to(extend.value, {
        height: 'auto', // 高度变为100
        duration: 0.1,
        overwrite: 'auto'
    });
    isExtend.value = true;
}

function mouseleave() {
    gsap.to(card.value, {
        y: 0, // 移回到初始位置
        duration: 0.2,
        overwrite: 'auto'
    });
    gsap.to(extend.value, {
        height: 0, // 高度变为0
        duration: 0.1,
        overwrite: 'auto'
    });
    isExtend.value = false;
}

// 是否展开
let isExtend = ref(false)

function goPage() {
    window.open(props.data.url)
}
</script>

<template>
    <div class="card" ref="card" @mouseenter="mousemove" @mouseleave="mouseleave" @click="goPage"
        :style="{ zIndex: isExtend ? '100' : '10' }">
        <div class="normal">
            <img :src="props.data.ico" alt="">
            <div class="nick">{{ props.data.nick }}</div>
        </div>
        <div class="extend" ref="extend" @mouseenter="mouseleave"
            :style="{ border: isExtend ? '1px solid #ccc' : 'none', padding: isExtend ? '5px' : '0px' }">
            <div class="name">{{ props.data.name }}</div>
            <div class="desc">{{ props.data.desc }}</div>
        </div>
    </div>
</template>

<style scoped lang="less">
.card {
    width: 200px;
    background-color: #f9f7f7;
    transition: height 0.2s ease;
    padding: 10px 10px;
    border-radius: 5px;
    cursor: pointer;
    margin: 10px 10px;
    border: 1px solid #e0e0e0;
    position: relative;

    &:hover {
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        border-color: var(--AccColor);
    }

    .normal {
        display: flex;
        align-items: center;

        img {
            width: 25px;
            height: 25px;
            margin-right: 10px;
        }
    }

    .extend {
        overflow: hidden;
        position: absolute;
        background-color: white;
        width: 100%;
        top: 100%;
        left: 0%;
        border-radius: 5px;
        box-sizing: border-box;
        height: 0;

        .name {
            font-size: 16px;
            padding: 10px 0;
            color: var(--TerColor);
        }

        .desc {
            font-size: 14px;
            color: var(--PriColor);
            z-index: 100;
            border-left: 3px solid #ccc;
            padding-left: 5px;
        }
    }
}
</style>