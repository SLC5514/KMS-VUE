<template>
  <div class="findpassword" ref="findpassword">
    <Particles :particles="particles" />
    <div class="findpassword-box">
      <div class="findpassword-com">
        <div class="title">找回密码</div>
        <Form ref="findpasswordForm" :model="formMod" :rules="ruleConf">
          <FormItem prop="user">
            <Input
              type="text"
              v-model="formMod.user"
              placeholder="用户名"
              prefix="ios-person-outline"
            />
          </FormItem>
          <FormItem prop="problem">
            <Select
              v-model="formMod.problem"
              placeholder="你的安全问题"
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
      <Modal
        v-model="successType"
        title="找回成功"
        class-name="vertical-top"
        :mask-closable="false"
        width="320"
        @on-ok="successFunc"
      >
        <p>您的密码是：{{ password }}</p>
      </Modal>
    </div>
  </div>
</template>

<script>
import { FormEnter } from "@/utils/index";

export default {
  name: "findpassword",
  components: {
    // 粒子组件
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
      },
      successType: false,
      password: ""
    };
  },
  mounted() {
    const self = this;
    FormEnter(self.$refs.findpassword, function() {
      self.findpasswordSubmit("findpasswordForm");
    });
  },
  computed: {
    // 安全问题
    problemArr() {
      return this.$store.getters.problemArr;
    }
  },
  methods: {
    // 提交找回
    findpasswordSubmit(name) {
      this.$refs[name].validate(valid => {
        const password = this.ruleFormMsg();
        if (valid && password) {
          this.password = password;
          this.successType = true;
        }
      });
    },
    // 验证表单信息
    ruleFormMsg() {
      switch (this.formMod.user) {
        case "root":
          if (this.formMod.problem == 0 && this.formMod.msg == "blur") {
            return "123456";
          } else {
            this.$Message.error("安全问题不匹配或答案错误!");
          }
          break;
        case "admin":
          if (this.formMod.problem == 1 && this.formMod.msg == "dog") {
            return "0123456";
          } else {
            this.$Message.error("安全问题不匹配或答案错误!");
          }
          break;
      }
    },
    // 确认
    successFunc() {
      this.$router.push("/login");
    }
  }
};
</script>

<style lang="less" scoped>
.findpassword-box {
  position: fixed;
  left: 50%;
  top: 20vh;
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
