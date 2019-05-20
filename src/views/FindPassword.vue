<template>
  <div>
    <Particles :particles="particles" />
    <div class="findpassword-box">
      <div class="findpassword-com">
        <div class="title">找回密码</div>
        <Form ref="findpasswordForm" :model="formMod" :rules="ruleConf">
          <FormItem prop="user">
            <Input type="text" v-model="formMod.user" placeholder="用户名">
              <Icon type="ios-person-outline" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem prop="password">
            <Input
              type="password"
              v-model="formMod.password"
              placeholder="密码"
            >
              <Icon type="ios-lock-outline" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              long
              @click="findpasswordSubmit('findpasswordForm')"
              >登录</Button
            >
          </FormItem>
        </Form>
        <div class="operating">
          <router-link to="/login">登录</router-link>
          <router-link to="/register">注册</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "findpassword",
  components: {
    Particles: () => import("@/components/Particles.vue")
  },
  data() {
    return {
      // 粒子组件数据
      particles: {
        color: "#C4BFE5",
        shapeType: 2,
        linesColor: "#C4BFE5",
        lineOpacity: 0.5
      },
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
  methods: {
    // 提交登录
    findpasswordSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid && this.ruleFormMsg()) {
          this.$Message.success("登录成功!");
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
.findpassword-box {
  position: fixed;
  left: 50%;
  top: 25vh;
  transform: translateX(-50%);
  .findpassword-com {
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
        width: 80px;
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
