<template>
  <div class="wrapper">
    <div class="top">
      <i class="fa fa-angle-left" @click="goBack"></i>
      <span class="top-text">手机号登录</span>
    </div>
    <div class="content-text">未注册手机号登录后将自动创建账号</div>
    <div class="content-phone">
      <span class="content-left">+86</span>
      <input class="phone-inp" placeholder="请输入手机号" v-model="phone" />
      <i v-show="!phone==''" class="content-right" @click="clear">x</i>
    </div>
    <div class="next">
      <button class="next-btn" @click="next">下一步</button>
    </div>
    <MsgBox />
  </div>
</template>
<script>
import MsgBox from '../../components/MsgBox'
export default {
  data() {
    return {
      phone: ""
    };
  },
  methods: {
    clear(){
        this.phone = ''
    },
    goBack() {
      this.$router.go(-1);
    },
    next(){
        let regEx = /^1(3|4|5|7|8)\d{9}$/;
        let result = regEx.test(this.phone)
        if(result){
            this.$router.push({name:'LoginSuccess',query:{phone:this.phone}})
        }else{
            this.$showToast({
            message:"请输入11位数字的手机号",
            duration:1000
          })
        }
    }
  },
  components:{
    MsgBox
  }
};
</script>
<style lang="scss" scoped>
.wrapper {
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  padding: 0 0.4rem;
  .top {
    width: 100%;
    height: 2rem;
    display: flex;
    align-items: center;
  }
  .top-text {
    font-size: 0.6rem;
    margin-left: 0.4rem;
  }
  .content-text {
    width: 100%;
    height: 2rem;
    font-size: 0.3rem;
    line-height: 2rem;
    color: #ccc;
  }
  .content-phone {
    width: 100%;
    // height: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #ccc;
    .content-left{
        flex: 0 0 1rem;
      text-align: left;
      font-size: 0.3rem;
      color: #ccc;
    }
    .content-right {
      flex: 0 0 1rem;
      text-align: right;
      font-size: 0.3rem;
      color: #ccc;
    }
    .phone-inp {
      flex: 1;
      border: 0;
      outline: none;
      height: 16px;
      padding: 10px 0;
    }
  }
  .next {
    width: 100%;
    text-align: center;
    .next-btn {
      width: 6rem;
      height: 0.8rem;
      background-color: #dd001b;
      color: #fff;
      border: 0;
      outline: none;
      border-radius: 0.4rem;
      letter-spacing: 3px;
    }
  }
}
</style>