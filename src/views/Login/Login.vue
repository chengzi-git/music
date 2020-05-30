<template>
  <div class="wrapper">
    <div class="content">
      <i class="fa fa-angle-left" @click="goBack"></i>
      <button class="login-btn" @click="goLogin">手机号登录</button>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    goLogin() {
        this.$router.push({name:'Phone'})
    }
  }
};
</script>
<style lang="scss" scoped>
.wrapper {
  width: 100vw;
  height: 100vh;
  background-color: #dd001b;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 99;
  .login-btn {
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translate(-50%);
    width: 5.3rem;
    height: 0.8rem;
    border-radius: 0.4rem;
    background-color: #fff;
    color: #dd001b;
    font-weight: 600;
    letter-spacing: 3px;
    border: 0;
    outline: none;
  }
  .fa {
    font-size: 0.6rem;
    color: #fff;
    margin: 0.1rem 0 0 0.4rem;
  }
}
</style>