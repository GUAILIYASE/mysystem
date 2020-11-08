<template>
  <div class="d-f j-b pd10 w-90 ml20">
    <div v-for="(item, index) in keys" :key="index" class="w-20 d-f bgc-w pd20">
      <i
        class="iconfont fs80 mr20"
        :class="icon[index].path"
        :style="{ color: icon[index].color }"
      ></i>
      <div>
        <div>{{ item }}</div>
        <div class="fs40">
          <countTo
            :startVal="startValue"
            :endVal="value[index]"
            :duration="1000"
          ></countTo>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import countTo from "vue-count-to";
export default {
  name: "",
  props: {},
  data() {
    return {
      startValue: 0,
      keys: [],
      value: [],
      icon: [
        {
          path: "icon-yonghu",
          color: "green",
        },
        {
          path: "icon-duihua",
          color: "blue",
        },
        {
          path: "icon-qian",
          color: "red",
        },
        {
          path: "icon-gouwuchekong",
          color: "orange",
        },
      ],
    };
  },
  components: {
    countTo,
  },
  methods: {
    getStatistics() {
      axios
        .get("api/homeData")
        .then((res) => {
          this.value = Object.values(res.data.data);
          this.keys = Object.keys(res.data.data);
        })
        .catch();
    },
  },
  mounted() {
    this.getStatistics();
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
</style>