<template>
  <div class="wrapper">
    <div class="wrapper-header">
      <i class="fa fa-angle-left" @click="goback"></i>
      <span class="text">电台</span>
    </div>
    <div class="wrapper-title">敬请期待...</div>
  </div>
</template>

<script>
export default {
  methods: {
    goback() {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="scss" scoped>
.wrapper {
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  background-color: #fff;
  z-index: 99;
  padding: 0 0.4rem;
}
.wrapper-header {
  display: flex;
  align-items: center;
  .text {
    margin-left: 0.4rem;
    font-size: 0.4rem;
  }
  .fa-angle-left {
    color: #888;
  }
}

.wrapper-title {
  font-size: .4rem;
  text-align: center;
}
</style>
