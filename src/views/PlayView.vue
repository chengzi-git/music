<template>
  <div class="play-view">
    <div class="back"  @click="goback">
      <i class="fa fa-angle-left"></i>
    </div>
    <div class="play-view-bg" :style="{backgroundImage:`url(${detail.picUrl})`}" />
    <div class="music-container">
      <div class="music-wrap" @click="pauseOrPlay">
        <div class="music-disc">
          <div class="music-turn">
            <div class="music-light" :style="{transform:`rotate(${rotate}deg)`}"></div>
            <div
              class="music-cover"
              :style="{backgroundImage:`url(${detail.picUrl})`,transform:`rotate(${rotate}deg)`}"
            ></div>
          </div>
          <span v-show="playing" class="music-play-btn"></span>
        </div>
      </div>
      <!-- 歌词部分 -->
      <div class="music-info">
        <h2 class="music-header">
          {{detail.name}} -
          <span
            class="music-header-sname"
          >{{artists.map(item=>item.name).join('/')}}</span>
        </h2>
        <div class="music-lyric-wrapper" ref="lyricWrapper">
          <ul>
            <li
              v-for="(lrc,i) in lyric"
              :key="i"
              :style="{color:i == `${lyricIndex}` ? 'rgb(254,254,254)' : 'rgba(255, 255, 255, 0.6)'}"
              class="music-lyric-item"
            >{{lrc.split(']')[1]}}</li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 播放音乐 -->
    <audio ref="audio" @timeupdate="updateTime" :src="music.url" ></audio>
  </div>
</template>
<script>
import BScroll from "better-scroll";
export default {
  data() {
    return {
      id: this.$route.query.id,
      show: true,
      timer: null,
      music: "",
      detail: { picUrl: "" },
      artists: [],
      lyric: null,
      lyricTimeArr: [],
      playing: true,
      rotate: 0,
      lyricIndex: 0,
      currentTime: 0
    };
  },
  //通过params或query传参 数据变化不会引起页面的刷新
  //解决方法：使用watch监听当前路由的变化来引起页面的更新
  watch: {
    $route(to, from) {
      if (to.query.id != from.query.id && this.$route.name == "PlayView") {
        this.id = to.query.id;
        this.successMusic();
      }
      if (to.query.id != from.query.id) {
        this.playing = true;
        clearInterval(this.timer);
      }
    },
    // 歌词自动滑动
    lyricIndex(val, oldVal) {
      if (val !== oldVal && this.menuScroller) {
        this.menuScroller.scrollToElement(
          `li:nth-child(${this.lyricIndex + 1})`,
          500
        );
      }
    }
  },
  methods: {
    //返回
    goback() {
      this.$router.back();
    },
    //播放音乐
    pauseOrPlay() {
      // console.log(123);
      if (this.playing) {
        this.$refs.audio.play();
        this.playing = false;
        //设置旋转
        clearInterval(this.timer);
        this.timer = setInterval(() => {
          let r = this.rotate + 0.5;
          if (r > 360) {
            r = -(360 - r);
          }
          this.rotate = r;
        }, 30);
      } else {
        this.$refs.audio.pause();
        this.playing = true;
        clearInterval(this.timer);
      }
    },
    //音乐是否可用
    successMusic() {
      this.axios(`/api/check/music?id=${this.id}`).then(res => {
        if (res.data.success) {
          this.getMusic();
          this.getMusicDetail();
          this.getSongLYric();
        }
        // console.log(res.data);
      });
    },
    //获取音乐的url方法
    getMusic() {
      this.axios(`/api/song/url?id=${this.id}`).then(res => {
        this.music = res.data.data[0];
        // console.log(res.data.data[0], "获取音乐的url");
      });
    },
    // 获取音乐详情
    getMusicDetail() {
      this.axios(`/api/song/detail?ids=${this.id}`).then(res => {
        this.detail = res.data.songs[0].al;
        this.artists = res.data.songs[0].ar;
        // console.log(res.data.songs[0].al, "获取音乐详情");
        // console.log(res.data.songs[0].ar, "获取音乐作者");
      });
    },
    //获取歌词
    getSongLYric() {
      this.axios(`/api/lyric?id=${this.id}`).then(res => {
        let lrc = ["[0:0]当前歌曲暂无歌词"];
        if (res.data.lrc) {
          lrc = res.data.lrc.lyric.split(/\n/g);
        }
        this.lyric = lrc;
        this.refreshLyricTimeArr(lrc);
        this.$nextTick(() => {
          this.initalScroll();
        });
        // console.log(this.lyric, "获取歌词");
      });
    },
    // 从歌词中解析出每一句话的歌唱时间
    refreshLyricTimeArr(lrc) {
      let timeArr = lrc.map(l => {
        // [01:27.1255] sssss
        let str = l.split("]")[0]; // [01:27.1255
        str = str.substr(1); // 01:27.1255
        let arr = str.split(":"); // [01,27.1255]
        let time = arr[0] * 60 + Number(arr[1]);
        return time;
      });
      timeArr = timeArr.filter(t => t === t);
      // console.log(timeArr, "timeArr");
      this.lyricTimeArr = timeArr;
    },
    //获取歌曲当前的播放时间
    updateTime(e) {
      this.currentTime = e.target.currentTime; //获取audio当前播放时间
      //判断音乐是否播放完毕
      if(e.target.ended){
        this.playing = true;
        clearInterval(this.timer);
      }
      // console.log(this.currentTime)
      for (var i = 0; i < this.lyricTimeArr.length; i++) {
        // 获取当前遍历的歌词时间下一句歌词时间的下标
        let j = i + 1;
        // 避免数组越界
        if (j >= this.lyricTimeArr.length) {
          this.lyricIndex = i;
          break;
        }
        let time = this.lyricTimeArr[i];
        let nextTime = this.lyricTimeArr[j];
        if (this.currentTime >= time && this.currentTime < nextTime) {
          this.lyricIndex = i;
          break;
        }
      }
    },
    //歌词滑动方法
    initalScroll() {
      if (this.lyric) {
        if (!this.menuScroller) {
          // 避免内存泄漏，当menuScroller已经被创建时无需再实例化新的BScroll对象
          this.menuScroller = new BScroll(this.$refs.lyricWrapper, {
            disableTouch: true
          });
        } else {
          this.menuScroller.refresh();
        }
      }
    }
  },

  mounted() {
    this.successMusic();
  },
  beforeDestroy() {
    if (this.menuScroller) {
      this.menuScroller.destroy();
    }
  }
};
</script>
<style lang="scss" scoped>
.play-view {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #fff;
  z-index: 10;
  .back{
      position: fixed;
      left: 0;
      top: 0;
      width: 1rem;
      height: 1rem;
      line-height: 0.8rem;
      z-index: 99;
    .fa-angle-left {
      font-size: 0.6rem;
      padding-left: 0.4rem;
      color: rgba(255,255,255,0.8);
    }
  }
  .play-view-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: #161824;
    background-position: 50%;
    background-repeat: no-repeat;
    background-size: auto 100%;
    z-index: 1;
  }
  .music-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    backdrop-filter: blur(15px);
    background: rgba(0, 0, 0, 0.2);
    overflow: hidden;
    z-index: 10;
  }
  .music-wrap {
    padding-top: 1.6rem;

    .music-disc {
      position: relative;
      margin: 0 auto;
      width: 6.84rem;
      height: 6.84rem;

      &::after {
        content: " ";
        position: absolute;
        display: inline-block;
        width: 2.2rem;
        height: 3.14rem;
        top: -1.6rem;
        left: 3rem;
        background-image: url(../assets/icon/needle-plus.png);
        background-size: contain;
        z-index: 20;
      }
    }

    .music-play-btn {
      position: absolute;
      left: 50%;
      top: 50%;
      display: inline-block;
      width: 1.3rem;
      height: 1.3rem;
      transform: translate(-50%, -50%);
      background: url(../assets/icon/play_btn_3x.png) 0 0 no-repeat;
      background-size: 1.3rem 1.3rem;
    }

    .music-turn {
      width: 100%;
      height: 100%;

      &::before {
        content: " ";
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 2;
        background: url(../assets/icon/disc-plus.png) no-repeat;
        background-size: contain;
      }
    }

    .music-light {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      z-index: 3;
      transform-origin: center center;
      background: url(../assets/icon/disc_light-plus.png) no-repeat;
      background-size: contain;
    }

    .music-cover {
      position: absolute;
      top: 1.3rem;
      left: 1.3rem;
      width: 4.24rem;
      height: 4.24rem;
      border-radius: 50%;
      transform-origin: center center;
      background-position: 50%;
      background-repeat: no-repeat;
      background-size: contain;
    }
  }
  .music-info {
    position: relative;
    margin-top: 0.5rem;
    padding: 0 0.7rem;
    z-index: 10;
    text-align: center;

    .music-header {
      color: white;
      font-size: 0.36rem;
      line-height: 1.1;
    }
    .music-header-sname {
      font-size: 0.3rem;
      color: rgba(255, 255, 255, 0.8);
      font-weight: 400;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    }

    .music-lyric-wrapper {
      margin-top: 0.28rem;
      height: 1.12rem;
      overflow: hidden;
    }
    .music-lyric-item {
      padding-bottom: 8px;
      font-size: 0.3rem;
      line-height: 1.5;
      color: rgba(255, 255, 255, 0.8);
    }
  }
}
</style>