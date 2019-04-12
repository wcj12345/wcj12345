<template>
  <div>
    <comment-box :id="id"></comment-box>
  </div>
</template>
<script>
import CommentBox from "../subcomponents/Comment.vue";
export default {
  data() {
    return {
      id: this.$route.params.id
    };
  },
  components: {
    CommentBox
  }
};
</script>
<style lang="scss" scoped>
</style>