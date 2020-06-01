<template>
  <div class="wrapper">
    <div class="top">
      <i class="fa fa-angle-left" @click="goBack"></i>
      <span class="top-text">手机号登录</span>
    </div>
    <div class="content-phone">
      <input type="password" class="phone-inp" placeholder="请输入密码" v-model="password" />
      <span class="phone-right">忘记密码</span>
    </div>
    <div class="next">
      <button class="next-btn" @click="next">登录</button>
    </div>
    <MsgBox />
  </div>
</template>
<script>
import {LOGIN} from '../../api/api.js'
import MsgBox from "../../components/MsgBox";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      phone: this.$route.query.phone,
      password: ""
    };
  },
  methods: {
    ...mapMutations({
      isReload: "isReload"
    }),
    goBack() {
      this.$router.go(-1);
    },
    next() {
      if (this.password) {
        this.axios(LOGIN(this.phone,this.password)).then(res => {
          if (res.data.code == 200) {
            this.$router.push({ name: "find"});
            localStorage.setItem("loginState",1);
            this.isReload()
          } else {
            this.$showToast({
              message: "用户名或密码输入错误",
              duration: 1000
            });
          }
          console.log("登录后的信息", res);
        });
      } else {
        this.$showToast({
          message: "请输入密码",
          duration: 1000
        });
      }
    }
  },
  components: {
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
  padding: 0 .4rem;
  .top {
    width: 100%;
    height: 2rem;
    display: flex;
    align-items: center;
    .top-text {
      font-size: .6rem;
      margin-left: .4rem;
    }
  }

  .content-phone {
    margin-top: 1rem;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #ccc;
    .phone-inp {
      flex: 1;
      border: 0;
      outline: none;
      height: 16px;
      padding: 10px 0;
    }
    .phone-right {
      flex: 0 0 1.5rem;
      text-align: right;
      font-size: .3rem;
      color: #333;
    }
  }
  .next {
    width: 100%;
    text-align: center;
    margin-top: .5rem;
    .next-btn {
      width: 6rem;
      height: .8rem;
      background-color: #dd001b;
      color: #fff;
      border: 0;
      outline: none;
      border-radius: .4rem;
      letter-spacing: 3px;
    }
  }
}
</style>