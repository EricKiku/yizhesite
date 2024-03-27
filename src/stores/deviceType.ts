import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useDeviceStore = defineStore("device", () => {
  let deviceType = ref<string>("desktop");
  function setType(type: string) {
    deviceType.value = type;
  }
  function getType() {
    return deviceType.value;
  }
  function isMobile() {
    return deviceType.value === "mobile";
  }
  function isDesktop() {
    return deviceType.value === "desktop";
  }
  return {
    setType,
    getType,
    isMobile,
    isDesktop,
  };
});
