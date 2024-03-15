<script lang="ts" setup>
import { ref } from "vue" 
</script>

<template>
    <div class="footer">
        <p>&copy; 2024 yizhe.</p>
        <p>备案号: 冀ICP备2022008962号-2 部署平台: <a href="https://cn.aliyun.com/" target="_blank">阿里云</a></p>
        <div class="line">
            <p>联系方式: <a href="mailto:2966678301@qq.com">2966678301@qq.com</a></p>
            <p>社交媒体:
                <a href="https://github.com/EricKiku" target="_blank">GitHub</a>
            </p>
        </div>
        <p>使用的开源许可证: <a href="https://opensource.org/licenses/MIT" target="_blank">MIT License</a></p>
    </div>
</template>

<style scoped lang="less">
.footer {
    width: 100%;
    background-color: rgba(0, 0, 0, 0.2);
    color: var(--NeuColor);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    border-top: 1px solid var(--TerColor);

    a {
        color: #0275d8;
        text-decoration: none;

        &:hover {
            text-decoration: underline;
        }
    }

    .line {
        display: flex;
    }

    p {
        margin: 5px 0;
    }
}
</style>