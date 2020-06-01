<template>
  <div class="wrapper">
      <i class="fa fa-angle-left" @click="goback"></i>
    <p class="text">电台！！！敬请期待...</p>
  </div>
</template>

<script>
export default {
    methods: {
        goback(){
            this.$router.go(-1)
        }
    },
}
</script>
<style lang="scss" scoped>
.wrapper{
    width: 100vw;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    background-color: #fff;
    z-index: 99;
}
.text{
  font-size: .4rem;
  text-align: center;
}
.fa-angle-left{
    color: #ccc;
    margin: .4rem 0 0 .4rem;
}
</style>
