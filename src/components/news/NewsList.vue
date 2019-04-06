<template>
  <div>
    <h3>新闻列表界面</h3>
    <ul class="mui-table-view" v-for="item in NewList" :key="item.id">
      <li class="mui-table-view-cell mui-media">
        <router-link :to="'/home/newsinfo/'+item.id">
          <img class="mui-media-object mui-pull-left" :src="item.img_url">
          <div class="mui-media-body">
            <h1>{{item.title}}</h1>
            <p class="mui-ellipsis">
              <span>发表时间：{{item.add_time | dateFormat}}</span>
              <span>点击：{{item.click}}次</span>
            </p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      NewList: ""
    };
  },
  created() {
    this.getNewList();
  },
  methods: {
    getNewList() {
      this.$http.get("api/getnewslist").then(res => {
        // console.log(res);
        if (res.body.status == 0) {
          this.NewList = res.body.message;
        } else {
          Toast("NewList获取失败");
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.mui-table-view {
  li {
    h1 {
      font-size: 14px;
    }
    .mui-ellipsis {
      font-size: 12px;
      color: #226aff;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>