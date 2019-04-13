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


import { Toast } from "mint-ui";
// 注册vuex
import Vuex from 'vuex'

var car = JSON.parse(localStorage.getItem('car') || '[]')
// var car = JSON.parse(localStorage.getItem('car')) || []
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        car: car
    },
    mutations: {
        addToCar(state, goodsinfo) {
            var flag = false
            console.log(goodsinfo);
            state.car.some(item => {
                if (item.id == goodsinfo.id) {
                    item.count += parseInt(goodsinfo.count)
                    if (item.count >= goodsinfo.max) {
                        item.count = item.max
                        Toast("已经到达库存最大值了");
                    }
                    flag = true
                    return true
                }
            })
            if (!flag) {
                state.car.push(goodsinfo)
            }
            localStorage.setItem('car', JSON.stringify(state.car))
            console.log(state.car);
        },
        updateGoodsInfo(state, goodsinfo) {
            state.car.some(item => {
                if (item.id == goodsinfo.id) {
                    item.count = parseInt(goodsinfo.count)
                }
            })
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        removeCar(state, id) {
            state.car.some((item, index) => {
                if (item.id == id) {
                    state.car.splice(index, 1)
                }
            })
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        updateGoodsSelected(state, info) {
            console.log(info);
            console.log(state.car);
            state.car.some(item => {
                if (item.id == info.id) {
                    item.selected = info.selected
                }
            })
            localStorage.setItem('car', JSON.stringify(state.car))
        }
    },
    getters: {
        getAllCount: function (state) {
            let AllCount = 0
            state.car.forEach(item => {
                AllCount += item.count
            })
            return AllCount
        },
        getGoodsCount: function (state) {
            var o = {}
            state.car.forEach(item => {
                o[item.id] = item.count
            })
            return o
        },
        getGoodsSelected: function (state) {
            var o = {}
            state.car.forEach(item => {
                o[item.id] = item.selected
            })
            return o
        },
        getGoodsCountAndAmount(state) {
            var o = {
                count: 0,
                amount: 0
            }
            state.car.forEach(item => {
                if (item.selected) {
                    o.count += item.count
                    o.amount += item.count * item.price
                }
            });
            return o
        }
    }
})

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
    router,
    store
})