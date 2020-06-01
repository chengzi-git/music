<template>
  <div class="wrapper">
    <div class="skr" v-show="show" @click="nologin"></div>
    <transition name="left">
      <div class="user-container" v-show="show">
        <div class="user-info-content" v-if="loginState">
          <div class="user-img-box">
            <img :src="avatarUrl" alt />
          </div>
          <p class="user-text">{{nickname}}</p>
          <el-button type="danger" class="user-btn" plain><i class="fa fa-money"></i>签到</el-button>
        </div>
        <div class="user-info" v-else>
          <p class="user-text">登录网易云音乐</p>
          <p class="user-text">手机电脑多端同步，尽享海量高品质音乐</p>
          <div class="btn-box" @click="login">
            <button class="user-btn">立即登录</button>
          </div>
        </div>
        <div class="user-nav">
          <div class="nav-item" v-for="(item,i) in nav" :key="i">
            <i class="fa" :class="item.icon"></i>
            <span class="nav-text">{{item.text}}</span>
          </div>
        </div>
        <div class="user-list">
          <div class="list-item" v-for="(item,i) in list" :key="i">
            <i class="fa" :class="item.icon"></i>
            <span class="nav-text">{{item.text}}</span>
          </div>
        </div>
        <div class="user-footer">
          <div class="footer-item">
            <i class="fa fa-moon-o"></i>
            <span class="footer-text">夜间模式</span>
          </div>
          <div class="footer-item">
            <i class="fa fa-cog"></i>
            <span class="footer-text">设置</span>
          </div>
          <div class="footer-item" @click="Ending">
            <i class="fa fa-power-off"></i>
            <span class="footer-text">退出</span>
          </div>
        </div>
      </div>
    </transition>
    <!-- 消息提示 -->
    <MsgBox />
  </div>
</template>
<script>
import {LOGIN_OUT,LOGIN_STATUS} from '../../api/api.js'
import { mapState, mapMutations } from "vuex";
import MsgBox from "../MsgBox";
export default {
  data() {
    return {
      nav: [
        {
          icon: "fa-envelope-o",
          text: "我的消息"
        },
        {
          icon: "fa-user-o",
          text: "我的好友"
        },
        {
          icon: "fa-hand-spock-o",
          text: "个性皮肤"
        },
        {
          icon: "fa-microphone",
          text: "听歌识曲"
        }
      ],
      list: [
        {
          icon: "fa-wpexplorer",
          text: "演出"
        },
        {
          icon: "fa-shopping-cart",
          text: "商城"
        },
        {
          icon: "fa-music",
          text: "口袋铃声"
        },
        {
          icon: "fa-file-text-o",
          text: "我的订单"
        },
        {
          icon: "fa-bell",
          text: "定时停止播放"
        },
        {
          icon: "fa-window-restore",
          text: "扫一扫"
        },
        {
          icon: "fa-clock-o",
          text: "音乐闹钟"
        },
        {
          icon: "fa-headphones",
          text: "在线听歌免流量"
        }
      ],
      nickname: localStorage.getItem("nickname"),
      avatarUrl: ""
    };
  },

  methods: {
    ...mapMutations({
      nologin: "noshow"
    }),
    //登录
    login() {
      this.$router.push({ name: "Login" });
    },
    //退出登录
    Ending() {
      if (this.loginState) {
        this.axios(LOGIN_OUT).then(res => {
          console.log("退出登录===>", res);
          localStorage.removeItem("loginState");
          localStorage.removeItem("nickname");
          this.$router.go(0);
        });
      } else {
        this.$showToast({
          message: "不在登录状态",
          duration: 1000
        });
      }
    }
  },
  computed: {
    ...mapState({
      show: "show",
      loginState: "loginState"
    })
  },
  mounted() {
    this.axios(LOGIN_STATUS)
      .then(res => {
        console.log("目前为登录状态==>");
        if (res.data.code == 200) {
          localStorage.setItem("nickname", res.data.profile.nickname);
          this.avatarUrl=res.data.profile.avatarUrl;
        }
      })
      .catch(err => {
        console.log("不在登录状态==>", err);
      });
  },
  components: {
    MsgBox
  }
};
</script>
<style lang="scss" scoped>
.left-enter,
.left-leave-to {
  transform: translate3d(-100%, 0, 0);
}
.left-leave,
.left-enter-to {
  transform: translate3d(0, 0, 0);
}
.left-enter-active,
.left-leave-active {
  transition: all .5s;
}

/* .wrapper {
  transition: all .5s linear;
} */
.skr {
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10;
  opacity: .7;
  background-color: #000;
}
.user-container {
  width: 85vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  background-color: #fff;
  z-index: 20;
  .user-info-content {
    width: 100%;
    height: 3rem;
    padding: .4rem 0 0 .4rem;
    .user-text {
      font-size: .3rem;
      line-height: 1.5rem;
      margin-left: .2rem;
    }
    .fa-money{
      margin-right: .1rem;
    }
    .user-btn {
      position: absolute;
      right: .4rem;
      top: 1rem;
      outline: none;
    }
    .user-img-box {
      width: 1.5rem;
      height: 1.5rem;
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .user-info {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    padding: 1rem .23rem .9rem;
    width: 100%;
    height: 3rem;
    background-color: hsla(0, 0%, 80%, .3);
    .user-text {
      font-size: .2rem;
      line-height: .3rem;
      color: rgba(0, 0, 0, .4);
      text-align: center;
    }
    .btn-box {
      text-align: center;
      line-height: .4rem;
    }
    .user-btn {
      background-color: transparent;
      box-sizing: border-box;
      padding: .1rem .5rem;
      border: 1px solid rgba(0, 0, 0, .4);
      border-radius: .5rem;
      font-size: .2rem;
      color: rgba(0, 0, 0, .4);
      outline: none;
    }
  }
  .user-nav {
    margin-top: .5rem;
    display: flex;
    .nav-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .fa {
      font-size: .4rem;
      color: #e4393c;
    }
    .nav-text {
      margin-top: .1rem;
      font-size: .2rem;
    }
  }
  .user-list {
    margin-left: .4rem;
    color: #444;
    .list-item {
      height: 1rem;
    }
    .fa {
      font-size: .3rem;
      margin-right: .2rem;
    }
    .nav-text {
      font-size: .3rem;
    }
  }
  .user-footer {
    position: fixed;
    left: 0;
    bottom: .2rem;
    margin: .4rem 0 0 .2rem;
    width: 80vw;
    height: 1rem;
    display: flex;
    color: #444;
    background-color: #fff;
    .footer-item {
      width: 33.3%;
      height: 1rem;
      line-height: 1rem;
      text-align: center;
    }
    .fa {
      font-size: .4rem;
      margin-right: .1rem;
    }
    .footer-text {
      font-size: .3rem;
    }
  }
}
</style>