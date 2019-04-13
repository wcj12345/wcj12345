// 入口文件
import Vue from 'vue'
// 配置vuex的步骤
// 1. 运行 cnpm i vuex -S 
// 2. 导入包
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 3,
    list: [2, 3]
  },
  mutations: {
    increment: function (state, arr) {
      state.count += (arr[0] + arr[1])
    },
    decrement: function (state, str) {
      state.count -= (str.a + str.b)
    }
  },
  getters: {
    total: function (state) {
      return state.list.reduce((a, b) => a + b)
    }
  }
})

// 总结：
// 1. state中的数据，不能直接修改，如果想要修改，必须通过 mutations
// 2. 如果组件想要直接 从 state 上获取数据： 需要 this.$store.state.***
// 3. 如果 组件，想要修改数据，必须使用 mutations 提供的方法，需要通过 this.$store.commit('方法的名称'， 唯一的一个参数)
// 4. 如果 store 中 state 上的数据， 在对外提供的时候，需要做一层包装，那么 ，推荐使用 getters, 如果需要使用 getters ,则用 this.$store.getters.***


import App from './App.vue'

const vm = new Vue({
  el: '#app',
  render: c => c(App),
  store
})