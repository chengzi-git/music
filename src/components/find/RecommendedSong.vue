<template>
  <div class="container">
    <div class="title">
      <h1 class="title-left">推荐歌单</h1>
      <div class="title-right">歌单广场</div>
    </div>
    <div class="nav-box">
      <router-link v-for="(item,i) in data" :key="i" class="nav-content" tag="div" :to="{name:'Song',query:{img:item.picUrl,title:item.name,count:item.playCount,id:item.id}}">
        <div class="nav-list">
          <div class="nav-img">
            <span class="nav-count">{{item.playCount>= 100000? Math.floor(item.playCount / 1000) / 10 + '万':item.playCount}}</span>
            <img :src="item.picUrl" alt />
          </div>
          <div class="nav-name">{{item.name}}</div>
        </div>
      </router-link>
    </div>
  </div>
</template>
<script>
import {DATEREC_SONGLIST} from '../../api/api.js'
export default {
  data() {
    return {
      data: []
    };
  },
  mounted() {
    this.axios(DATEREC_SONGLIST).then(res => {
      this.data = res.data.result;
      // console.log(res.data.result);
    });
  }
};
</script>
<style lang="scss" scoped>
.container {
  width: calc(100vw - 20px);
  margin: 10px;
  .title {
    display: flex;
    justify-content: space-between;
    .title-left {
      font-size: .4rem;
      font-weight: 600;
    }
    .title-right {
      font-size: .28rem;
      border: 1px solid #ccc;
      border-radius: .25rem;
      padding: .12rem;
    }
  }
  .nav-box {
    width: calc(100vw-20px);
    margin: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    .nav-content {
      width: 30%;
      margin-top: .2rem;
      margin-right: .2rem;
      &:nth-child(3) {
        margin-right: 0;
      }
      &:nth-child(6) {
        margin-right: 0;
      }
    }
    .nav-list {
      width: 100%;
    }
    .nav-img {
      position: relative;
      width: 100%;
      height: 100%;
      border-radius: .2rem;
      overflow: hidden;
      .nav-count {
        position: absolute;
        right: 5px;
        top: 2px;
        display: inline-block;
        font-size: 12px;
        color: #fff;
        padding-left: 13px;
        text-shadow: 1px 0 0 rgba(0, 0, 0, .15);
        background-position: 0;
        background-image: url('../../assets/icon/headset.svg');
        background-repeat: no-repeat;
        background-size: 11px 10px;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    .nav-name {
      width: 100%;
      margin-top: .2rem;
      font-size: .23rem;
      line-height: .3rem;
      letter-spacing: 1px;
      height: .6rem;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
}
</style>