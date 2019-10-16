<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <div>
          <FlightsFilters :fligthsData="fligthsData" @filteritem="filteritem" />
        </div>

        <!-- 航班头部布局 -->
        <FlightsListHead />
        <div v-loading="loading">
          <!-- 航班信息 -->
          <FlightsItem v-for="(item,index) in changePage" :key="index" :item="item" />
        </div>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
        <FlightsAside />
      </div>
    </el-row>
    <div class="block" v-if="!loading && fligthsData.total>0">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageindex"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <div v-if="fligthsData.total===0" class="error">暂无该航班信息</div>
  </section>
</template>

<script>
import FlightsListHead from "@/components/air/flightsListHead";
import FlightsItem from "@/components/air/flightsItem";
import FlightsFilters from "@/components/air/flightsFilters";
import FlightsAside from "@/components/air/FlightsAside";
export default {
  components: {
    FlightsListHead,
    FlightsItem,
    FlightsFilters,
    FlightsAside
  },
  data() {
    return {
      // 飞机列表后台数据
      fligthsData: {
        options: {}
      },
      backupsfligthsData: {
        options: {}
      },
      // 当前页数
      pageindex: 1,
      // 每页显示多少条数据
      pagesize: 5,
      // 总共数据的条数
      total: "",
      // 根于pagesize显示的后台数据数量
      // flightsItem:[],
      loading: true
    };
  },
  methods: {
    // 筛选信息
    filteritem(arr) {
      this.backupsfligthsData.flights = arr;
      this.total = arr.length + 1;
    },
    // 改变每页条数时触发
    handleSizeChange(val) {
      this.pagesize = val;
      this.pageindex = 1;
    },
    //   改变页数时触发
    handleCurrentChange(val) {
      this.pageindex = val;
    }
  },
  computed: {
    changePage() {
      if (!this.loading) {
        const arr = this.backupsfligthsData.flights.slice(
          (this.pageindex - 1) * this.pagesize,
          this.pagesize * this.pageindex
        );
        return arr;
      }
    },
    FlightsAside() {},
    getFlightsData() {}
  },
  mounted() {
    // 获取后台机票数据
    this.$axios({
      url: "/airs",
      params: this.$route.query
    }).then(res => {
      this.fligthsData = res.data;
      this.backupsfligthsData = { ...res.data };
      this.total = res.data.flights.length + 1;
      this.loading = false;
    });
  },
  watch: {
    $route() {
      // 获取后台机票数据
      this.$axios({
        url: "/airs",
        params: this.$route.query
      }).then(res => {
        this.fligthsData = res.data;
        this.backupsfligthsData = { ...res.data };
        this.total = res.data.flights.length + 1;
        this.loading = false;
      });
    }
  }
};
</script>

<style scoped lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
}
.flights-content {
  width: 745px;
  font-size: 14px;
}
.aside {
  width: 240px;
}
.error {
  margin: 0 auto;
}
</style> 