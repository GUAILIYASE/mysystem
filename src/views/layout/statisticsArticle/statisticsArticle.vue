<template>
  <div>
    <el-card>
    <div class="d-f">
    <div class="w-25">今日发布
    <div>{{news.today}}</div>
    </div>
    <div class="w-25">原创
    <div>
    {{news.self}}
    </div>
    </div>
    <div class="w-25">新留言</div>
    <div class="w-25">新消息</div>
    </div>
    <div class="d-f">
      <div class="w-50">
        <ve-pie :data="obj"></ve-pie>
      </div>
      <div class="w-40 ">
        <ve-pie :data="obj1" :settings="chartSettings"></ve-pie>
      </div>
    
    </div>
    <ve-waterfall :data="obj1"></ve-waterfall>

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
    this.chartSettings = {
        roseType: 'radius'
      }
    return {
      list: [],
      list1: [],
      list2: [],
      list3: [],
      obj: {
        columns: [],
        rows: [],
      },
      obj1: {
        columns: [],
        rows: [],
      },

      news: {
        today: 0,
        old: 0,
        self:0,
      },
    };
  },
  components: {},
  methods: {
    getAll() {
      axios
        .get("api/article/allArticle")
        .then((res) => {
          this.list = res.data.data;
          this.getlist();
        })
        .catch();
    },
    getlist() {
      this.list.map((item) => {
        this.list1.push({
          class: item.source,
          num: 0,
        });
        this.list2.push({
          days: dayjs(item.date).format("YYYY-MM-DD"),
          num: 0,
        });
        this.list3.push({
          category: item.category,
          num: 0,
        });
      });

      const res = new Map();
      this.list1 = this.list1.filter(
        (a) => !res.has(a.class) && res.set(a.class, 1)
      );
      this.list3 = this.list3.filter(
        (a) => !res.has(a.category) && res.set(a.category, 1)
      );

      let days = dayjs(new Date()).format("YYYY-MM-DD");

      this.list.map((item) => {
        if(item.source==='原创')this.news.self++
        this.list1.map((i) => {
          if (i.class === item.source) i.num++;
          
        });
        this.list3.map((i) => {
          if (i.category === item.category) i.num++;
        });
      });

      this.list2.map((i) => {
        if (i.days === days) {
          this.news.today++;
          console.log(this.news.today);
        } else {
          this.news.old++;
        }
      });

      this.obj.columns = Object.keys(this.list1[0]);
      this.obj.rows = this.list1;
      this.obj1.columns = Object.keys(this.list3[0]);
      this.obj1.rows = this.list3;
    },
  },
  mounted() {
    this.getAll();
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
</style>