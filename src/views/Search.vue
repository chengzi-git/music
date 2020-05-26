<template>
  <div class="wrapper">
    <div class="search-box">
      <i class="fa fa-angle-left" @click="back"></i>
      <input class="inp" v-model="text" placeholder="搜索歌曲 歌手 专辑" />
      <i class="fa fa-search" @click="searchFun"></i>
    </div>
    <div class="searchtip-box">
      <ul class="searchtip-list">
        <li class="list-item" v-for="(item,i) in searchtip" :key="i">{{item.keyword}}</li>
      </ul>
    </div>
    <div class="result" v-show="!text==''&&!show">
      <div>
        <div class="result-title">单曲</div>
        <div v-if="this.show" class="wrapper_loading">加载中...</div>
        <router-link tag="div" class="wrapper_list" v-for="(item,i) in songs" :key="i" :to="{name:'PlayView',query:{id:item.id}}">
          <div class="song-content">
            <p class="song_name" >
              {{item.name}}
              <span class="song_alias">{{item.alias[0]}}</span>
            </p>
            <p class="song_author">{{item.artists[0].name}}</p>
          </div>
          <div class="song_play">
            <i class="fa fa-play-circle-o"></i>
          </div>
        </router-link>
      </div>
    </div>
    <div class="hot-search" >
      <div v-show="text==''">
        <div class="hot-title">热搜榜</div>
        <div
          class="hot-list"
          v-for="(item,i) in hotSearch"
          :key="i"
          @click="searchTxt(item.searchWord)"
        >
          <span class="hot-index" :class="i < 3 ? 'active': ''">{{i+1}}</span>
          <div class="hot-info">
            <div class="hot-info-name">
              {{item.searchWord}}
              <span class="hot-info-score">{{item.score}}</span>
              <span class="icon" v-if="item.iconType==1"></span>
            </div>
            <p class="hot-info-content">{{item.content}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      text: "",
      hotSearch: [],
      songs: [],
      show:true,
      searchtip:[]
    };
  },
  methods: {
    back() {
      this.$router.back();
    },
    searchTxt(title) {
      this.text = title;
      this.searchFun();
    },
    //获取搜索结果
    searchFun() {
      if (this.text) {
        this.axios(`/api//search?keywords=${this.text}`).then(res => {
          this.show = false;
          this.songs = res.data.result.songs;
          // console.log(res.data.result.songs);
        });
      }
    },

  },
  mounted() {
    this.axios("/api/search/hot/detail").then(res => {
      this.hotSearch = res.data.data;
    });
     
  },

  beforeRouteLeave (to, from, next) {
    this.text = '';
    next()
  } 
};
</script>
<style lang="scss" scoped>
.wrapper {
  position: relative;
  left: 0;
  top: -0.8rem;
  width: 100vw ;
  height: 100vh;
  z-index: 99;
  background: #fff;
  padding: 0 0.4rem;
  box-sizing: border-box;
}
.search-box {
  display: flex;
  height: 0.7rem;
  .fa-angle-left {
    font-size: 0.48rem;
    height: 0.7rem;
    line-height: 0.7rem;
    color: #666;
  }
  .inp {
    flex: 1;
    border: 0;
    margin-left: 0.3rem;
    border-bottom: 1px solid #aaa;
    outline: none;
    font-size: 16px;
    height: 0.7rem;
  }
  .fa-search {
    font-size: 0.4rem;
    height: 0.7rem;
    line-height: 0.7rem;
    margin-left: 0.2rem;
    color: #666;
  }
}

.hot-search {
  width: 100%;
  // height: 100vh;
  // height: calc( 100vh - 0.7rem);
  margin-top: 0.4rem;
  padding-bottom: 1rem;
  overflow: hidden;
  .hot-title {
    font-size: 0.4rem;
  }
  .hot-list {
    display: flex;
    margin: 0.2rem 0;
    margin-top: 0.4rem;
    align-items: center;
    .hot-index {
      font-size: 0.3rem;
      flex: 0 0 0.6rem;
      &.active {
        color: red;
      }
    }
    .hot-info-name {
      font-size: 0.32rem;
      color: #222;
      .hot-info-score {
        font-size: 0.28rem;
        color: #aaa;
        margin-left: 0.1rem;
      }
      .icon {
        display: inline-block;
        width: 0.3rem;
        height: 0.2rem;
        margin-left: 0.2rem;
        background-image: url("../assets/icon/hot.png");
        background-repeat: no-repeat;
        background-size: 0.3rem 0.2rem;
      }
    }
    .hot-info-content {
      font-size: 0.23rem;
      color: #aaa;
      margin-top: 0.16rem;
    }
  }
}

.result {
  margin-top: 0.2rem;
  // width: 100vw;
  // height: 100vh;
  overflow: hidden;
  .result-title {
    font-size: 0.4rem;
    font-weight: bold;
    width: 100vw;
    height: 1rem;
    line-height: 1rem;
  }
  .wrapper_list {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .song-content {
    flex: 1;
    overflow: hidden;
    .song_name {
      font-size: 0.34rem;
      color: #333;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      &.active {
        color: skyblue;
      }
      .song_alias {
        margin-left: 0.2rem;
        color: #7c7b7d;
        font-size: 0.3rem;
      }
    }
    .song_author {
      font-size: 0.23rem;
      color: #7c7b7d;
      margin-top: 0.1rem;
    }
  }
  .song_play {
    width: 0.4rem;
    height: 1rem;
    line-height: 0.5rem;
    .fa-play-circle-o {
      font-size: 0.4rem;
      color: #ccc;
    }
  }
}
</style>