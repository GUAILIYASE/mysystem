<template>
  <div class="pd20">
    <div class="w200 mb20 d-f">
      <el-input
        placeholder="请输入搜索商品名称"
        @change="
          () => {
            this.show = false;
          }
        "
        v-model="search"
      ></el-input>
      <el-button
        @click="
          () => {
            this.show = true;
          }
        "
      >
        Back
      </el-button>
    </div>
    <div>
      <el-card class="box-card">
        <div class="w-80 d-f">
          <div class="w-25">商品名称</div>
          <div class="w-30 tx-c">商品编号</div>
          <div class="w-20 tx-c">旧的价格</div>
          <div class="w-20 tx-c">活动价格</div>
        </div>

        <div v-if="!show">
          <div
            v-for="(item, index) in list2"
            :key="index"
            class="text item d-f j-b"
          >
            <div class="d-f w-80 j-b">
              <div class="w-25">
                {{ item.show ? "" : item.NAME }}
                <el-input
                  v-model="item.NAME"
                  v-if="item.show === true"
                  @blur="
                    () => {
                      item.show = false;
                    }
                  "
                ></el-input>
              </div>
              <div class="w-30 tx-c">{{ item.GOODS_SERIAL_NUMBER }}</div>
              <div class="w-20 tx-c">
                {{ item.show ? "" : item.ORI_PRICE }}
                <el-input
                  v-model.number="item.ORI_PRICE"
                  v-if="item.show === true"
                  @blur="
                    () => {
                      item.show = false;
                    }
                  "
                ></el-input>
              </div>
              <div class="w-20 tx-c">
                {{ item.show ? "" : item.PRESENT_PRICE }}
                <el-input
                  v-model.number="item.PRESENT_PRICE"
                  v-if="item.show === true"
                  @blur="
                    () => {
                      item.show = false;
                    }
                  "
                ></el-input>
              </div>
            </div>

            <div>
              <el-button type="success" @click="xg(item, index)"
                >修改</el-button
              >
              <el-button @click="del(item.index)" type="danger">删除</el-button>
            </div>
          </div>

          <div class="block">
            <span class="demonstration">完整功能</span>
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :page-sizes="[50, 60, 90, 100]"
              :page-size="50"
              layout=" sizes, prev, pager, next, jumper"
              :total="sum2"
            >
            </el-pagination>
          </div>
        </div>

        <div v-if="show">
          <div
            v-for="(item, index) in list1"
            :key="index"
            class="text item d-f j-b"
          >
            <div class="d-f w-80 j-b">
              <div class="w-25">
                {{ item.show ? "" : item.NAME }}
                <el-input
                  v-model="item.NAME"
                  v-if="item.show === true"
                  @blur="
                    () => {
                      item.show = false;
                    }
                  "
                ></el-input>
              </div>
              <div class="w-30 tx-c">{{ item.GOODS_SERIAL_NUMBER }}</div>
              <div class="w-20 tx-c">
                {{ item.show ? "" : item.ORI_PRICE }}
                <el-input
                  v-model.number="item.ORI_PRICE"
                  v-if="item.show === true"
                  @blur="
                    () => {
                      item.show = false;
                    }
                  "
                ></el-input>
              </div>
              <div class="w-20 tx-c">
                {{ item.show ? "" : item.PRESENT_PRICE }}
                <el-input
                  v-model.number="item.PRESENT_PRICE"
                  v-if="item.show === true"
                  @blur="
                    () => {
                      item.show = false;
                    }
                  "
                ></el-input>
              </div>
            </div>

            <div>
              <el-button type="success" @click="xg(item, index)"
                >修改</el-button
              >
              <el-button @click="del(item, index)" type="danger"
                >删除</el-button
              >
            </div>
          </div>

          <div class="block">
            <span class="demonstration">完整功能</span>
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :page-sizes="[50, 60, 90, 100]"
              :page-size="50"
              layout=" sizes, prev, pager, next, jumper"
              :total="sum"
            >
            </el-pagination>
          </div>
        </div>
      </el-card>
      <div class="d-f pd20 w-max">
       <download-excel
        class="export-excel-wrapper"
        :data="list1"
        :fields="json_fields"
        name="filename.xls"
      
      >
        <!-- 上面可以自定义自己的样式，还可以引用其他组件button -->
        <el-button type="primary" size="small" >导出EXCEL</el-button>
      </download-excel>

      <div class="ml20">
      <download-excel
        class="export-excel-wrapper"
        :data="list"
        :fields="json_fields"
        name="filename.cvs"
        type="cvs"
      >
        <!-- 上面可以自定义自己的样式，还可以引用其他组件button -->
        <el-button type="primary" size="small">导出cvs</el-button>
      </download-excel>
      </div>
      
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
    return {
      json_fields: {
        商品名: "NAME", //常规字段
        id: "GOODS_SERIAL_NUMBER", //常规字段
        旧的价格: "ORI_PRICE", //常规字段
        活动价: "PRESENT_PRICE", //常规字段
      },
      search: "",
      list: [],
      show: true,
      sum: -1,
      page: 1,
      num: 50,
    };
  },
  computed: {
    list1() {
      return this.list.slice((this.page - 1) * this.num, this.page * this.num);
    },
    list2() {
      return this.list.filter((item) => {
        return item.NAME.includes(this.search);
      });
    },
    sum2() {
      return this.list2.length;
    },
  },
  components: {},
  methods: {
    getData() {
      axios
        .get("api/tableData")
        .then((res) => {
          this.list = res.data.data;
          this.sum = this.list.length;
          this.list.map((item) => {
            this.$set(item, "show", false);
          });
          // console.log(this.list);
        })
        .catch();
    },
    del(item, index) {
      this.list.splice((this.page - 1) * this.num + index, 1);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.num = val;
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page = val;
    },
    xg(item, index) {
      this.list[index].show = true;
    },
  },
  mounted() {
    this.getData();
  },

  watch: {},
};
</script>

<style lang='scss' scoped>
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 90%;
}
</style>