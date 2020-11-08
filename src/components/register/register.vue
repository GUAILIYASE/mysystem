<template>
  <div class="p-a w-max h-max bg d-f j-c an-c">
    <div class="w500 h350 bgc-w">
      <div class="pd10 tx-c bbs">欢迎来到MT后台管理系统</div>
      <div class="pdr20 pdt30">
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
        >
          <el-form-item label="用户名" prop="username">
            <el-input
              type="text"
              v-model="ruleForm.username"
              autocomplete="off"
            ></el-input>
          </el-form-item>

          <el-form-item label="密码" prop="pass">
            <el-input
              :type="passForm.check ? 'text' : 'password'"
              autocomplete="off"
              v-model="ruleForm.pass"
            >
              <i
                slot="suffix"
                :class="
                  passForm.check
                    ? 'iconfont icon-yanjing2'
                    : 'iconfont icon-yanjing1'
                "
                @click="passForm.check = !passForm.check"
              ></i>
            </el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input
              :type="passForm.check ? 'text' : 'password'"
              autocomplete="off"
              v-model="ruleForm.checkPass"
            >
              <i
                slot="suffix"
                :class="
                  passForm.new
                    ? 'iconfont icon-yanjing2'
                    : 'iconfont icon-yanjing1'
                "
                @click="passForm.new = !passForm.new"
              ></i>
            </el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="register('ruleForm')">立即注册</el-button>
            <el-button @click="userLogin">立即登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "",
  props: {},
  data() {
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value.length < 6) {
        callback(new Error("密码最少为6位"));
      } else {
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    let CheckName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        var filter = /^[0-9A-Za-z.@\-\_]{5,16}$/;
        if (filter.test(value)) {
          callback()
        } else {
          callback("您的用户名格式不正确");
        }
      }
    };

    return {
      ruleForm: {
        username: "",
        pass: "",
        checkPass: "",
        show: "",
      },
      rules: {
        username: [
          {
            validator: CheckName,
            required: true,
            trigger: "blur",
          },
        ],
        pass: [
          {
            validator: validatePass,
            required: true,
            trigger: "blur",
          },
        ],
        checkPass: [
          {
            validator: validatePass2,
            required: true,
            trigger: "blur",
          },
        ],
      },
      passForm: {
        new: false,
        check: false,
      },
    };
  },
  components: {},
  methods: {
    register(ruleForm) {   
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          axios
            .post("api/user/register", {
              username: this.ruleForm.username,
              password: this.ruleForm.pass,
            })
            .then((res) => {
              if (res.data.message === "注册成功") {
                this.$message({
                  message: res.data.message,
                  type: "success",
                });
                this.$router.push("/login");
              } else {
                this.$message({
                  message: res.data.message,
                  type: "warning",
                });
              }
            })
            .catch();
        } else {
          console.log(valid);
          this.$message({
            message: "表单验证失败",
            type: "warning",
          });
          this.ruleForm.username = "";
          this.ruleForm.pass = "";
          this.ruleForm.checkPass = "";
        }
      });
    },
    userLogin() {
      this.$router.push("/login");
    },
  },
  mounted() {},
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.bg {
  background-image: url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1604136198542&di=a554b251a0c984bcc7006b1dad996bab&imgtype=0&src=http%3A%2F%2Fpic.soutu123.cn%2Fback_pic%2F04%2F02%2F53%2F925804971e7a823.jpg%2521%2Ffw%2F700%2Fquality%2F90%2Funsharp%2Ftrue%2Fcompress%2Ftrue);
  background-size: cover;
}
.bbs {
  border-bottom: 1px solid #000;
}
</style>