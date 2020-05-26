<template>
  <div class="container">
    <div class="wrapper">
      <div class="skr">
        <img :src="this.img" alt />
      </div>
      <div class="wrapper_top">
        <div class="nav">
          <i class="fa fa-angle-left" @click="goback"></i>
          <span class="nav_title">歌单</span>
        </div>
        <div class="top-info">
          <div class="info-img">
            <span
              class="info-count"
            >{{this.count>= 100000? Math.floor(this.count / 1000) / 10 + '万':this.count}}</span>
            <img :src="this.img" alt />
          </div>
          <div class="info-content">
            <p>{{this.title}}</p>
            <div class="creator">
              <div class="creator_img">
                <img :src="this.song.playlist.creator.avatarUrl||this.img" />
              </div>
              <p class="creator_name">{{this.song.playlist.creator.nickname}}</p>
              <i class="fa fa-angle-right"></i>
            </div>
            <div class="description">
              <span class="description_title">{{this.song.playlist.description}}</span>
              <i class="fa fa-angle-right"></i>
            </div>
          </div>
        </div>
        <div class="list">
          <div class="list_div">
            <i class="fa fa-commenting-o"></i>
            <span>{{this.song.playlist.commentCount}}</span>
          </div>
          <div class="list_div">
            <i class="fa fa-share-square-o"></i>
            <span>{{this.song.playlist.shareCount}}</span>
          </div>
          <div class="list_div">
            <i class="fa fa-cloud-download"></i>
            <span>下载</span>
          </div>
          <div class="list_div">
            <i class="fa fa-files-o"></i>
            <span>多选</span>
          </div>
        </div>
      </div>
      <div class="wrapper_nav">
        <div class="nav_content">
          <i class="fa fa-play-circle-o"></i>
          <span class="title">播放全部</span>
          <span class="count">(共{{this.song.playlist.tracks.length}}首)</span>
        </div>
        <div class="nav_collect">
          <span
            class="collect_count"
          >+收藏({{this.song.playlist.subscribedCount>= 10000? Math.floor(this.song.playlist.subscribedCount / 1000) / 10 + '万':this.song.playlist.subscribedCount}})</span>
        </div>
      </div>
      <div class="wrapper_content">
        <div v-if="this.show" class="wrapper_loading">加载中...</div>
        <router-link tag="div"  class="wrapper_list" v-for="(item,i) in this.song.playlist.tracks" :key="i" :to="{name:'PlayView',query:{id:item.id}}">
          <span class="song_index">{{i+1}}</span>
          <div class="song-content">
            <p class="song_name">{{item.name}}</p>
            <p class="song_author">{{item.ar[0].name}}-{{item.al.name}}</p>
          </div>
          <div class="song_play">
            <i class="fa fa-play-circle-o"></i>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      img: this.$route.query.img,
      title: this.$route.query.title,
      count: this.$route.query.count,
      id: this.$route.query.id,
      show:true,
      song: {
        playlist: {
          creator: { avatarUrl: "" },
          tracks: []
        }
      }
    };
  },
  methods: {
    goback() {
      this.$router.go(-1);
    }
  },
  mounted() {
    this.axios(`/api/playlist/detail?id=${this.id}`).then(res => {
      this.song = res.data;
      this.show = false;
      console.log(res.data);
    });
  }
};
</script>
<style lang="scss" scoped>
.wrapper {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 99;
  background: #fff;
  width: 100vw;
  // height: 100vw;
  padding: 0 0.25rem;
  .skr {
    height: 6rem;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0.8;
    filter: brightness(10%);
    // filter: blur(0.2rem);

    z-index: -1;
    img {
      width: 100vw;
      height: 100%;
    }
  }
  .wrapper_top {
    height: 6rem;
    width: calc(100vw -0.5rem);
    color: white;
    display: flex;
    flex-direction: column;
    .nav {
      flex: 0 0 1rem;
      height: 1rem;
      line-height: 0.5rem;
    }
    .fa-angle-left {
      font-size: 0.8rem;
      padding-right: 5px;
    }
    .nav_title {
      padding-left: 0.1rem;
      font-size: 0.35rem;
      font-weight: 600;
      vertical-align: 5px;
      width: 8rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .top-info {
      display: flex;
      .info-img {
        flex: 0 0 3rem;
        width: 3rem;
        height: 3rem;
        position: relative;
        border-radius: 0.11rem;
        overflow: hidden;
        .info-count {
          position: absolute;
          right: 0.1rem;
          top: 0.1rem;
          display: inline-block;
          font-size: 0.24rem;
          color: #fff;
          padding-left: 0.24rem;
          text-shadow: 1px 0 0 rgba(0, 0, 0, 0.15);
          background-position: 0;
          background-image: url("../../assets/icon/headset.svg");
          background-repeat: no-repeat;
          background-size: 11px 10px;
        }
      }
      img {
        width: 100%;
        height: 100%;
      }
      .info-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding-left: 0.2rem;
        > p {
          font-size: 0.36rem;
          line-height: 1.5;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        .creator {
          display: flex;
          line-height: 0;
          align-items: center;
          color: #ccc;
          .creator_img {
            width: 0.5rem;
            height: 0.5rem;
            img {
              border-radius: 50%;
            }
          }
          .creator_name {
            font-size: 0.25rem;
            margin-left: 0.2rem;
          }
          .fa-angle-right {
            font-size: 0.3rem;
            margin-left: 0.2rem;
          }
        }
        .description {
          display: flex;
          align-items: center;
          color: #ccc;
          .description_title {
            width: 3rem;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            overflow: hidden;
            -webkit-box-orient: vertical;
            font-size: 0.3rem;
          }
          .fa {
            font-size: 0.3rem;
            margin-left: 0.2rem;
          }
        }
      }
    }
    .list {
      display: flex;
      align-items: center;
      text-align: center;
      margin-top: 0.6rem;
      .list_div {
        flex: 1;
        display: flex;
        flex-direction: column;
      }
      .fa {
        font-size: 0.4rem;
      }
      span {
        font-size: 0.28rem;
        margin-top: 0.1rem;
      }
    }
  }
  .wrapper_nav {
    display: flex;
    align-content: center;
    justify-content: space-between;
    .nav_content {
      line-height: 0.5rem;
      .fa-play-circle-o {
        font-size: 0.35rem;
      }
      .title {
        font-size: 0.35rem;
        margin-left: 0.1rem;
      }
      .count {
        font-size: 0.28rem;
        margin-left: 0.1rem;
        color: #666;
      }
    }
    .nav_collect {
      height: 0.75rem;
      line-height: 0.2rem;
      background: linear-gradient(180deg, #ff1a00 19%, #ff1a00 50%);
      border-radius: 0.4rem;
      padding: 0 0.2rem;
      margin-top: 0.2rem;
      .collect_count {
        font-size: 0.25rem;
        color: #fff;
      }
    }
  }
  .wrapper_loading{
    text-align: center;
    width: 100vw;
    height: 100vh;
    font-size: 0.6rem;
    line-height: 2;
  }
  .wrapper_content {
    margin-top: 0.2rem;
    .wrapper_list {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .song_index {
      font-size: 0.34rem;
      color: #999;
    }
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
      .fa-play-circle-o {
        font-size: 0.4rem;
        color: #ccc;
      }
    }
  }
}
</style>