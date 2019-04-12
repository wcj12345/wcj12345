<template>
  <div class="photoinfo-container">
    <h3>{{ data.title }}</h3>
    <p class="subtitle">
      <span>发表时间：{{ data.add_time | dateFormat }}</span>
      <span>点击：{{ data.click }}次</span>
    </p>
    <hr>
    <!-- 缩略图区域 -->
    <!-- <div v-for="(item,index) in list" :key="index">
      <img :src="item.src" alt>
    </div>-->
    <div class="thumbs">
      <!-- 注意：这里使用的 vue-preview 组件是版本 1.1.3,
      之前上课录屏时候, 所使用的 1.0.5 版本的 vue-preview 存在 Bug-->
      <vue-preview :slides="list"></vue-preview>
    </div>
    <!-- 图片内容区域 -->
    <div class="content" v-html="data.content"></div>
    <!-- 放置一个现成的 评论子组件 -->
    <comment-box :id="id"></comment-box>
  </div>
</template>
<script>
import Comment from "../subcomponents/Comment.vue";
export default {
  data() {
    return {
      data: {},
      id: this.$route.params.id,
      list: []
    };
  },
  created() {
    this.getData();
    this.getList();
  },
  methods: {
    getData() {
      this.$http.get(`api/getimageInfo/${this.id}`).then(res => {
        if (res.body.status == 0) {
          this.data = res.body.message[0];
          console.log(this.data);
        }
      });
    },
    getList() {
      this.$http.get(`api/getthumimages/${this.id}`).then(res => {
        if (res.body.status == 0) {
          res.body.message.forEach(item => {
            (item.w = 600), (item.h = 600), (item.msrc = item.src);
          });
          this.list = res.body.message;
          console.log(this.list);
        }
      });
    }
  },
  components: {
    CommentBox: Comment
  }
};
</script>
<style lang="scss" scoped>
.photoinfo-container {
  padding: 3px;
  h3 {
    color: #26a2ff;
    font-size: 15px;
    text-align: center;
    margin: 15px 0;
  }
  .subtitle {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
  }

  .content {
    font-size: 13px;
    line-height: 30px;
  }
}
</style>
<style lang="scss">
// .thumbs {
//   .my-gallery {
//     display: flex;
//     flex-wrap: wrap;
//   }
//   figure {
//     width: 100px;
//     height: 100px;
//     margin: 10px;
//     box-shadow: 0 0 8px #999;
//     img {
//       width: 100%;
//       height: 100%;
//     }
//   }
// }
</style>
<style lang="scss">
.thumbs {
  .my-gallery {
    display: flex;
    flex-wrap: wrap;
    figure {
      //   flex: 1;
      width: 100px;
      height: 100px;
      margin: 10px;
      box-shadow: 0 0 8px #999;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
