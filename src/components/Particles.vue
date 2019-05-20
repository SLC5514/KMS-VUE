<template>
  <vue-particles
    class="vue-particles"
    :color="particlesData.color"
    :particleOpacity="particlesData.particleOpacity"
    :particlesNumber="particlesData.particlesNumber"
    :shapeType="shapeTypeArr[particlesData.shapeType]"
    :particleSize="particlesData.particleSize"
    :linesColor="particlesData.linesColor"
    :linesWidth="particlesData.linesWidth"
    :lineLinked="particlesData.lineLinked"
    :lineOpacity="particlesData.lineOpacity"
    :linesDistance="particlesData.linesDistance"
    :moveSpeed="particlesData.moveSpeed"
    :hoverEffect="particlesData.hoverEffect"
    :hoverMode="hoverModeArr[particlesData.hoverMode]"
    :clickEffect="particlesData.clickEffect"
    :clickMode="clickModeArr[particlesData.clickMode]"
  />
</template>

<script>
// 粒子组件
export default {
  nume: "particles",
  props: {
    particles: Object
  },
  data() {
    return {
      particleDef: {
        color: "#dedede",
        particleOpacity: 0.7,
        particlesNumber: 80,
        shapeType: 0,
        particleSize: 4,
        linesColor: "#dedede",
        linesWidth: 1,
        lineLinked: true,
        lineOpacity: 0.4,
        linesDistance: 150,
        moveSpeed: 3,
        hoverEffect: true,
        hoverMode: 0,
        clickEffect: true,
        clickMode: 0
      },
      shapeTypeArr: ["circle", "edge", "triangle", "polygon", "star"],
      hoverModeArr: ["grab", "repulse", "bubble"],
      clickModeArr: ["push", "remove", "repulse"]
    };
  },
  computed: {
    particlesData() {
      return Object.assign({}, this.particleDef, this.$props.particles);
    }
  }
};
</script>

<style lang="less">
.vue-particles {
  & > canvas {
    width: 100vw !important;
    height: 100vh !important;
    display: flex;
  }
}
</style>
