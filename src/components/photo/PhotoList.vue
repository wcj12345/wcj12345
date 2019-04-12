<template>
  <div>
    <!-- 图片分类区域 -->
    <div id="slider" class="mui-slider">
      <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      >
        <div class="mui-scroll">
          <a
            class="mui-control-item"
            :class="{'mui-active':item.id==0}"
            v-for="item in cates"
            :key="item.id"
            @tap="getPhotoListByCateId(item.id)"
          >{{item.title}}</a>
        </div>
      </div>
    </div>
    <!-- 图片列表区域 -->
    <!-- <ul class="photo-list">
      <router-link v-for="item in list" :key="item.id" :to="'/home/photoinfo/' + item.id" tag="li">
        <img v-lazy="item.img_url">
        <div class="info">
          <h1 class="info-title">{{ item.title }}</h1>
          <div class="info-body">{{ item.zhaiyao }}</div>
        </div>
      </router-link>
    </ul>-->
    <ul class="photo-list">
      <router-link v-for="item in list" :key="item.id" :to="'/home/photoinfo/' + item.id" tag="li">
        <img v-lazy="item.img_url" alt>
        <div class="info">
          <h1 class="info-title">{{ item.title }}</h1>
          <div class="info-body">{{ item.zhaiyao }}</div>
        </div>
      </router-link>
    </ul>
  </div>
</template>
<script>
import mui from "../../lib/mui/js/mui.js";
export default {
  mounted() {
    //类似window.onload
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  },
  data() {
    return {
      cates: [], //图片分类
      list: [] //图片列表
    };
  },
  created() {
    this.getCates();
    this.getPhotoListByCateId(0);
  },
  methods: {
    getCates() {
      this.$http.get("api/getimgcategory").then(res => {
        // console.log(res);
        if (res.body.status == 0) {
          this.cates = [{ title: "全部", id: 0 }, ...res.body.message];
          // console.log(this.cates);
        }
      });
    },
    getPhotoListByCateId(cateId) {
      this.$http.get(`api/getimages/${cateId}`).then(res => {
        if (res.body.status == 0) {
          this.list = res.body.message;
          console.log(this.list);
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.photo-list {
  list-style: none;
  margin: 0;
  padding: 10px;
  li {
    text-align: center;
    background-color: #ccc;
    margin-bottom: 10px;
    box-shadow: 0 0 9px #999;
    position: relative;
    img {
      width: 100%;
      vertical-align: middle;
    }
    img[lazy="loading"] {
      width: 40px;
      height: 300px;
      margin: auto;
    }
    .info {
      color: white;
      text-align: left;
      position: absolute;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.4);
      max-height: 84px;
      .info-title {
        font-size: 14px;
      }
      .info-body {
        font-size: 13px;
      }
    }
  }
}
</style>