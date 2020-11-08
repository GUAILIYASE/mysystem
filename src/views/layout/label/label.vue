<template>
  <div class="pd20">
    <div class="d-f">
      <div class="mr20" @click="show(1)">
        未读消息{{ arr1.length > 0 ? `(${arr1.length})` : "" }}
      </div>
      <div class="mr20" @click="show(2)">
        已读消息{{ arr2.length > 0 ? `(${arr2.length})` : "" }}
      </div>
      <div class="mr20" @click="show(3)">
        回收站{{ arr3.length > 0 ? `(${arr3.length})` : "" }}
      </div>
    </div>
    <div class="w-p0">
      <el-card class="box-card" width="90%">
        <div v-if="num === 1">
          <div
            v-for="(item, index) in arr1"
            :key="item.id"
            class="text item d-f j-b"
          >
            <div>
              {{ item.content }}
            </div>
            <div>
              {{ item.time }}
              <el-button @click="alredy(item, index)">标记为已读</el-button>
            </div>
          </div>
          <div>{{ arr1.length > 0 ? "" : "暂无数据" }}</div>
          <el-button @click="allalredy" v-if="arr1.length > 0"
            >全部已读</el-button
          >
        </div>

        <div v-if="num === 2">
          <div
            v-for="(item, index) in arr2"
            :key="item.id"
            class="text item d-f j-b"
          >
            <div>
              {{ item.content }}
            </div>
            <div>
              {{ item.time }}
              <el-button @click="remove(item, index)">移入回收站</el-button>
            </div>
          </div>
          <div>{{ arr2.length > 0 ? "" : "暂无数据" }}</div>
          <el-button @click="allremove" v-if="arr2.length > 0"
            >全部放入回收站</el-button
          >
        </div>

        <div v-if="num === 3">
          <div
            v-for="(item, index) in arr3"
            :key="item.id"
            class="text item d-f j-b"
          >
            <div>
              {{ item.content }}
            </div>
            <div>
              {{ item.time }}
              <el-button @click="recycle(item, index)">恢复</el-button>
            </div>
          </div>
          <div>{{ arr3.length > 0 ? "" : "暂无数据" }}</div>
            <el-button @click="allclear" v-if="arr3.length > 0"
            >全部删除</el-button
          >
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {},
  data() {
    return {
      arr: [
        {
          id: 1,
          read: false,
          recycle: false,
          time: "2018-04-19 20:00:00",
          content: "[系统通知]该系统将于今晚凌晨2点到5点进行升级维护",
        },
        {
          id: 2,
          read: false,
          recycle: false,
          time: "2018-04-19 21:00:00",
          content: "今晚12点整发大红包,先到先得",
        },
        {
          id: 3,
          read: false,
          recycle: false,
          time: "2018-04-19 20:00:00",
          content: "[系统通知]该系统将于今晚凌晨2点到5点进行升级维护",
        },
        {
          id: 4,
          read: false,
          recycle: false,
          time: "2018-04-19 20:00:00",
          content: "[系统通知]您的优惠券已经过期",
        },
      ],
      arr1: [],
      arr2: [],
      arr3: [],
      num: 1,
    };
  },
  components: {},
  methods: {
    alredy(im, ix) {
     
      this.arr.map((item, index) => {
        if (item.id === im.id) item.read = true;
      });
      this.filt();
    },
    remove(im, ix) {
     
      this.arr.map((item, index) => {
        if (item.id === im.id) item.recycle = true;
      });
      this.filt();
    },
    recycle(im, ix) {
     
      this.arr.map((item, index) => {
        if (item.id === im.id) item.recycle = false;
      });
      this.filt();
    },
    filt() {
      this.arr1 = this.arr.filter((item) => {
        return item.read === false && item.recycle === false;
      });
      this.arr2 = this.arr.filter((item) => {
        return item.read === true && item.recycle === false;
      });
      this.arr3 = this.arr.filter((item) => {
        return item.read === true && item.recycle === true;
      });
    },
    show(num) {
      this.num = num;
    },
    allalredy() {
      this.arr.map((item) => {
        item.read = true;
      });
      this.filt();
    },
    allremove() {
      this.arr.map((item) => {
        item.recycle = true;
      });
      this.filt();
    },
    allclear() {
      this.arr = this.arr.filter((item) => {
        return item.read === false || item.recycle === false;
      });
      this.filt();
    },
  },
  mounted() {
    this.arr1 = this.arr;
  },
  computed: {},
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