<template>
  <div class="mui-numbox" data-numbox-min="1" data-numbox-max="max">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input id="test" class="mui-input-numbox" type="number" value="1" ref="number" @change="getNum">
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>
</template>
<script>
import mui from "../../lib/mui/js/mui.js";
export default {
  name: "goodsinfo_number",
  data() {
    return {};
  },
  mounted() {
    mui(".mui-numbox").numbox();
  },
  methods: {
    getNum(event) {
      // console.log(event.target.value);
      // console.log(this.$refs.number.value);
      this.$emit("getCount", parseInt(this.$refs.number.value));
    }
  },
  props: ["max"],
  watch: {
    max: function(newVal, oldVal) {
      mui(".mui-numbox")
        .numbox()
        .setOption("max", newVal);
    }
  }
};
</script>
<style lang="scss" >
// 在真机上没事，web浏览器会出现的transition 抖动，但是添加感觉会让字体模糊
// .mint-swipe-item {
//   -webkit-backface-visibility: hidden;
//   backface-visibility: hidden;
// }
// div {
//   -webkit-font-smoothing: subpixel-antialiased;
//   -webkit-transform: translateZ(0) scale(1, 1);
// }
</style>