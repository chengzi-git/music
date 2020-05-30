<template>
  <div>
    <Banner />
    <div class="nav">
      <router-link class="nav-item" tag="div" to="/day">
        <div class="nav-item-bgcolor">
          <i class="fa fa-calendar-check-o"></i>
        </div>
        <span class="nav-item-text">每日推荐</span>
      </router-link>
      <router-link class="nav-item" tag="div" to="/songlist">
        <div class="nav-item-bgcolor">
          <i class="fa fa-file-text-o"></i>
        </div>
        <span class="nav-item-text">歌单</span>
      </router-link>
      <router-link class="nav-item" tag="div" to="/rank">
        <div class="nav-item-bgcolor">
          <i class="fa fa-align-right"></i>
        </div>
        <span class="nav-item-text">排行榜</span>
      </router-link>
      <router-link class="nav-item" tag="div" to="/radio">
        <div class="nav-item-bgcolor">
          <i class="fa fa-pinterest"></i>
        </div>
        <span class="nav-item-text">电台</span>
      </router-link>
      <router-link class="nav-item" tag="div" to="/fm">
        <div class="nav-item-bgcolor">
          <i class="fa fa-camera-retro"></i>
        </div>
        <span class="nav-item-text">私人FM</span>
      </router-link>
    </div>
    <router-view />
    <RecommendedSong />
    <NewSong />
  </div>
</template>
<script>
import Banner from "../components/find/Banner";
import RecommendedSong from "../components/find/RecommendedSong";
import NewSong from "../components/find/NewSong";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {};
  },
  components: {
    Banner,
    RecommendedSong,
    NewSong
  },
  computed: {
    ...mapState({
      reload: "reload"
    })
  },
  methods: {
    ...mapMutations({
      noReload: "noReload"
    }),
    reloadFun() {
      setTimeout(() => {
        // console.log("0.1秒后改变");
        if (this.reload) {
          // console.log('刷新');
          this.$router.go(0);
        }
        this.noReload()
      }, 100);
    }
  },
  // watch: {
  //   reload(){
  //   }
  // },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.reloadFun();
    });
  }
};
</script>
<style lang="scss" scoped>
.nav {
  width: calc(100vw - 20px);
  margin: 10px;
  height: 2rem;
  // line-height: 2rem;
  display: flex;
  .nav-item {
    flex: 1;
    height: 100%;
    text-align: center;
    font-size: 0.3rem;
    position: relative;
  }
  .nav-item-bgcolor {
    width: 0.8rem;
    height: 0.8rem;
    background-color: rgba(232, 68, 39, 0.77);
    border-radius: 50%;
    position: absolute;
    top: -15%;
    left: 50%;
    transform: translateX(-50%) translateY(50%);
    line-height: 1rem;
    .fa {
      font-size: 0.5rem;
      color: white;
    }
    .fa-align-right {
      transform: rotate(90deg);
    }
  }
  .nav-item-text {
    width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(50%);
    font-size: 0.28rem;
  }
}
</style>