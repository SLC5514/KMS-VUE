import { CHANGE_LOGINSTATE } from "./mutation-types";

export default {
  // 切换登录状态
  [CHANGE_LOGINSTATE](state, msg) {
    state.loginState = msg;
  }
};
