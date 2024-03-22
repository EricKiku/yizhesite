<script lang="ts" setup>
import { onMounted, ref } from "vue"
import { useRouter, RouterView } from "vue-router";
import Article from "./components/article.vue";
import Header from "./components/Header.vue";
import My from "./components/My.vue";
import { getActicles } from "@/api/api"
const router = useRouter()



</script>

<template>
    <div class="blog_home">
        <Header />
        <My />
        <RouterView />
        <!-- 碟片元素 -->
        <!-- <div class="disc" @click="handlePlay" :class="{ play: isPlaying }"> -->
        <!-- <img src="/public/img/sweetdreams.jpg" alt="disc" /> -->
        <!-- <img src="../assets/images/play.png" alt="disc" />
            <img src="../assets/images/pause.png" alt="disc" /> -->
        <!-- </div> -->
        <!-- 音频元素 -->
        <!-- <audio ref="audioPlayer">
            <source src="/public/music/sweet_dreams.mp3" type="audio/mpeg">
        </audio> -->
        <Footer />
    </div>
</template>

<style lang="less">
@import url(./assets/css/style.css);

.blog_home {
    width: 100%;
    min-height: 100%;
    overflow: auto;
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;
    /* 背景图片铺满不重复 */
    background: url(./assets/images/blog-bg-3.jpg) no-repeat;
    background-size: cover;
    background-attachment: fixed;
    background-position: center;


}

.footer .disc {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;
    border: 1px dotted var(--TerColor);

    img {
        width: 100%;
        height: 100%;
        border-radius: 50%;

        &:hover {
            opacity: 0.2;
        }
    }
}

.play {
    animation: spin 3s linear infinite;
}

@keyframes spin {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

audio {
    display: none;
}
</style>