<template>
  <div class="pd30">
    <el-card class="box-card">
      <el-table :data="list" style="width: 100%">
        <el-table-column label="#" width="50px">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.$index }}</span>
          </template>
        </el-table-column>
        <el-table-column label="标题" width="150px">
          <template slot-scope="scope">
            <span size="medium">{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column label="作者" width="150px">
          <template slot-scope="scope">
            <span size="medium">{{ scope.row.author }}</span>
          </template>
        </el-table-column>
        <el-table-column label="类目" width="100px">
          <template slot-scope="scope">
            <span size="medium">{{ scope.row.category }}</span>
          </template>
        </el-table-column>
        <el-table-column label="来源" width="100px">
          <template slot-scope="scope">
            <span size="medium">{{ scope.row.source }}</span>
          </template>
        </el-table-column>
        <el-table-column label="重要性" width="150px">
          

       <template slot-scope="scope">
            <span size="medium">
              <el-rate
                v-model="scope.row.star"
                disabled
                text-color="#ff9900"
              >
              </el-rate>
            </span>
          </template>



        </el-table-column>
        <el-table-column label="发布时间" width="200">
          <template slot-scope="scope">
            <span size="medium">{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope" width="200" >
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
             type="success" >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
            <el-button
              size="mini"
              type="primary"
              @click="handleLook(scope.$index, scope.row)"
              >查看</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";
import dayjs from "dayjs";
export default {
  name: "",
  props: {},
  data() {
    return {
      list: [],
    };
  },
  components: {},
  methods: {
    all() {
      axios
        .get("api/article/allArticle ")
        .then((res) => {
          this.list = res.data.data;
          this.list.map(item=>{
            item.star=Number(item.star)
            item.date=dayjs(item.date).format("YYYY-MM-DD HH:mm:ss")
          })
        })
        .catch();
    },
    handleDelete(index,row) {
      axios.post("api/article/delete",{
        _id:this.list[index]._id
      }).then(res=>{
        // console.log(res)
        this.all();
      }).catch()
    },
    handleEdit(index,row){
      localStorage.setItem('text',JSON.stringify(this.list[index]) )
      this.$router.push({name:'edit'})
    },
    handleLook(index,row){
      localStorage.setItem('text',JSON.stringify(this.list[index]) )
      this.$router.push({name:'look'})
    },
  },
  mounted() {
    this.all();
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.box-card {
  width: 90%;
}
</style>