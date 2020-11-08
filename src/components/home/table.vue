<template>
  <div class="w-90 m20 d-f">
    <el-card class="box-card">
      <el-table :data="tableData" style="width: 100%" s>
        <el-table-column fixed prop="num" label="order-no" width="150">
        </el-table-column>
        <el-table-column prop="price" label="Price" width="120">
        </el-table-column>
        <el-table-column label="status" width="100">
          <template slot-scope="tableData">
            <el-button :type="tableData.row.status === 1 ? 'success' : 'danger'"
              >{{ tableData.row.status === 1 ? "success" : "pending" }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-card class="box-card d-fc ml20 j-b p-r w-30" width="30%">
      <div>
        <div slot="header" class="clearfix d-f j-b mb20">
          <span
            class="iconfont"
            :class="flag ? 'icon-xiala1' : 'icon-xiala2'"
            @click="allCheck"
          ></span>
          <span>todolist</span>
        </div>
        <div v-if="list1">
          <div
            v-for="(item, index) in todoList1"
            :key="index"
            class="d-f j-b mb20"
          >
            <div>
              <el-checkbox
                v-model="item.checked"
                @change="filter"
              ></el-checkbox>
              {{ item.name }}
            </div>
            <div class="hov">
              <i class="iconfont icon-wrong"></i>
            </div>
          </div>
        </div>

        <div v-if="list2">
          <div
            v-for="(item, index) in todoList2"
            :key="index"
            class="d-f j-b mb20"
          >
            <div>
              <el-checkbox
                v-model="item.checked"
                @change="filter"
              ></el-checkbox>
              {{ item.name }}
            </div>
            <div class="hov">
              <i class="iconfont icon-wrong" @click="del(index, todoList2)"></i>
            </div>
          </div>
        </div>
      </div>

      <div class="p-a bm100">
        <div v-if="list1 && list2">
          {{ todoList1.length + todoList2.length }}
        </div>
        <div v-if="list1 && !list2">{{ todoList1.length }}</div>
        <div v-if="!list1 && list2">{{ todoList2.length }}</div>

        <el-button @click="show">All</el-button>
        <el-button @click="show1">Active</el-button>
        <el-button @click="show2">Complant</el-button>
      </div>
    </el-card>

    <el-card class="box-card ml20">
      <div>
        <img
          src="https://wpimg.wallstcn.com/e7d23d71-cf19-4b90-a1cc-f56af8c0903d.png"
          alt=""
        />
      </div>
      <el-progress
        v-for="(item, index) in list.rows"
        :text-inside="true"
        :stroke-width="24"
        :percentage="item.progress * 100"
        :key="index"
        :status="item.progress === 1 ? 'success' : 'exception'"
        class="mt20 mb20"
      ></el-progress>
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
      flag: false,
      tableData: [],
      todoList: [],
      todoList1: [],
      todoList2: [],
      list: {
        columns: [],
        rows: [],
      },
      list1: true,
      list2: true,
    };
  },
  components: {},
  methods: {
    getTable() {
      axios
        .get("api/orderData")
        .then((res) => {
          this.tableData = res.data.data;
        })
        .catch();
    },
    getTodolist() {
      axios
        .get("api/todoList")
        .then((res) => {
          this.todoList = res.data.data;
          this.filter();
        })
        .catch();
    },
    allCheck() {
      this.todoList.map((item) => {
        item.checked = this.flag;
      });
      this.flag = !this.flag;
      this.filter();
    },
    show() {
      this.list1 = true;
      this.list2 = true;
    },
    show1() {
      this.list1 = true;
      this.list2 = false;
    },
    show2() {
      this.list1 = false;
      this.list2 = true;
    },
    filter() {
      this.todoList2 = this.todoList.filter((item) => {
        return item.checked === true;
      });
      this.todoList1 = this.todoList.filter((item) => {
        return item.checked === false;
      });
    },
    del(index, arr) {
      arr.splice(index, 1);
    },
    getProgress() {
      axios
        .get("api/progress")
        .then((res) => {
          this.list.columns = Object.keys(res.data.data[0]);

          this.list.rows = res.data.data;
        })
        .catch();
    },
  },
  mounted() {
    this.getTable();
    this.getTodolist();
    this.getProgress();
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.bgc {
  background-color: rgb(235, 229, 229) !important;
}
.hov {
  opacity: 0;
}
.hov:hover {
  opacity: 1;
}
</style>