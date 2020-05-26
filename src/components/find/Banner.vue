<template>
  <div>
    <div class="carousel">
      <transition-group name="horizontal">
        <div class="img-item" v-for="(img,i) in imgs" v-show="i === index" :key="i">
          <img :src="img.pic" alt="图片" />
        </div>
      </transition-group>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      index: 0,
      imgs: [
      ]
    };
  },
  mounted() {
    this.axios(`/api/banner?type=1`).then(res => {
      this.imgs =res.data.banners
    });
    this.timer = setInterval(() => {
      if (this.index >= this.imgs.length - 1) {
        this.index = 0;
      } else {
        this.index++;
      }
    }, 3000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  }
};
</script>
<style scoped>
.carousel {
  width: calc(100vw - 20px);
  margin: 10px;
  height: 38.9vw;
  position: relative;
  overflow: hidden;
}
.carousel img {
  width: calc(100vw - 20px);
  height: 100%;
}

.img-item {
  position: absolute;
}
/*水平轮播图*/

.horizontal-enter {
  transform: translateX(100%);
}

.horizontal-enter-active,
.horizontal-leave-active {
  transition: all 0.5s linear;
}

.horizontal-enter-to,
.horizontal-leave {
  transform: translateX(0);
}

.horizontal-leave-to {
  transform: translateX(-100%);
}
</style>