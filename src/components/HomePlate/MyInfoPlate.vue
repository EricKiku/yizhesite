<script lang="ts" setup>
import { ref } from "vue"
import { useRouter } from "vue-router";
const router = useRouter()
function goBlog() {
    router.push('/blog')

}

// yoyo
// gsap.to('.plate', {
//     scale: 1.1,
//     duration: 1,
//     repeat: -1,
//     yoyo: true
// })
</script>

<template>
    <div class="my">
        <div class="container left">
            <div class="top">
                <a href="https://github.com/EricKiku"><img class="avatar" src="../../assets/images/yizhe_avatar.png"
                        alt="yizhe"></a>
                <img class="name" src="../../assets/images/yizhe_text.png" alt="">
            </div>
            <div class="bottom boli ">
                <a href="https://github.com/EricKiku"><img class="contact pointer"
                        src="../../assets/images/contacts/github.png" alt=""></a>
            </div>
        </div>
        <div class="container right">
            <div class="line line1">
                <div class="box boli" @click="goBlog">
                    <img src="../../assets/images/blog.png" alt="">
                    <span>博客</span>
                </div>
                <!-- <div class="box boli">
                    <img src="../../assets/images/blog.png" alt="">
                    <span>博客</span>
                </div> -->
            </div>
            <!-- <div class="line line2">
                <div class="box boli">
                    <img src="../../assets/images/blog.png" alt="">
                    <span>博客</span>
                </div>
                <div class="box boli">
                    <img src="../../assets/images/blog.png" alt="">
                    <span>博客</span>
                </div>
            </div> -->
        </div>
    </div>
</template>

<style scoped lang="less">
.my {
    display: flex;
    justify-content: center;
    align-items: center;

    .boli {
        /**毛玻璃片效果**/
        backdrop-filter: blur(3px);
        background-color: rgba(29, 29, 29, 0.266);
    }

    .container {
        border-radius: 10px;
        padding: 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .left {
        margin-right: 30px;

        .top {
            .avatar {
                width: 60px;
                height: 60px;
                border-radius: 50%;
            }

            .name {
                height: 60px;
            }
        }

        .bottom {
            display: flex;
            justify-content: left;
            align-items: center;
            width: 100%;
            border-radius: 5px;

            img {
                width: 25px;
                height: 25px;
                margin: 10px;
                transition: all 0.2s;

                &:hover {
                    transform: scale(1.2);
                }
            }
        }
    }

    .right {
        margin-left: 30px;

        .line {
            display: flex;
            justify-content: center;

            .box {
                border-radius: 5px;
                margin: 10px;
                font-size: 20px;
                padding: 20px 30px;
                display: flex;
                justify-content: center;
                align-items: center;
                transition: all 0.2s;
                cursor: pointer;

                &:hover {
                    transform: scale(1.1);
                }

                span {
                    margin-left: 10px;
                    color: white;
                }

                img {
                    width: 25px;
                    height: 25px;
                    /**图片垂直居中 */
                    vertical-align: middle;
                }

            }
        }
    }
}
</style>