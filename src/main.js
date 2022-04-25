import { createApp } from 'vue'
import App from './App.vue'
import installElementPlus from './plugins/element'
import VueChartkick from 'vue-chartkick'
import 'chartkick/chart.js'

const app = createApp(App)
installElementPlus(app)
app.use(VueChartkick)
app.mount('#app')