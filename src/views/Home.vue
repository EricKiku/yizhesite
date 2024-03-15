<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from "vue"
import BlogPlate from "@/components/HomePlate/BlogPlate.vue";
import MyInfoPlate from "@/components/HomePlate/MyInfoPlate.vue";
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
gsap.registerPlugin(ScrollTrigger)
// 获取所有的section，并设置背景图片
const sections = ref<HTMLElement[]>([])
onMounted(() => {
    sections.value = Array.from(document.querySelectorAll("section"))
    scroll()
    // 监听滚动事件
    watchScroll()
})
// 滚动效果
function scroll() {
    sections.value.forEach(section => {
        gsap.fromTo(section,
            {
                backgroundPositionY: `-${window.innerHeight / 2}px`
            },
            {
                backgroundPositionY: `${window.innerHeight / 2}px`,
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    scrub: true
                }
            }
        )
    })
}

// 监听滚动事件
function watchScroll() {
    let lastScrollTop = 0;
    // 以节流方式监听滚动事件
    window.addEventListener('scroll', throttle(() => {
        // 监听滚动条是向上还是向下滚动
        let st = window.pageYOffset || document.documentElement.scrollTop;
        if (st > lastScrollTop) {
            // 向下滚动，收缩.header
            gsap.to('.header', { y: '-64px', duration: 0.5 });
            // gsap.to('.header *', { opacity: 0, duration: 0.5 });
        } else {
            // 向上滚动，展开.header
            gsap.to('.header', { y: '2px', duration: 0.5 });
            // gsap.to('.header *', { opacity: 1, duration: 0.5 });
        }
        lastScrollTop = st <= 0 ? 0 : st; // 为负则置为0，因为iOS有负的滚动
    }, 100), false)
}
function throttle(callback: any, time: any) {
    let lastTime = 0
    return function () {
        const now = new Date().getTime()
        if (now - lastTime > time) {
            callback()
            lastTime = now
        }
    }
}
onUnmounted(() => {
    // 移除滚动事件

})
</script>

<template>
    <div class="home">
        <div class="header">
            <div class="avatar pointer">
                <a href="https://github.com/EricKiku" target="_blank"> <img src="../assets/images/yizhe_avatar.png"
                        alt="yizhe"></a>
            </div>
        </div>
        <section class="section1">
            <MyInfoPlate />
        </section>
        <section class="section2">
            <BlogPlate />
        </section>
        <section>
            <h1>This Is My Blog.</h1>
        </section>
        <section>
            <h1>This Is My Blog.</h1>
        </section>
        <section>
            <h1>This Is My Blog.</h1>
        </section>
        <section>
            <h1>This Is My Blog.</h1>
        </section>
        <section>
            <h1>This Is My Blog.</h1>
        </section>
        <section>
            <h1>This Is My Blog.</h1>
        </section>
    </div>
</template>

<style scoped lang="less">
.header {
    height: 60px;
    background-color: var(--SecColor);
    color: var(--PriColor);
    display: flex;
    align-items: center;
    padding: 0px 15px;
    box-sizing: border-box;
    font-size: 2em;
    position: fixed;
    width: 60%;
    top: 2px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 30px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    z-index: 10;

    .avatar {
        width: 40px;
        height: 40px;

        img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
        }
    }
}

section {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 3em;
    /* 图片背景铺满不重复 */
    background: no-repeat center center/cover;
    color: var(--PrimaryColor);
}

.section1 {
    /** background-image: url(https://yizhesite-1317876382.cos.ap-beijing.myqcloud.com/my-info-bg.jpg); */
    background-image: url(https://cdn.jsdelivr.net/gh/EricKiku/pictures@main/img/8048.jpg);
}

.section2 {
    background-image: url(https://yizhesite-1317876382.cos.ap-beijing.myqcloud.com/home-blog-bg.jpg);
}
</style>