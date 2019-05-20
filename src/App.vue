<template>
  <div id="app">
    <transition :name="transitionName" mode="out-in">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import { CHANGE_LOGINSTATE } from "./vuex/login/mutation-types";

export default {
  name: "app",
  data() {
    return {
      transitionName: ""
    };
  },
  watch: {
    $route(to, from) {
      // 判断过渡方向
      if (to.meta.index < from.meta.index) {
        this.transitionName = "slide-right";
      } else {
        this.transitionName = "slide-left";
      }
    }
  },
  mounted() {
    // window.localStorage.setItem("KMSLOGINSTATE", new Date().getTime());
    if (
      window.localStorage.getItem("KMSLOGINSTATE") &&
      new Date().getTime() - window.localStorage.getItem("KMSLOGINSTATE") <=
        86400000
    ) {
      this.$store.commit(CHANGE_LOGINSTATE, true);
    }
  }
};
</script>

<style lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #666;
  font-size: 16px;
  min-height: 100vh;
  position: relative;
}
</style>
