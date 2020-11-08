<template>
  <div class="bgi p-a w-max h-98  d-f j-c an-c ">
      <div class="p-r bm-300" @click="goto">
      <el-button type="warning">返回首页</el-button>
      </div>
      
    
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
  methods: {
    goto(){
      this.$router.replace('/')
    }
  },
  mounted() {},
  computed: {},
  watch: {},
};
</script>

<style lang="scss" scoped>
.bgi {
  background-image: url(https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3930452035,792865123&fm=26&gp=0.jpg);
  background-size: cover;
}
</style>