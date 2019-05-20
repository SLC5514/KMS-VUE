<template>
  <div class="authorized">
    <Particles :particles="particles" />
    <section>
      <h1>Knowledge management system</h1>
      <Button type="primary" @click="enterFn">Enter</Button>
    </section>
  </div>
</template>

<script>
export default {
  name: "authorized",
  components: {
    // 粒子组件
    Particles: () => import("@/components/Particles.vue")
  },
  data() {
    return {
      // 粒子组件数据
      particles: {
        color: "#C4BFE5",
        shapeType: 4,
        linesColor: "#C4BFE5",
        lineOpacity: 0.5
      }
    };
  },
  methods: {
    // 进入系统
    enterFn() {
      if (this.loginState) {
        console.log("index");
      } else {
        window.location.href = "/login";
      }
    }
  }
};
</script>

<style lang="less" scoped>
.authorized {
  & > section {
    position: absolute;
    top: 200px;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    & > h1 {
      user-select: none;
      margin-bottom: 20px;
    }
  }
}
</style>
