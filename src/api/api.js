// ====================发现页面
export const BANNER_SWIPER ='/api/banner?type=1' // 请求发现页面轮播图
export const DATEREC_SONGLIST = '/api/personalized?limit=6' // 每日推荐歌单，发现页展示的那六个
export const NEW_SONGS = '/api/top/song?type=7' // 新歌 发现页展示的那三个

//歌单详情
export const SONG_DETAIL = function(id){return '/api/playlist/detail?id=' + id}
//每日推荐歌曲
export const DAY_SONGS = '/api/recommend/songs'

//=======获取登录状态
export const LOGIN_STATUS = '/api/login/status'
//=======登录
export const LOGIN = function(phone,password){return `/api/login/cellphone?phone=${phone}&password=${password}`}
//=======退出
export const LOGIN_OUT = '/api/logout'

//====================歌词
export const CHECK_MUSIC = function(id){return '/api/check/music?id=' + id}//音乐是否可用
export const MUSIC_URL = function(id){return '/api/song/url?id=' + id} //获取音乐的url方法
export const MUSIC_DETAIL = function(id){return '/api/song/detail?ids=' + id} // 获取音乐详情
export const MUSIC_LYRIC = function(id){return '/api/lyric?id=' + id} //获取歌词

// ===================搜索
export const HOT_SEARCH = '/api/search/hot/detail'//获取热门搜索
export const SEARCH_RESULT = function(text){return '/api/search?keywords=' + text}//获取搜索结果
export const SEARCH_SUGGEST = function(text){return `/api/search/suggest?keywords=%20${text}&type=mobile`}//获取搜索建议




