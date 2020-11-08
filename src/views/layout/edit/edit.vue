<template>
  <div class="pd20">
    <el-card class="box-card">
      <div slot="header" class="clearfix d-f j-b">
        <span>卡片名称</span>
        <div>
          <el-button type="success" @click="updated">发布</el-button>
          <el-button type="warning" @click="()=>{this.$router.push({name:havenPost})}">查看</el-button>
        </div>
      </div>
      <el-form ref="form" :model="obj1" label-width="80px" :rules="rules">
        <el-form-item label="文章标题" prop="title">
          <el-input v-model="obj1.title"></el-input>
        </el-form-item>
        <el-form-item label="文章摘要" prop="abstract">
          <el-input v-model="obj1.abstract"></el-input>
        </el-form-item>
      </el-form>
      <el-form
        :inline="true"
        :model="obj1"
        label-width="80px"
        :rules="rules"
        ref="form1"
      >
        <el-form-item label="作者" prop="author">
          <el-input
            v-model="obj1.author"
            placeholder=""
            style="width: 100%"
          ></el-input>
        </el-form-item>
        <el-form-item label="类目" prop="category">
          <el-select
            v-model="obj1.category"
            placeholder="请选择活动区域"
            style="width: 100%"
          >
            <el-option label="React" value="React"></el-option>
            <el-option label="Node.js" value="Node.js"></el-option>
            <el-option label="性能优化" value="性能优化"></el-option>
            <el-option label="JavaScript" value="JavaScript"></el-option>
            <el-option label="小程序" value="小程序"></el-option>
            <el-option label="工具类" value="工具类"></el-option>
            <el-option label="其他" value="其他"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="来源" prop="source">
          <el-select
            v-model="obj1.source"
            placeholder="请选择活动区域"
            style="width: 100%"
          >
            <el-option label="原创" value="原创"></el-option>
            <el-option label="转载" value="转载"></el-option>
            <el-option label="与他人合作" value="与他人合作"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="重要性" prop="star">
          <el-select
            v-model="obj1.star"
            placeholder="请选择活动区域"
            style="width: 100%"
          >
            <el-option label="1" value="1"></el-option>
            <el-option label="2" value="2"></el-option>
            <el-option label="3" value="3"></el-option>
            <el-option label="4" value="4"></el-option>
            <el-option label="5" value="5"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发表时间" prop="date">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="obj1.date"
            style="width: 100%"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="header" class="clearfix"></div>
      <mavon-editor v-model="obj1.text" />
    </el-card>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "",
  props: {},
  data() {
    return {
         obj1:{},
      rules: {   
        title: [
          {
            message: "标题为必填项",
            trigger: "blur",
            required: true,
          },
        ],
        abstract: [
          {
            message: "摘要为必填项",
            trigger: "blur",
            required: true,
          },
        ],
        author: [
          {
            message: "作者为必填项",
            trigger: "blur",
            required: true,
          },
        ],
        category: [
          {
            message: "标题为必填项",
            trigger: "blur",
            required: true,
          },
        ],
        source: [
          {
            message: "来源为必填项",
            trigger: "blur",
            required: true,
          },
        ],
        star: [
          {
            message: "重要性为必填项",
            trigger: "blur",
            required: true,
          },
        ],
        date: [
          {
            message: "发布时间为必填项",
            trigger: "blur",
            required: true,
          },
        ],
      },
    };
  },
  components: {},
  methods: {
    updated() {
      this.$refs.form.validate((valie) => {
        if (valie) {
          this.$refs.form1.validate((isPass) => {
            if (isPass) {
              axios
                .post("api/article/update", {
                  id: this.obj1._id,
                  title: this.obj1.title,
                  abstract: this.obj1.abstract,
                  author: this.obj1.author,
                  category: this.obj1.category,
                  source: this.obj1.source,
                  star: this.obj1.star,
                  text: this.obj1.text,
                  date: this.obj1.date,
                })
                .then((res) => {
                  console.log(res);
                  if (res.data.success) {
                    this.$message.success('修改成功');
                  } else {
                    this.$message.error("修改失败");
                  }
                })
                .catch();
            } else {
              this.$message.error("表单填写有误");
            }
          });
        }
      });
    },
    getObj(){
        this.obj1=JSON.parse(localStorage.getItem("text"))
    }
  },
  mounted() {
      this.getObj()
  },
  computed: {
    
  },
  watch: {},
};
</script>

<style lang='scss' scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 90%;
}
</style>