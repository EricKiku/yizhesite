// import './assets/main.css'
import "@/assets/css/main.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import Footer from "@/components/Footer.vue";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);
// 注册页脚组件
app.component("Footer", Footer);
app.mount("#app");
