export default {
    islogin(state) {
        state.loginState = 1
      },
      nologin(state) {
        state.loginState = 0
      },
      isshow(state) {
        state.show = true,
        state.scroll = true
      },
      noshow(state) {
        state.show = false,
        state.scroll = false
      },
      isReload(state) {
        state.reload = true
      },
      noReload(state) {
        state.reload = false
      },
}