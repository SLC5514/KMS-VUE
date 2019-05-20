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
        this.transitionName = "slide-left";
      } else {
        this.transitionName = "slide-right";
      }
    }
  },
  mounted() {
    // 24小时免登录
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

/* 优化滚动条样式 */
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #c4bfe5;
  background-image: linear-gradient(
    45deg,
    rgba(223, 191, 191, 0.2) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.2) 50%,
    rgba(255, 255, 255, 0.2) 75%,
    transparent 75%,
    transparent
  );
}
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background: #ededed;
}

/* 全局 */
// 对话框居上
.vertical-top.ivu-modal-wrap {
  top: 200px;
}
// 对话框居中
.vertical-center-modal {
  display: flex;
  align-items: center;
  justify-content: center;
  .ivu-modal {
    top: 0;
  }
}

/* 局部 */
.login,
.register,
.findpassword {
  // input框hover变色、样式统一select
  .ivu-input-wrapper:hover .ivu-input {
    border-color: #57a3f3;
  }
  .ivu-input-with-prefix {
    padding-left: 35px;
  }
  .ivu-input-prefix {
    border-right: 1px solid #dcdee2;
    transition: all 0.2s ease-in-out;
    margin-top: 1px;
    height: auto;
    i {
      width: 32px;
      height: 30px;
    }
  }
  .ivu-select-single .ivu-select-prefix {
    padding: 0;
    border-right: 1px solid #dcdee2;
    transition: all 0.2s ease-in-out;
    text-align: center;
    width: 32px;
    i {
      width: 32px;
      height: 30px;
      line-height: 32px;
    }
  }
  .ivu-form-item-error {
    .ivu-input-prefix {
      border-right: 1px solid #ed4014;
    }
    .ivu-select-prefix {
      border-right: 1px solid #ed4014;
    }
    .ivu-input-wrapper .ivu-input {
      border: 1px solid #ed4014;
    }
  }
}
</style>
