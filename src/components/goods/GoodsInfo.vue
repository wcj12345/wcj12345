<template>
  <div class="goodsinfo-container">
    <!-- 商品轮播图区域 -->
    <!-- 小球 -->
    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <div class="ball" v-show="ballFlag" ref="ball"></div>
    </transition>
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <swiper :lunbotuList="lunbotuList"></swiper>
        </div>
      </div>
    </div>
    <!-- 商品购买区域 -->
    <div class="mui-card">
      <div class="mui-card-header">商品的名称标题</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">
            市 场 价 ：
            <del>&yen;{{goodsinfo.market_price}}</del>&nbsp;&nbsp; 销 售 价 ：
            <span class="now_price">&yen;{{goodsinfo.sell_price}}</span>
          </p>
          <p>
            购买数量：
            <NumberBox @getCount="getSelectedCount" :max="goodsinfo.stock_quantity"></NumberBox>
          </p>
          <p>
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small" @click="addToShopCar()">加入购物车</mt-button>
          </p>
        </div>
      </div>
    </div>
    <!-- 商品参数区域 -->
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号：{{goodsinfo.goods_no}}</p>
          <p>库存情况：{{goodsinfo.stock_quantity}}</p>
          <p>上架时间：{{goodsinfo.add_time | dateFormat}}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
        <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
        <!-- 这里ID不用ajxs请求回来的是因为这是异步回来的id，可能会出错，直接用地址栏的id -->
      </div>
    </div>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
import swiper from "../subcomponents/swiper.vue";
import NumberBox from "../subcomponents/goodsinfo_number.vue";
export default {
  data() {
    return {
      lunbotuList: "",
      id: this.$route.params.id,
      goodsinfo: {},
      ballFlag: false,
      selectedCount: 1
    };
  },
  created() {
    this.getList();
    this.getGoodsInfo();
  },
  methods: {
    getList() {
      this.$http.get(`api/getthumimages/${this.id}`).then(res => {
        if (res.body.status == 0) {
          res.body.message.forEach(item => {
            item.img = item.src;
          });
          this.lunbotuList = res.body.message;
          // console.log(this.lunbotuList);
        } else {
          Toast("轮播图获取失败");
        }
      });
    },
    getGoodsInfo() {
      this.$http.get(`api/goods/getinfo/${this.id}`).then(res => {
        if (res.body.status == 0) {
          this.goodsinfo = res.body.message[0];
          // console.log(this.goodsinfo);
        } else {
          Toast("商品参数获取失败");
        }
      });
    },
    goDesc(id) {
      this.$router.push({ name: "goodsdesc", params: { id } });
    },
    goComment(id) {
      this.$router.push({ name: "goodscomment", params: { id } });
    },
    addToShopCar() {
      
        this.ballFlag = !this.ballFlag;
        var goodsinfo = {
          id: this.id,
          price: this.goodsinfo.sell_price,
          count: this.selectedCount,
          max: this.goodsinfo.stock_quantity,
          selected: true
        };
        this.$store.commit("addToCar", goodsinfo);
    },
    beforeEnter(el) {
      el.style.transform = "translate(0,0)";
    },
    enter(el, done) {
      el.offsetWidth;
      // 获取小球的 在页面中的位置
      const ballPosition = this.$refs.ball.getBoundingClientRect();
      // 获取 徽标 在页面中的位置
      const badgePosition = document
        .getElementById("badge")
        .getBoundingClientRect();
      const xDist = badgePosition.left - ballPosition.left;
      const yDist = badgePosition.top - ballPosition.top;
      el.style.transform = `translate(${xDist}px,${yDist}px)`;
      el.style.transition = "all ease .5s";
      done();
    },
    afterEnter(el) {
      this.ballFlag = !this.ballFlag;
    },
    getSelectedCount(count) {
      this.selectedCount = count;
      console.log("父组件拿到的数量值为： " + this.selectedCount);
    }
  },
  components: {
    swiper,
    NumberBox
  }
};
</script>
<style lang="scss" scoped>
.goodsinfo-container {
  background-color: #eee;
  overflow: hidden;
  .now_price {
    color: red;
    font-size: 16px;
    font-weight: bold;
  }
  .ball {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: red;
    position: absolute;
    z-index: 99;
    top: 392px;
    left: 152px;
    // transform: translate(273px, 430px);
  }
}
.mui-card-footer {
  display: block;
  button {
    margin: 15px 0;
  }
}
</style>