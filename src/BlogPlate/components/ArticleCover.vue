<script lang="ts" setup>
import { onMounted, ref } from "vue"
import { useRouter } from "vue-router";
const router = useRouter()
// 接收props
const props = defineProps(['article'])

onMounted(() => {
    console.log(props.article);
})

function goArticle() {
    // let path = props.article.file.replace('https://yizhesite-1317876382.cos.ap-beijing.myqcloud.com/', '')

    router.push({
        name: "article",
        query: {
            path: props.article.file,
            coverUrl: props.article.cover,
            bid: props.article.bid
        }
    })
}
</script>

<template>
    <div class="box" @click="goArticle">
        <div class="cover">
            <img :src="article.cover" alt="cover" />
            <div class="class">
                {{ article.class }}
            </div>
            <div class="tag">
                {{ article.tag }}
            </div>
        </div>
        <div class="info">
            <p class="title" :title="article.title">{{ article.title }}</p>
            <p class="sectitle" :title="article.sectitle">{{ article.sectitle }}</p>
            <div class="footer">
                <div class="read">
                    <img src="../assets/images/preview.png" alt="">
                    <div>
                        {{ article.read }}
                    </div>
                </div>
                <div class="date">{{ article.date }}</div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.box {
    width: 300px;
    height: 350px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 2px solid #ccc;
    border-radius: 5px;
    padding: 2px;
    transition: all 0.2s;
    background-color: white;
    color: var(--NeuColor);
    box-sizing: border-box;

    &:hover {
        border: 2px solid var(--TerColor);
        box-shadow: 0 0 10px #ccc;
    }

    .cover {
        width: 100%;
        height: 201px;
        position: relative;

        .class {
            position: absolute;
            top: 10px;
            left: 10px;
            padding: 5px;
            background-color: var(--SecColor);
            color: var(--AccColor);
            font-size: 16px;
            font-weight: bold;
            border-radius: 5px;
        }

        .tag {
            position: absolute;
            bottom: 5px;
            right: 5px;
            padding: 2px 3px;
            background-color: var(--SecColor);
            color: var(--TerColor);
            font-size: 12px;
            border-radius: 5px;
        }

        img {
            width: 100%;
            height: 100%;
        }
    }

    .info {
        width: 100%;
        height: 134px;
        /*display: flex;
        flex-direction: column;
        justify-content: center;*/
        padding: 10px;
        box-sizing: border-box;
        position: relative;

        .title {
            margin: 0px;
            font-size: 22px;
            font-weight: bold;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .sectitle {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
        }

        .footer {
            position: absolute;
            bottom: 0px;
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .read {
            display: flex;
            align-items: center;
            color: var(--TerColor);

            img {
                width: 20px;
                height: 20px;
                margin-right: 5px;
            }
        }

        .date {
            margin: 0px;
            font-size: 16px;
            color: var(--TerColor);
            font-family: "ZCOOL KuaiLe", sans-serif;
            font-weight: 700;
            position: absolute;
            bottom: 0px;
            right: 10px;

        }
    }
}
</style>