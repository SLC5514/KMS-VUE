<template>
  <div class="login-com" ref="login-com">
    <div class="title">登录</div>
    <Form ref="loginForm" :model="formMod" :rules="ruleConf">
      <FormItem prop="user">
        <Input
          type="text"
          v-model="formMod.user"
          placeholder="用户名"
          prefix="ios-person-outline"
        />
      </FormItem>
      <FormItem prop="password">
        <Input
          type="password"
          v-model="formMod.password"
          placeholder="密码"
          prefix="ios-lock-outline"
        />
      </FormItem>
      <FormItem>
        <Button type="primary" long @click="loginSubmit('loginForm')"
          >登录</Button
        >
      </FormItem>
    </Form>
    <div class="operating">
      <router-link to="/register">注册</router-link>
      <router-link to="/findpassword">忘记密码</router-link>
    </div>
  </div>
</template>

<script>
import { FormEnter } from "@/utils/index";

export default {
  name: "login-com",
  data() {
    return {
      // 表单数据
      formMod: {
        user: "",
        password: ""
      },
      // 验证配置
      ruleConf: {
        user: [
          {
            required: true,
            message: "请填写用户名",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请填写密码",
            trigger: "blur"
          },
          {
            type: "string",
            min: 6,
            message: "密码长度不能少于6位",
            trigger: "blur"
          }
        ]
      }
    };
  },
  mounted() {
    const self = this;
    FormEnter(self.$refs["login-com"], function() {
      self.loginSubmit("loginForm");
    });
  },
  methods: {
    // 提交登录
    loginSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid && this.ruleFormMsg()) {
          this.$Message.success({
            content: "登录成功!",
            onClose: () => this.$router.push("/index")
          });
        }
      });
    },
    // 验证表单信息
    ruleFormMsg() {
      if (this.formMod.user == "root" && this.formMod.password == 123456) {
        return true;
      } else {
        this.$Message.error("用户名或密码错误!");
      }
    }
  }
};
</script>

<style lang="less" scoped>
.login-com {
  width: 320px;
  background: rgba(196, 191, 229, 0.5);
  box-shadow: 0 0 0 5px rgba(196, 191, 229, 0.3);
  padding: 20px;
  box-sizing: border-box;
  user-select: none;
  .title {
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    letter-spacing: 2px;
    position: relative;
    margin-bottom: 20px;
    &::before,
    &::after {
      content: "";
      position: absolute;
      left: 0;
      top: 50%;
      width: 100px;
      border-top: 1px solid #aaa;
    }
    &::after {
      left: auto;
      right: 0;
    }
  }
  .operating {
    display: flex;
    justify-content: space-between;
    & > a {
      color: #666;
      font-size: 12px;
      transition: color 0.2s ease-in-out;
      &:hover {
        color: #2d8cf0;
      }
      &:active {
        color: #007bff;
      }
    }
  }
}
</style>
