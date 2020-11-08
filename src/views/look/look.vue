<template>
  <div class="pd30">
    <el-card class="box-card"> 
    <el-button @click="()=>{this.$router.push('/havenPost')}" type="primary">返回</el-button>
      <div class="d-fc an-c j-c">
      <div class=" mb30 mt30">{{obj.title}}</div>
      <div class=" mb30">{{obj.abstract}}</div>
      <div class=" mb30">{{obj.author}}</div>
      <div class="w-90 h200">
        <el-card class="box-card h200">
      {{obj.text}}
      </el-card>
      </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "",
  props: {},
  data() {
    return {};
  },
  components: {},
  methods: {},
  mounted() {},
  computed: {
    obj() {
      return JSON.parse(localStorage.getItem("text"));
    },
  },
  watch: {},
};
</script>

<style lang='scss' scoped>
</style>