// import './assets/main.css'
import "@/assets/css/main.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import Footer from "@/components/Footer.vue";
import { useDeviceStore } from "@/stores/deviceType";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);
// 注册页脚组件
app.component("Footer", Footer);

const store = useDeviceStore();

function getDeviceType() {
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

  if (isMobile) {
    store.setType("mobile");
  } else {
    store.setType("desktop");
  }
}
getDeviceType();
//   监听窗口变化
window.addEventListener("resize", getDeviceType);

app.mount("#app");
