<template>
  <div>
    <el-container>
      <el-header height="100px" class="bcb a w-max pd0 bgc ">
           <useHead></useHead>
      </el-header>

      <el-container>
        <el-aside width="10%" class="h-98 a tp100 ">
          <el-menu
            :default-active="this.$route.path"
            router
            mode="horizontal"
            class="el-menu-vertical-demo d-fc p-a h-90"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            ref="meun"
          >
            <el-menu-item
              v-for="(item, i) in navList"
              :key="i"
              :index="item.name"
            >
              {{ item.navItem }}
            </el-menu-item>
          </el-menu>
        </el-aside>

        <el-main   class=" lt_10 p-r tp100 pd0 a w-90 h-90 z1">
          <router-view />
        </el-main>

      </el-container>
    </el-container>
  </div>
</template>

<script>
import useHead from '../../components/head/head'

export default {
  name: "",
  props: {},
  data() {
    return {
      navList: [
        { name: "/", navItem: "首页" },
        { name: "/pagination", navItem: "excel" },
        { name: "/label", navItem: "标签页" },
        { name: "/imgupload", navItem: "图片上传" },
        { name: "/postArticle", navItem: "发布文章" },
        { name: "/havenPost", navItem: "已发布" },
        { name: "/statisticsArticle", navItem: "统计文章" },
        { name: "/exit", navItem: "退出系统" },
      ],
    };
  },
  components: {
    useHead,
  },
  methods: {
    change() {
      this.$router.push("/exit/");
    },
  },
  mounted() {},
  computed: {},
  watch: {
    $route(to,from){
      if(from.path==='/havePost'&&(to.path==='edit'||to.path==='look')){
       
      }
    }


  },
};
</script>

<style lang='scss' scoped>
.a {
  position: fixed;
}
.bgc{
  background-color:#545c64;
}
</style>