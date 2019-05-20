import Vue from "vue";
import iView from "iview";
import App from "./App.vue";
import router from "./router";
import store from "./vuex/index";
import VueParticles from "vue-particles";

import "iview/dist/styles/iview.css";
// import "./main.css";
// import "./theme/index.less";

Vue.use(iView);
Vue.use(VueParticles);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
