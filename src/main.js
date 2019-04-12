import Vue from 'Vue'


//导入路由的包和安装路由
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import router from './router.js'
// 全局引入MintUI

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

//导入部分MintUI组件
// import { Header, Swipe, SwipeItem, Button, Lazyload } from 'mint-ui'
// Vue.component(Header.name, Header)
// Vue.component(Swipe.name, Swipe)
// Vue.component(SwipeItem.name, SwipeItem)
// Vue.component(Button.name, Button)
// Vue.use(Lazyload);



//引入缩略图插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)


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
// Vue.http.options.root = 'http://192.168.18.57:3005/';
// 这将以application / x - www - form - urlencodedMIME类型的形式发送请求，就像从普通的HTML表单一样。
Vue.http.options.emulateJSON = true;

//注册全局过滤器
// import moment from 'moment'
// Vue.filter('dateFormat', function (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
//     return moment(dataStr).format(pattern)
// })

// import moment from 'moment'
// Vue.filter('dateFormat', (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') => moment(dataStr).format(pattern))
import moment from 'moment'
Vue.filter('dateFormat', (datastart, pattern = 'YYYY-MM-DD HH:mm:ss') => moment(datastart).format(pattern))

import App from './App.vue'
var vm = new Vue({
    el: '#app',
    render: h => h(App),
    router
})