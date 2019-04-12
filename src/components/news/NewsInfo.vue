<template>
  <div>
    <div class="newsinfo-container">
      <h3 class="title">{{NewInfo.title}}</h3>
      <p class="subtitle">
        <span>发表时间：{{NewInfo.add_time | dateFormat}}</span>
        <span>点击：{{NewInfo.click}}次</span>
      </p>
      <div class="content" v-html="NewInfo.content"></div>
    </div>
    <comment-box :id="this.id"></comment-box>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
import comment from "../subcomponents/Comment.vue";
export default {
  data() {
    return {
      NewInfo: {},
      id: this.$route.params.id
    };
  },
  created() {
    this.getNewList();
  },
  methods: {
    getNewList() {
      this.$http.get("api/getnew/" + this.id).then(res => {
        console.log(res);
        if (res.body.status == 0) {
          this.NewInfo = res.body.message[0];
        } else {
          Toast("NewInfo获取失败");
        }
      });
    }
  },
  components: {
    "comment-box": comment
  }
};
</script>
<style lang="scss" scoped>
.newsinfo-container {
  padding: 0 4px;
  .title {
    font-size: 16px;
    text-align: center;
    margin: 15px 0;
    color: red;
  }
  .subtitle {
    font-size: 13px;
    color: #226aff;
    display: flex;
    justify-content: space-between;
  }
}
</style>
<style lang="scss">
.newsinfo-container {
  .content {
    img {
      width: 100%;
    }
  }
}
</style>
