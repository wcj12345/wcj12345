<template>
  <div>
    <div class="cmt-container">
      <hr>
      <textarea placeholder="请输入要BB的内容(做多吐嘲120字)" maxlength="120" v-model.trim="msg"></textarea>
      <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>
      <div class="cmt-list" v-for="(item,i) in list" :key="i">
        <div class="cmt-item">
          <div
            class="cmt-title"
          >第{{i+1}}楼&nbsp;&nbsp;用户：{{item.user_name}}&nbsp;发表时间：{{item.add_time | dateFormat}}</div>
          <div class="cmt-body">{{item.content}}</div>
        </div>
      </div>
      <mt-button type="danger" size="large" plain @click="getmore">加载更多</mt-button>
    </div>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      pageindex: 1,
      list: [],
      msg: ""
    };
  },
  created() {
    this.getid();
  },
  methods: {
    getid() {
      this.$http
        .get(`api/getcomments/${this.id}?pageindex=${this.pageindex}`)
        .then(res => {
          // console.log(res);
          if (res.body.status == 0) {
            // this.list = this.list.concat(res.body.message);
            this.list = [...this.list, ...res.body.message];

            // console.log(this.list);
          } else {
            Toast("评论获取失败");
          }
        });
    },
    getmore() {
      this.pageindex++;
      this.getid();
    },
    postComment() {
      if (this.msg.length == 0) {
        return Toast("评论内容不能为空");
      }
      this.$http
        .post(`api/postcomment/${this.id}`, { content: this.msg })
        .then(res => {
          console.log(res);
          if (res.body.status == 0) {
            let cmt = {
              user_name: "匿名用户",
              add_time: Date.now(),
              content: this.msg.trim()
            };
            this.list.unshift(cmt);
            this.getid();
            this.msg = "";
          } else {
            Toast(res.body.message);
          }
        });
    }
  },
  props: ["id"]
};
</script>
<style lang="scss" scoped>
.cmt-container {
  h3 {
    font-size: 18px;
  }
  textarea {
    font-size: 14px;
    height: 85px;
    margin: 0;
  }
  .cmt-list {
    margin: 5px 0;
    .cmt-item {
      font-size: 13px;
      .cmt-title {
        line-height: 30px;
        background-color: #ccc;
      }
      .cmt-body {
        line-height: 35px;
        text-indent: 2em;
      }
    }
  }
}
</style>