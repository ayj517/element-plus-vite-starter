import request from '@/utils/request';

const URL = 'https://api.11zb10.com/api'

// 获取最新直播列表 menu_id 1  足球  2 篮球
// const liveData = {
//     menu_id:id
// }
export async function getMatchLive(data) {
  return request.get(`${URL}/match/getHomeList`, { params: data })
}


// 登陆 mobile=111&captcha=1
// export const getLogin = (data) =>{
// 	return  http.get(`/member/login`,{params: data,custom})
// }

export async function getLogin(data) {
  return request.get(`${URL}/member/login`, { params: data })
}

//获取获取验证码 mobile=11111
export async function sendSmsCode(data) {
  return request.get(`${URL}/smscode`, { params: data })
}


//获取队伍比赛详情 match_id, sport_id, ff_match_id
export async function getMatchInfo(data) {
  return request.get(`${URL}/match/getMatchInfo`, { params: data })
}
// 获取赛程 sport_id=2  1  足球  2 篮球
export async function getMatchSchedule(data) {
  return request.get(`${URL}/match/getMatchSchedule`, { params: data })
}

// 获取赛程 sport_id=2  1  足球  2 篮球
export async function getAppHost(data) {
  return request.get(`${URL}/getAppHost`)
}
