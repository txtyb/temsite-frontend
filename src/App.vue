<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup

import { onMounted, ref, reactive } from "vue";
import { Check, Close, Setting } from "@element-plus/icons-vue";
import { Timer } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const displayTokenSubmitMsg = () => {
  ElMessage({
    showClose: true,
    message: '添加成功',
    type: 'success',
  })
}

// const dataNum = ref(50);

// const rhdata = ref("");
// const temdata = ref("");
// const tableData = ref([]);

// function refresh() {
//   console.log(`dataNum = ${dataNum.value}`);
//   var url =
//     "https://temsite-serverless-txtyb.vercel.app/api/gettem?n=" + dataNum.value;
//   fetch(url, {
//     method: "get",
//   })
//     // .then(data => data.text())
//     .then((data) => data.json())
//     .then((data) => (temdata.value = data));
//   // updateData(url, this.temdata);
//   url =
//     "https://temsite-serverless-txtyb.vercel.app/api/getrh?n=" + dataNum.value;
//   fetch(url, {
//     method: "get",
//   })
//     // .then(data => data.text())
//     .then((data) => data.json())
//     .then((data) => (rhdata.value = data));
//   url = "https://temsite-serverless-txtyb.vercel.app/api/get?ts=0";
//   fetch(url, {
//     method: "get",
//   })
//     // .then(data => data.text())
//     .then((data) => data.json())
//     .then((data) => (tableData.value = data));
//   console.log("refreshed");
// }

// const refreshSwitch = () => {
//   var interval;
//   const disableInterval = () => {
//     clearInterval(interval);
//   };
//   if (setAutoRefresh.value) {
//     interval = setInterval(() => {
//       refresh();
//     }, 5000);
//     console.log(setAutoRefresh.value);
//     console.log("enable auto refresh");
//   } else {
//     disableInterval
//     console.log(setAutoRefresh.value);
//     console.log("disable auto refresh");
//   }
// };

// onMounted(refresh);

defineExpose({
  // setAutoRefresh,
  // dataNum,
  // temdata,
  // rhdata,
  // tableData,
});
</script>

<script lang="ts">
// // import HelloWorld from './components/HelloWorld.vue'
// import { ref } from "vue"

const dataNum = ref(50);

const rhdata = ref("");
const temdata = ref("");
const tableData = ref([]);

const setAutoRefresh = ref(false);
const addTokenFormVisible = ref(false)

const formLabelWidth = '140px'

const tokenForm = reactive({
  name: '',
  token: ''
})

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
      // // temdata: "",
      // rhdata: "",
      // temdata: "",
      // tableData: [],
      // // setAutoRefresh: ref(false),
      // // dataNum: ref(50),
    };
  },
  computed: {
    // fetchData() {
    //   return { "2021-01-01": 2, "2021-01-02": 3 };
    // },
    // temdata: gettem()
  },
  created() { },
  mounted() {
    console.log(`print setAutoRefresh = ${setAutoRefresh.value}`)
    this.refresh();
    // this.test();
  },
  methods: {
    // // gettem() {
    // //   var data;
    // //   // var response = fetch("https://temsite-serverless-txtyb.vercel.app/api/gettem", {
    // //   //   method: "get",
    // //   // })
    // //   fetch("https://temsite-serverless-txtyb.vercel.app/api/gettem", {method: 'get'})
    // //   .then(res => res.json())
    // //   .then(json => data = json)
    // //   return data
    // // },
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
        dataNum.value;
      fetch(url, {
        method: "get",
      })
        // .then(data => data.text())
        .then((data) => data.json())
        .then((data) => (temdata.value = data));
      // updateData(url, this.temdata);
      url =
        "https://temsite-serverless-txtyb.vercel.app/api/getrh?n=" +
        dataNum.value;
      fetch(url, {
        method: "get",
      })
        // .then(data => data.text())
        .then((data) => data.json())
        .then((data) => (rhdata.value = data));
      url = "https://temsite-serverless-txtyb.vercel.app/api/get?ts=0";
      fetch(url, {
        method: "get",
      })
        // .then(data => data.text())
        .then((data) => data.json())
        .then((data) => (tableData.value = data));
      console.log("refreshed");
    },
    test(index: number, row: any) {
      console.log("this is test");
      console.log(index, row)
      
    },
    // 切换自动刷新
    refreshSwitch(this: any) {
      console.log(setAutoRefresh.value);
      if (!setAutoRefresh.value) {
        clearInterval(this.autoRefresh);
        console.log("Auto refresh disabled");
      } else {
        this.autoRefresh = setInterval(() => {
          this.refresh();
        }, 5000);
        console.log("Auto refresh enabled");
      }
    },
    sendNotification(rowData: any, token: string) {
      var data = {"to":"f8yeN24VSWmHnzk2qkaA88:APA91bH1bu3-V7YdSXferrbfkNAOcFjbTjSCnQ4G3F_iyYCCx5MSuCKGGdMhJO-kZ3q1YTTsApRF75k_J1-GH28_aga3G_L3YpOVGF1IH4v9hAC0I1S8Xgd3T1wS1yaj7thtNcoHFRKu","time_to_live":60,"priority":"high","data":{"text":{"title":String(rowData.time),"message":`tem=${rowData.tem}, rh=${rowData.rh}`,"clipboard":false}}}
      fetch('https://fcm.googleapis.com/fcm/send', {
        method: 'POST', 
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: new Headers({
          'Content-Type': 'application/json', 
          'Authorization': token,
        })
      }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => console.log('Success:', response));
    }
  },
};
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <el-row>
          <el-col :span="9">
            <span class="title">温湿度监测</span>
          </el-col>
          <el-col :span="8">
            <div class="slider-block">
              <el-slider v-model="dataNum" show-input @click="refresh" label="123" />
            </div>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" @click="refresh">刷新 {{ setAutoRefresh }}</el-button>
          </el-col>
          <el-col :span="4" :pull="1">
            <span class="switch-text">自动刷新</span>
            <el-switch class="refreshSwitch" v-model="setAutoRefresh" inline-prompt :active-icon="Check"
              :inactive-icon="Close" @change="refreshSwitch" />
          </el-col>
          <el-col :span="1">
            <el-button :icon="Setting" circle @click="addTokenFormVisible = true" />
            <el-dialog v-model="addTokenFormVisible" title="添加新token">
              <el-form :model="tokenForm">
                <el-form-item label="设备名称" :label-width="formLabelWidth">
                  <el-input v-model="tokenForm.name" autocomplete="off" />
                </el-form-item>
                <el-form-item label="token" :label-width="formLabelWidth">
                  <el-input v-model="tokenForm.token" placeholder="请输入token" />
                </el-form-item>
              </el-form>
              <template #footer>
                <span class="dialog-footer">
                  <el-button @click="addTokenFormVisible = false">取消</el-button>
                  <el-button type="primary" @click="addTokenFormVisible = false, displayTokenSubmitMsg();">确认
                  </el-button>
                </span>
              </template>
            </el-dialog>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-card class="box-card">
          <!-- <el-space direction="horizontal" :fill="true" wrap class="charts"> -->
          <div class="chart">
            <line-chart :data="temdata" :min="null" :max="null" xtitle="时间" ytitle="温度℃"></line-chart>
          </div>
          <el-divider />
          <div class="chart">
            <area-chart :data="rhdata" :min="null" :max="null" xtitle="时间" ytitle="湿度%"></area-chart>
          </div>
          <!-- <area-chart
            :data="fetchData"
            :min="null"
            :max="null"
            xtitle="时间"
            ytitle="湿度%"
          ></area-chart> -->
          <!-- </el-space> -->
        </el-card>
        <el-card class="tables">
          <div>
            <el-table :data="tableData" style="width: 100%" max-height="500" stripe>
              <el-table-column type="index" min-width="10%" />
              <el-table-column prop="time" label="时间" min-width="40%">
                <template #default="scope">
                  <div style="display: flex; align-items: center">
                    <el-icon>
                      <timer />
                    </el-icon>
                    <span style="margin-left: 10px">{{ scope.row.time }}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="tem" label="温度" min-width="20%" />
              <el-table-column prop="rh" label="湿度" min-width="20%" />
              <el-table-column label="通知操作" min-width="10%">
                <template #default="scope">
                  <el-button size="small" @click="test(scope.$index, scope.row), sendNotification(scope.row,tokenForm.token)">发送</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
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
</template>

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
  margin-top: 5px;
}

/* .charts {
  overflow: hidden;
} */
.slider-block {
  /* display: flex; */
  align-items: center;
}

.switch-text {
  margin-left: -20%;
  margin-right: 5%;
  margin-top: 10px;
}
</style>
