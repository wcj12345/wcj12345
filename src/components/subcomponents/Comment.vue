<template>
  <div>
    <div class="cmt-container">
      <hr>
      <textarea placeholder="请输入要BB的内容(做多吐嘲120字)" maxlength="120"></textarea>
      <mt-button type="primary" size="large">发表评论</mt-button>
      <div class="cmt-list">
        <div class="cmt-item">
          <div class="cmt-title">第一楼&nbsp;&nbsp;用户：匿名用户&nbsp;发表时间：2012-12-12 12:12:12</div>
          <div class="cmt-body">锄禾日当午 复方</div>
        </div>
      </div>
      <mt-button type="danger" size="large" plain>加载更多</mt-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  created() {
    this.getid();
  },
  methods: {
    getid() {
      console.log(this.id, 456);
    }
  },
  props: ["id"]
};
</script>
<style lang="scss" scoped>
</style>