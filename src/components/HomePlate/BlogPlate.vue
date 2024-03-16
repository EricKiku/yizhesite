<script lang="ts" setup>
import { onMounted, ref } from "vue"
import { useRouter } from "vue-router";
import { gsap } from "gsap/gsap-core";

const props = defineProps(['img', 'toPath', 'target'])
console.log(props.img);
const router = useRouter()
const a = ref(null)
const goPage = () => {
    if (props.target == '_blank') {
        window.open(props.toPath)
    } else {
        router.push(props.toPath)
    }
}


// 鼠标是否悬浮
let isHover = ref<any>(false)
function handleHover(val: boolean) {
    isHover.value = val
}
</script>

<template>
    <div class="plate pointer" :style="{ backgroundImage: 'url(' + props.img + ')' }" @click="goPage"
        @mouseenter="handleHover(true)" @mouseleave="handleHover(false)">
        <div class="tip" :class="{ show: isHover }">
            去看看->>
        </div>
    </div>
</template>

<style scoped lang="less">
.plate {
    height: 60%;
    width: 60%;
    position: relative;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    border-radius: 10px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    overflow: hidden;

    .tip {
        width: 200px;
        height: 30px;
        text-align: center;
        border-radius: 15px;
        position: absolute;
        top: 10px;
        left: -250px;
        background-color: rgba(0, 0, 0, 0.5);
        color: white;
        padding: 5px 10px;
        border-top-left-radius: 10px;
        font-family: "ZCOOL KuaiLe", sans-serif;
        font-size: 30px;
        letter-spacing: 5px;
        transition: all 0.2s;
    }

    .show {
        left: 10px;
    }
}
</style>