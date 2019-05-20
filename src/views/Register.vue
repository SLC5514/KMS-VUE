<template>
  <div class="register" ref="register">
    <Particles :particles="particles" />
    <div class="register-box">
      <div class="register-com">
        <div class="title">注册</div>
        <Form ref="registerForm" :model="formMod" :rules="ruleConf" clearable>
          <FormItem prop="user">
            <Input
              type="text"
              v-model="formMod.user"
              placeholder="填写一个用户名"
              prefix="ios-person-outline"
            />
          </FormItem>
          <FormItem prop="password">
            <Input
              type="password"
              v-model="formMod.password"
              placeholder="设置一个密码"
              prefix="ios-lock-outline"
            />
          </FormItem>
          <FormItem prop="problem">
            <Select
              v-model="formMod.problem"
              placeholder="选择一个安全问题（用于找回密码）"
              clearable
              prefix="ios-chatboxes-outline"
            >
              <Option v-for="(v, i) in problemArr" :value="v.value" :key="i">{{
                v.label
              }}</Option>
            </Select>
          </FormItem>
          <FormItem prop="msg">
            <Input
              type="text"
              v-model="formMod.msg"
              placeholder="问题答案"
              prefix="ios-text-outline"
            />
          </FormItem>
          <FormItem>
            <Button type="primary" long @click="registerSubmit('registerForm')"
              >登录</Button
            >
          </FormItem>
        </Form>
        <div class="operating">
          <router-link to="/login">登录</router-link>
          <router-link to="/findpassword">忘记密码</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { FormEnter } from "@/utils/index";

export default {
  name: "register",
  components: {
    // 粒子组件
    Particles: () => import("@/components/Particles.vue")
  },
  data() {
    // 用户名重复验证
    const validateUser = (rule, value, callback) => {
      if (value != "root") {
        callback();
      } else {
        callback(new Error());
      }
    };
    return {
      // 粒子组件数据
      particles: {
        color: "#C4BFE5",
        shapeType: 1,
        linesColor: "#C4BFE5",
        lineOpacity: 0.5
      },
      // 表单数据
      formMod: {
        user: "",
        password: "",
        problem: "",
        msg: ""
      },
      // 验证配置
      ruleConf: {
        user: [
          {
            required: true,
            message: "请填写用户名",
            trigger: "blur"
          },
          {
            type: "string",
            min: 2,
            message: "用户名长度不能少于2位",
            trigger: "blur"
          },
          {
            validator: validateUser,
            message: "此用户名已被注册",
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
        ],
        problem: [
          {
            required: true,
            type: "number",
            message: "请选择安全问题",
            trigger: "change"
          }
        ],
        msg: [
          {
            required: true,
            message: "请填写安全问题答案",
            trigger: "blur"
          },
          {
            type: "string",
            max: 20,
            message: "答案长度不能多于20位",
            trigger: "blur"
          }
        ]
      }
    };
  },
  mounted() {
    const self = this;
    FormEnter(self.$refs.register, function() {
      self.registerSubmit("registerForm");
    });
  },
  computed: {
    // 安全问题
    problemArr() {
      return this.$store.getters.problemArr;
    }
  },
  methods: {
    // 提交注册
    registerSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Message.success({
            content: "注册成功!",
            onClose: () => this.$router.push("/login")
          });
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.register-box {
  position: fixed;
  left: 50%;
  top: 20vh;
  transform: translateX(-50%);
  .register-com {
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
}
</style>
