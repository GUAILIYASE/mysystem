<template>
  <div>
    <div class="bgc pdb10 pdt10 fs30 mb20">上传方式一</div>
    只能上传jpg/png文件，且不超过500kb
    <el-upload class="upload-demo" drag action="api/upload" multiple>
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">
        只能上传jpg/png文件，且不超过500kb
      </div>
    </el-upload>

    <div>
      <div class="bgc pdb10 pdt10 fs30 mb20 mt20">上传方式2</div>
      <el-button class="btn" @click="toggleShow" type="success">上传图片</el-button>
      <my-upload
        @crop-success="cropSuccess"
        @crop-upload-success="cropUploadSuccess"
        @crop-upload-fail="cropUploadFail"
        v-model="show"
        :width="300"
        :height="300"
        img-format="png"
        :size="size"
        langType="zh"
        :noRotate="false"
        field="file"
        url="api/upload"
      ></my-upload>
      <img :src="imgDataUrl" />
    </div>
  </div>
</template>

<script>
import "babel-polyfill"; // es6 shim
import myUpload from "vue-image-crop-upload";
export default {
  data() {
    return {
      imgDataUrl: "",
      show: false,
      size: 2.1,
    };
  },
  components: {
    "my-upload": myUpload,
  },
  methods: {
    toggleShow() {
      this.show = !this.show;
    },
    cropSuccess(imgDataUrl, field) {
      console.log("-------- crop success --------", imgDataUrl, field);
    },
    //上传成功回调
    cropUploadSuccess(jsonData, field) {
      console.log("-------- upload success --------");
      this.imgDataUrl = jsonData.files;
      console.log(jsonData);
      console.log("field: " + field);
    },
    //上传失败回调
    cropUploadFail(status, field) {
      console.log("-------- upload fail --------");
      console.log("上传失败状态" + status);
      console.log("field: " + field);
    },
  },

  mounted() {},
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.bgc {
  background-color: rgb(196, 189, 189);
}
</style>