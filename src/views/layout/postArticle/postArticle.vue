<template>
  <div class="pd20">
    <el-card class="box-card">
      <div slot="header" class="clearfix d-f j-b">
        <span>卡片名称</span>
        <div>
          <el-button type="success" @click="onSubmit">发布</el-button>
          <el-button type="warning" @click="()=>{this.$router.push('/havenPost')}">查看</el-button>
        </div>
      </div>
      <el-form ref="form" :model="sizeForm" label-width="80px" :rules="rules">
        <el-form-item label="文章标题" prop="title">
          <el-input v-model="sizeForm.title"></el-input>
        </el-form-item>
        <el-form-item label="文章摘要" prop="abstract">
          <el-input v-model="sizeForm.abstract"></el-input>
        </el-form-item>
      </el-form>
      <el-form
        :inline="true"
        :model="sizeForm"
        label-width="80px"
        :rules="rules"
        ref="form1"
      >
        <el-form-item label="作者" prop="author">
          <el-input
            v-model="sizeForm.author"
            placeholder=""
            style="width: 100%"
          ></el-input>
        </el-form-item>
        <el-form-item label="类目" prop="category">
          <el-select
            v-model="sizeForm.category"
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
            v-model="sizeForm.source"
            placeholder="请选择活动区域"
            style="width: 100%"
          >
            <el-option label="原创" value="原创"></el-option>
            <el-option label="转载" value="转载"></el-option>
            <el-option label="与他人合作" value="与他人合作"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="重要性" prop="importance">
          <el-select
            v-model="sizeForm.importance"
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
        <el-form-item label="发表时间" prop="published">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="sizeForm.published"
            style="width: 100%"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="header" class="clearfix"></div>
      <mavon-editor v-model="value" />
    </el-card>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "",
  props: {},
  data() {
    return {
      value: "",
      sizeForm: {
        title: "",
        abstract: "",
        author: "",
        category: "",
        source: "",
        importance: "",
        published: "",
      },
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
        importance: [
          {
            message: "重要性为必填项",
            trigger: "blur",
            required: true,
          },
        ],
        published: [
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
    onSubmit() {
      this.$refs.form.validate((valie)=>{
        if(valie){
          this.$refs.form1.validate((isPass)=>{
            if(isPass){
              console.log(111)
               axios.post('api/article/create',{
                 title:this.sizeForm.title,
                 abstract:this.sizeForm.abstract,
                 author:this.sizeForm.author,
                 category:this.sizeForm.category,
                  source:this.sizeForm.source,
                  star:this.sizeForm.importance,
                  text:this.value,
                 date:this.sizeForm.published,
               }).then(res=>{
                 console.log(res)
                 if(res.data.data==='创建成功'){
                   this.$message.success(res.data.data)
                 }else{
                   this.$message.error('创建失败')
                 } 
               }).catch()
            }else{
              this.$message.error('表单填写有误')
            }
          })
        }
      })
    },
  },
  mounted() {},
  computed: {},
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