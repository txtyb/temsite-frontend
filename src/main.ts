import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import VueChartkick from 'vue-chartkick'
import 'chartkick/chart.js'
import App from './App.vue'

const app = createApp(App)

app.use(ElementPlus)
app.use(VueChartkick)
app.mount('#app')
