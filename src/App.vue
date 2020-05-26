<template>
  <div id="app">
    <div class="nav-warpper">
      <div class="nav-left">
        <i class="fa fa-bars" ></i>
      </div>
      <div class="nav-center">
        <ul class="nav-list">
          <router-link tag="span" class="nav-title" to="/home">我的</router-link>
          <router-link tag="span" class="nav-title" to="/">发现</router-link>
          <router-link tag="span" class="nav-title" to="/about">朋友</router-link>
          <router-link tag="span" class="nav-title" to="/video">视频</router-link>
        </ul>
      </div>
      <router-link tag="div" class="nav-right" to="/search">
        <i class="fa fa-search"></i>
      </router-link>
    </div>
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<style lang="scss">
.nav-warpper {
  display: flex;
  box-sizing: border-box;
  width: 100%;
  height: 1rem;
  padding: 0 0.23rem;
  position: sticky;
  top: 0;
  z-index: 2;
  background-color: #fff;
  line-height: 1rem;
  font-size: 0.3rem;
  .nav-left {
    flex: 2;
    display: flex;
    justify-content: center;
    align-items: center;
    .fa-bars {
      color: #999;
      font-size: 0.4rem;
    }
  }
  .nav-center {
    flex: 6;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #999;
    font-size: 0.3rem;
    .nav-list {
      display: flex;
    }
    .nav-title {
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
      text-align: center;
    }
  }
  .nav-right {
    flex: 2;
    display: flex;
    justify-content: center;
    align-items: center;
    .fa-search {
      color: #999;
      font-size: 0.35rem;
    }
  }
  .router-link-exact-active {
    font-size: 0.32rem;
    color: #333;
    font-weight: 600;
  }
}
</style>
