<template>
  <div class="msg-box"></div>
</template>
<script>
import Vue from "vue";
Vue.prototype.$showToast = function(o) {
  this.$children[0].$el.textContent = o.message;
  this.$children[0].$el.style.top = "0px";
  setTimeout(() => {
    this.$children[0].$el.style.top = "-50px";
  }, o.duration || 2000);
};
export default {
  name: "MsgBox"
};
</script>

<style lang="scss" scoped>
.msg-box {
  width: 200px;
  height: 50px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  background-color: #ccc;
  position: fixed;
  top: -50px;
  left: 0;
  right: 0;
  margin: 0 auto;
  text-align: center;
  color: #444;
  line-height: 50px;
  transition: top .2s linear;
  z-index: 9999;
  font-size: .3rem;
}
</style>