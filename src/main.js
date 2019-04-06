import Vue from 'Vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import App from './App.vue'

// 全局引入MintUI
// Vue.use(MintUI)

// import MintUI from 'mint-ui'
// import 'mint-ui/lib/style.css'

//导入部分组件
import { Header } from 'mint-ui'
Vue.component(Header.name, Header)

// 导入mui样式
import './lib/mui/css/mui.min.css'
//mui的扩展图标需要引入对应的css
import './lib/mui/css/icons-extra.css'


var vm = new Vue({
    el: '#app',
    render: h => h(App)
})