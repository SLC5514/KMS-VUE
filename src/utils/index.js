// 表单回车提交
export const FormEnter = function(el, callback) {
  el.onkeypress = function(event) {
    const e = event || window.event;
    if (e.keyCode == 13) {
      callback();
    }
  };
};
