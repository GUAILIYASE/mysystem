<template>
  <div class="p-a w-max h-max bg d-f j-c an-c">
    <div class="w500 h450 bgc-w">
      <div class="pd10 tx-c bbs">欢迎来到MT后台管理系统</div>
      <div class="pdr20 pdt30">
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名" prop="username">
            <el-input
              type="text"
              v-model="ruleForm.username"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass" ref="pw">
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
          <el-form-item label="验证码" prop="verificationCode">
            <el-input
              v-model="ruleForm.verificationCode"
              @focus="show"
            ></el-input>
            <div
              v-html="verificationCode"
              @click="getVerificationCode"
              v-if="ruleForm.show === true"
            ></div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="userLogin">立即登录</el-button>
            <el-button @click="userRegister">立即注册</el-button>
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
    let checkName=(rule, value, callback)=>{
      if(value===''){
        callback('用户名不能为空')
      }else{
        callback()
      }
    }
    let checkPass=(rule, value, callback)=>{
      if(value===''){
        callback('密码不能为空')
      }else{
        callback()
      }
    }
    let checkCode=(rule, value, callback)=>{
      if(value===''){
        callback('验证码不能为空')
      }else{
        callback()
      }
    }

    
    return {
      ruleForm: {
        username: "",
        pass: "",
        verificationCode: "",
        show: "",
      },
      rules: {
        username: [
          {
            validator:checkName,
            required: true,
            trigger: "blur",
          },
          {
            min: 5,
            message: "用户名至少5位",
          },

        ],
        pass: [
          { 
            validator:checkPass,
            required: true,
             trigger: "blur" },
          {
            min: 6,
            message: "密码输入有误",
          },
        ],
        verificationCode: [
          { 
            required: true, 
          trigger: "blur",
           validator:checkCode
           },
          {
            min: 4,
            max: 4,
            message: "验证码只有4位",
          },
         
        ],
      },
      verificationCode: "",
      passForm: {
        check: false,
      },
    };
  },
  components: {},
  methods: {
    getVerificationCode() {
      axios
        .get("api/captcha")
        .then((res) => {
          this.verificationCode = res.data;
          // console.log(res);
        })
        .catch();
    },
    userLogin() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          axios
            .post("api/user/login", {
              username: this.ruleForm.username,
              password: this.ruleForm.pass,
              code: this.ruleForm.verificationCode,
            })
            .then((res) => {
              console.log(res);
              if (res.data.message === "登录成功") {
                this.$message.success(res.data.message);
                localStorage.setItem(
                  "user",
                  JSON.stringify({
                    username: this.ruleForm.username,
                    password: this.ruleForm.pass,
                  })
                );
                this.$router.push("/");
              } else {
                this.$message.error(res.data.message);
                this.ruleForm.verificationCode = "";
                this.getVerificationCode();
              }
            });
        }else{
          this.$message.warning('信息填写有误')
        }
      });
    },
    userRegister() {
      this.$router.push("/register");
    },
    show() {
      this.ruleForm.show = true;
    },
  },
  mounted() {
    this.getVerificationCode();
  },
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