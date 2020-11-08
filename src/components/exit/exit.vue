<template>
  <div @click="exit" class="p-a w-max h-98  bgi d-fc j-c an-c">
    <div>
      <h1 class="fs40 m20">是否退出此系统</h1>
    </div>
    <el-button type="warning">退出</el-button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "",
  props: {},
  data() {
    return {};
  },
  components: {},
  methods: {
    exit() {
      axios
        .get("api/user/logout")
        .then((res) => {
          this.$message.success(res.data.message);
          localStorage.removeItem("user");
          this.$router.push("/login");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {},
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.bgi {
  background-image: url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1604227496584&di=d5c164ece59bf4bf65113276d1fc739e&imgtype=0&src=http%3A%2F%2Fpic25.nipic.com%2F20121123%2F11301815_230659158187_2.jpg);
  background-size: cover;
}
</style>