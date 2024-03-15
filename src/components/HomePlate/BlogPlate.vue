<script lang="ts" setup>
import { onMounted, ref } from "vue"
import { useRouter } from "vue-router";
import { gsap } from "gsap/gsap-core";
onMounted(() => {
    // 选择你想要动画的元素，这里假设它的类名为 "animatable-element"
    const element = document.querySelector('.custom');

    // 监听滚动事件
    // window.addEventListener('scroll', () => {
    //     const isElementInViewport = element.getBoundingClientRect().top < window.innerHeight;
    //     // 如果元素在视口中，触发入场动画
    //     if (isElementInViewport) {
    //         gsap.to(element, {
    //             duration: 1,
    //         });
    //     } else {
    //         // 如果元素不在视口中，触发出场动画
    //         gsap.to(element, {
    //             duration: 1,
    //         });
    //     }
    // });
})

const router = useRouter()
const goBlog = () => {
    router.push('/blog')
}
</script>

<template>
    <div class="plate pointer" @click="goBlog">

    </div>
</template>

<style scoped>
.plate {
    height: 60%;
    width: 60%;
    position: relative;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    background-color: var(--SecColor);
    border-radius: 10px;
}
</style>