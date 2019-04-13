<template>
  <div>
    <input type="button" value="减少" @click="remove">
    <input type="button" value="增加" @click="add">
    <br>
    <input type="text" v-model="$store.state.count">
  </div>
</template>

<script>
//按需引入 mapMutations

export default {
  data() {
    return {
      // count: 0
    };
  },
  methods: {
    add() {
      // this.count++
      // this.$store.state.count++;

      this.$store.commit("increment", [1, 2]);
    },
    remove() {
      // this.count--
      this.$store.commit("decrement", { a: 5, b: 2 });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
