<template>
  <div class="w-max p-a h-max d-f j-b an-c cw">
    <div class="m20">尊敬的{{ user.username }},欢迎来到MT后台管理系统</div>
    <div class="m20 d-f">
      <div>{{ sayHello }}</div>
      <div class="ml20">{{ times }} 登陆时间：{{times1}}</div>
    </div>
  </div>
</template>



<script>
import dayjs from "dayjs";
export default {
  name: "",
  props: {},
  data() {
    return {
      user: {
        username: "",
      },
      sayHello: "",
      times: "",
      times1: "",
    };
  },
  components: {},
  methods: {
    getId() {
      let str = localStorage.getItem("user");
      this.user = JSON.parse(str);
    },
    getTime() {
        this.times1 = dayjs(`${new Date()}`).format('YYYY-MM-DD HH:mm:ss');

      setInterval(() => {
        this.times = dayjs(`${new Date()}`).format('YYYY-MM-DD HH:mm:ss');
        if (dayjs().hour() >= 6 && dayjs().hour() < 12) {
          this.sayHello = "早上好";
        } else if (dayjs().hour() >= 12 && dayjs().hour() < 14) {
          this.sayHello = "中午好";
        } else if (dayjs().hour() >= 14 && dayjs().hour() < 18) {
          this.sayHello = "下午好";
        }else  if (dayjs().hour() >= 18 && dayjs().hour() <=23) {
          this.sayHello = "晚上好";
        }else  {
          this.sayHello = "该睡觉了";
        }
      }, 1000);
    },
  },
  mounted() {
    this.getId();
    this.getTime();
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
</style>