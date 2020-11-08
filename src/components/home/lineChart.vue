<template>
  <div class="w-90 m20 p-r lt10">
    <div class="mb20 bgc-w">
      <ve-line :data="list" width="100%"></ve-line>
    </div>

    <div class="d-f j-b bgc-w mb20 bgc-w">
      <div class="w-30 ">
        <ve-radar :data="list1" width="100%"></ve-radar>
      </div><hr>
      <div class="w-30 ">
        <ve-pie :data="list2" width="100%"></ve-pie>
      </div><hr>
      <div class="w-30">
        <ve-histogram :data="list3" width="100%"></ve-histogram>
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
      list: {
        columns: [],
        rows: [],
      },
      list1: {
        columns: [],
        rows: [],
      },
      list2: {
        columns: [],
        rows: [],
      },
      list3: {
        columns: [],
        rows: [],
      },
    };
  },
  components: {},
  methods: {
    getData() {
      axios
        .get("api/homeChat")
        .then((res) => {
          this.list.columns = Object.keys(res.data.data[0]);
          this.list3.columns = Object.keys(res.data.data[0]);
          this.list.rows = res.data.data;
          this.list3.rows = res.data.data;
        })
        .catch();
    },
    getData1() {
      axios
        .get("api/radarChat")
        .then((res) => {
          this.list1.columns = Object.keys(res.data.data[0]);
          this.list1.rows = res.data.data;
        })
        .catch();
    },
    getData2() {
      axios
        .get("api/ringChat")
        .then((res) => {
          this.list2.columns = Object.keys(res.data.data[0]);
          this.list2.rows = res.data.data;
        })
        .catch();
    },

  },
  mounted() {
    this.getData();
    this.getData1();
    this.getData2();

  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
</style>