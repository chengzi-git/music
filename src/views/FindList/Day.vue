<template>
  <div class="wrapper">
    <div class="wrapper-header">
      <div>
        <i class="fa fa-angle-left" @click="goback"></i>
      </div>
      <div>
        <span class="day">{{today}}</span>
        <span class="month">/{{month>=10?month:'0'+month}}</span>
      </div>
      <div class="text">查收属于您的今日推荐</div>
    </div>
    <div class="wrapper-nav">
      <div class="nav-content">
        <i class="fa fa-play-circle-o"></i>
        <span class="title">播放全部</span>
      </div>
      <div class="nav-right">
        <i class="fa fa-list-ul"></i> 多选
      </div>
    </div>
    <div class="nologin" v-if="!loginState">
      <div class="text">当前未登录，请您跳转登陆页面进行登陆</div>
      <div class="login">点我去登录</div>
    </div>
    <div class="wrapper_content">
      <div v-show="show" class="wrapper_loading">加载中...</div>
      <router-link
        tag="div"
        class="wrapper_list"
        v-for="(item,i) in this.songs"
        :key="i"
        :to="{name:'PlayView',query:{id:item.id}}"
      >
        <div class="song_img">
          <!-- 懒加载 界面多大就加载多少 -->
          <img width="40" height="40" v-lazy="item.album.picUrl" :key="i" />
        </div>
        <div class="song-content">
          <p class="song_name">{{item.name}}</p>
          <p class="song_author">{{item.artists[0].name}}-{{item.album.name}}</p>
        </div>
        <div class="song_play">
          <i class="fa fa-ellipsis-v"></i>
        </div>
      </router-link>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      today: new Date().getDate(),
      month: new Date().getMonth() + 1,
      show: true,
      songs: null
    };
  },
  computed: {
    ...mapState({
      loginState: "loginState"
    })
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    ...mapMutations({
      islogin: "islogin",
      nologin: "nologin"
    }),
    //获取今日推荐歌曲
    getToDaySong() {
      if (this.loginState && this.songs == null) {
        this.axios(`/api/recommend/songs`).then(res => {
          this.show = false;
          this.songs = res.data.recommend;
        });
      }
    }
  },
  mounted() {
    //获取登录状态
    this.axios(`/api/login/status`)
      .then(res => {
        if (res.data.code == 200) {
          console.log(res);
          localStorage.setItem("loginState", 1);
          this.getToDaySong();
          this.islogin();
        }
      })
      .catch(err => {
        console.log("err==>", err);
        localStorage.setItem("loginState", 0);
      });
  }
};
</script>
<style lang="scss" scoped>
.wrapper {
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 99;
  .wrapper-header {
    width: 100%;
    height: 4rem;
    background-color: rgba(5, 5, 5, 0.6);
    padding: 0.1rem 0.2rem 0.4rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: #fff;
    .day {
      font-size: 0.8rem;
      color: #f0f0f0;
    }
    .month {
      font-size: 0.4rem;
    }
    .text {
      font-size: 0.3rem;
    }
  }
  .wrapper-nav {
    font-size: 0.32rem;
    display: flex;
    justify-content: space-between;
    padding: 0.4rem 0.2rem;
    color: #444;
    .fa-play-circle-o {
      margin-right: 0.1rem;
    }
  }
  .nologin {
    width: 100vw;
    height: 100vh;
    background-color: #fff;
    font-size: 0.3rem;
    margin-top: 0.2rem;
    .text {
      text-align: center;
    }
    .login {
      text-align: center;
      color: skyblue;
      margin-top: 0.2rem;
    }
  }
  .wrapper_content {
    width: 100vw;
    height: 100vh;
    margin-top: 0.2rem;
    padding: 0 0.2rem;
    background-color: #fff;
    .wrapper_loading {
      margin-top: 0.4rem;
      text-align: center;
    }
    .wrapper_list {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.2rem;
    }
    /*  .song_img {
      width: 0.8rem;
      height: 0.8rem;
      img{
        width: 100%;
        height: 100%;
      }
    } */
    .song-content {
      flex: 1;
      margin-left: 0.4rem;
      .song_name {
        font-size: 0.34rem;
        color: #333;
      }
      .song_author {
        font-size: 0.23rem;
        color: #7c7b7d;
        margin-top: 0.1rem;
      }
    }
    .song_play {
      height: 1rem;
      line-height: 0.5rem;
      .fa-ellipsis-v {
        font-size: 0.4rem;
        color: #ccc;
      }
    }
  }
}
</style>