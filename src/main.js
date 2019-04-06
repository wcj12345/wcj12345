import Vue from 'Vue'


//导入路由的包和安装路由
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import router from './router.js'
// 全局引入MintUI
// Vue.use(MintUI)

// import MintUI from 'mint-ui'
// import 'mint-ui/lib/style.css'

//导入部分MintUI组件
import { Header, Swipe, SwipeItem, Button } from 'mint-ui'
Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Button.name, Button)

// 导入mui样式
import './lib/mui/css/mui.min.css'
//mui的扩展图标需要引入对应的css
import './lib/mui/css/icons-extra.css'

// http://www.liulongbin.top:3005/api/getlunbo
//引入vue-resource
import VueResource from 'vue-resource'
Vue.use(VueResource)
// Vue.config.http.op 全局配置数据接口的根域名
Vue.http.options.root = 'http://www.liulongbin.top:3005/';

//注册全局过滤器
// import moment from 'moment'
// Vue.filter('dateFormat', function (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
//     return moment(dataStr).format(pattern)
// })
import moment from 'moment'
Vue.filter('dateFormat', (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') => moment(dataStr).format(pattern))


import App from './App.vue'
var vm = new Vue({
    el: '#app',
    render: h => h(App),
    router
})