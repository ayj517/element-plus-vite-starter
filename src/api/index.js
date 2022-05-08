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

