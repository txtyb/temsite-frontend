<template>
  <!-- <img src="./assets/logo.png">
  <div>
    <p>
      If Element Plus is successfully added to this project, you'll see an
      <code v-text="'<el-button>'"></code>
      below
    </p>
    <el-button type="primary">el-button</el-button>
  </div>
  <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  <div class="common-layout">
    <el-container>
      <el-header>
        <el-row>
          <el-col :span="10">
            <span class="title">温湿度监测</span>
          </el-col>
          <el-col :span="8">
            <div class="slider-block">
              <el-slider
                v-model="dataNum"
                show-input
                @click="refresh"
                label="123"
              />
            </div>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" @click="refresh"
              >刷新 {{ setAutoRefresh }}</el-button
            >
          </el-col>
          <el-col :span="2" :pull="1">
            <el-switch
              class="refreshSwitch"
              v-model="setAutoRefresh"
              active-text="自动刷新"
              inline-prompt
              :active-icon="Check"
              :inactive-icon="Close"
              @change="refreshSwitch"
            />
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-card class="box-card">
          <el-space direction="horizonal" :fill="true" warp class="charts">
            <div class="chart">
              <line-chart
                :data="temdata"
                :min="null"
                :max="null"
                xtitle="时间"
                ytitle="温度℃"
              ></line-chart>
            </div>
            <el-divider />
            <div class="chart">
              <area-chart
                :data="rhdata"
                :min="null"
                :max="null"
                xtitle="时间"
                ytitle="湿度%"
              ></area-chart>
            </div>
            <!-- <area-chart
            :data="fetchData"
            :min="null"
            :max="null"
            xtitle="时间"
            ytitle="湿度%"
          ></area-chart> -->
          </el-space>
        </el-card>
        <el-card class="tables">
          <!-- <el-space direction="horizonal" :fill="true" warp> -->
          <el-table :data="tableData" style="width: 100%" max-height="250">
            <el-table-column fixed prop="time" label="时间" width="600" />
            <el-table-column prop="tem" label="温度" width="120" />
            <el-table-column fixed="right" prop="rh" label="湿度" width="120" />
          </el-table>
          <!-- </el-space> -->
        </el-card>
      </el-main>
      <el-footer>
        <el-card>
          <div class="rawdata">
            <p>raw tem: {{ temdata }}</p>
            <p>raw rh: {{ rhdata }}</p>
          </div>
        </el-card>
      </el-footer>
    </el-container>
  </div>
  <!-- <line-chart :data="[[new Date(), 5], [1368174456, 4], ['2017-01-01 00:00:00 UTC', 7]]"></line-chart> -->
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import { ref } from "vue"

export default {
  // el: "#app",
  name: "App",
  // setup() {
  //   const setAutoRefresh = ref(false)
  //   const dataNum = ref(50)
    
  //   return {
  //     setAutoRefresh, 
  //     dataNum
  //   }
  // }, 
  data() {
    return {
      // temdata: "",
      rhdata: "",
      temdata: "",
      tableData: [],
      // setAutoRefresh: ref(false), 
      // dataNum: ref(50), 
    };
  },
  computed: {
    fetchData() {
      return { "2021-01-01": 2, "2021-01-02": 3 };
    },
    // temdata: gettem()
  },
  created() {},
  mounted() {
    this.refresh();
    this.test();
  },
  methods: {
    // gettem() {
      //   var data;
    //   // var response = fetch("https://temsite-serverless-txtyb.vercel.app/api/gettem", {
    //   //   method: "get",
    //   // })
    //   fetch("https://temsite-serverless-txtyb.vercel.app/api/gettem", {method: 'get'})
    //   .then(res => res.json())
    //   .then(json => data = json)
    //   return data
    // },
    refresh() {
      // function updateData(url, dst) {
        //   fetch(url, {
          //     method: "get",
      //   })
      //     // .then(data => data.text())
      //     .then((data, dst) => {
        //       data.json()})
      //     .then((data, dst) => (dst = data));
      // }
      var url =
        "https://temsite-serverless-txtyb.vercel.app/api/gettem?n=" +
        this.dataNum;
      fetch(url, {
        method: "get",
      })
        // .then(data => data.text())
        .then((data) => data.json())
        .then((data) => (this.$data.temdata = data));
      // updateData(url, this.temdata);
      url =
        "https://temsite-serverless-txtyb.vercel.app/api/getrh?n=" +
        this.dataNum;
      fetch(url, {
        method: "get",
      })
        // .then(data => data.text())
        .then((data) => data.json())
        .then((data) => (this.$data.rhdata = data));
      url = "https://temsite-serverless-txtyb.vercel.app/api/get?ts=0";
      fetch(url, {
        method: "get",
      })
        // .then(data => data.text())
        .then((data) => data.json())
        .then((data) => (this.$data.tableData = data));
      console.log("refreshed");
    },
    test() {
      console.log("this is test");
    },
    // 切换自动刷新
    refreshSwitch() {
      console.log(this.setAutoRefresh);
      if (!this.setAutoRefresh) {
        clearInterval(this.autoRefresh);
        console.log("Auto refresh disabled");
      } else {
        this.autoRefresh = setInterval(() => {
          this.refresh();
        }, 5000);
        console.log("Auto refresh enabled");
      }
    },
  },
};
</script>
  
<script setup>
import { ref } from "vue";
import { Check, Close } from "@element-plus/icons-vue";
const setAutoRefresh = ref(false);

const dataNum = ref(50);

defineExpose({
  setAutoRefresh,
  dataNum,
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.chart {
  margin: 15px;
}
.title {
  font-weight: bold;
  font-size: 25px;
}
.refreshSwitch {
  /* margin-left: -80px; */
  margin-top: 8px;
}
.charts {
  overflow: hidden;
}
.slider-block {
  /* display: flex; */
  align-items: center;
}
</style>
