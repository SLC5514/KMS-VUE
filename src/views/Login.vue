<template>
  <div class="login">
    <Particles :particles="particles" />
    <div class="login-box">
      <LoginCom />
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  components: {
    // 粒子组件
    Particles: () => import("@/components/Particles.vue"),
    // 登录组件
    LoginCom: () => import("@/components/LoginCom.vue")
  },
  data() {
    return {
      // 粒子组件数据
      particles: {
        color: "#C4BFE5",
        shapeType: 0,
        linesColor: "#C4BFE5",
        lineOpacity: 0.5
      }
    };
  },
  methods: {}
};
</script>

<style lang="less" scoped>
.login-box {
  position: fixed;
  left: 50%;
  top: 20vh;
  transform: translateX(-50%);
}
</style>
