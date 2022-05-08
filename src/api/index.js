import request from '@/utils/request';

const URL = 'https://api.11zb.com/api'

// 获取最新直播列表 menu_id 1  足球  2 篮球
// const liveData = {
//     menu_id:id
// }
export async function  getMatchLive(data){
    console.log(data)
	return  request.get(`${URL}/match/getHomeList`,{params: data})
} 



// 登陆 mobile=111&captcha=1
// export const getLogin = (data) =>{
// 	return  http.get(`/member/login`,{params: data,custom})
// } 

export async function getLogin  (data){
	return  request.get(`/member/login`,{params: data})
} 

//获取获取验证码 mobile=11111 
export async function  sedSmscode (data){
	return request.get(`/smscode`,{params: data})
} 


//获取队伍比赛详情 match_id=3570833&sport_id=1
export  async function  getMatchInfo (data){
	return  http.get(`/match/getMatchInfo`,{params: data,custom})
} 