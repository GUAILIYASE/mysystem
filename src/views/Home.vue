<template>
  <div class="bgc">
     <statistics></statistics>
     <lineChart></lineChart>
     <orderTable></orderTable>
  </div>
</template>

<script>
import  statistics from '../components/home/statistics'
import  lineChart from '../components/home/lineChart'
import  orderTable from '../components/home/table'
export default {
  name: '',
  props:{},
  data () {
    return {
    }
  },
  components: {
    statistics,
    lineChart,
    orderTable,
  },
  methods: {},
  mounted() {},
  computed: {},
  watch: {}
}
</script>

<style lang="scss" scoped>
.bgc{
  background-color: rgb(235, 229, 229) !important;
}
</style>
