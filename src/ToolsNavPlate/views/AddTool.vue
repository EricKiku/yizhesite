<script lang="ts" setup>
import { ref } from "vue"
import axios from "axios";
let nick = ref("");
let name = ref("");
let url = ref("");
let ico = ref("https://cdn.jsdelivr.net/gh/EricKiku/pictures@main/img/ceshi.png");
let desc = ref("");
let class1 = ref("");
function addToolFun() {
    axios.post("/devapi/addtool", {
        nick: nick.value,
        name: name.value,
        url: url.value,
        ico: ico.value,
        desc: desc.value,
        class: class1.value
    }).then(res => {
        console.log(res);
        alert("添加成功");
    }).catch(err => {
        console.log(err);
    });
}
</script>

<template>
    <div>nick <input type="text" v-model="nick"></div>
    <div>name <input type="text" v-model="name"></div>
    <div>url <input type="text" v-model="url"></div>
    <div>ico <input type="text" v-model="ico"></div>
    <div>desc <input type="text" v-model="desc"></div>
    <div>class <input type="text" v-model="class1"></div>
    <button @click="addToolFun">add</button>
</template>

<style scoped>
input {
    width: 400px;
    padding: 15px 0px;
    font-size: 24px;
}
</style>