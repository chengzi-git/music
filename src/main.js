import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLazyload from 'vue-lazyload'
import axios from 'axios'
import VueAxios from 'vue-axios'
import element from './element-ui.config'

Vue.use(VueAxios, axios)
Vue.use(element)
Vue.config.productionTip = false
//图片懒加载
Vue.use(VueLazyload, {
  loading:require('./assets/images/loading.gif')
})
//rem 自适应布局
const setHtmlFontSize = () => {
  const htmlDom = document.getElementsByTagName('html')[0];
  let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
  if (htmlWidth >= 750) {
    htmlWidth = 750;
  }
  if (htmlWidth <= 320) {
    htmlWidth = 320;
  }
  htmlDom.style.fontSize = `${htmlWidth / 7.5}px`;
};
window.onresize = setHtmlFontSize;
setHtmlFontSize();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
