import { FC, useRef, useState, useEffect } from 'react';
import { Tabs, Empty } from 'antd'
import LiveBar from '@/components/LiveBar';
import VideoJS from '@/components/VideoJs'
import styles from './index.less'
import RaceInfoTabs from '@/components/RaceInfoTabs';
import Layout from '@/components/layout'
import { useLocation } from 'umi';
import Cookies from 'js-cookie'
import { getMatchInfo } from '../../api'


// 视频设置
const videoJsOptions = {
  autoplay: true,
  controls: true,
  responsive: true,
  fluid: true,
  sources: '',
  notSupportedMessage: '此视频暂无法播放，请稍后再试',
  poster: ""
}

export type queryType = {
  match_id?: string;
  sport_id?: string;
  ff_match_id?: string;
};

const Live: FC = () => {
  const playerRef = useRef(null)
  const loginTimer = useRef<any>(null)
  const [options, setOptions] = useState(videoJsOptions)
  const [curRaceInfo, setCurRaceInfo] = useState({})
  const location = useLocation() as unknown as { query: queryType };
  const query = location.query;

  useEffect(() => {
    const fetchData = async (type?:String) => {
      const params: queryType = {
        match_id: query.match_id,
        sport_id: query.sport_id,
        ff_match_id: query.ff_match_id
      }

      const res = await getMatchInfo(params)
      const itemData = res.data
      // itemData.away_score = Math.ceil(Math.random()*10)
      // console.log(itemData)
      // console.log('获取比分')
      setCurRaceInfo(itemData)
      if(!type){
        setOptions({
          ...options,
          poster: itemData.screenshot_url,
          sources: itemData.player_url
        })
      }

    }

    const timer =  setInterval(() => {
      if(curRaceInfo.match_status !=2 ){
        clearInterval(timer)
      }else{
        fetchData('ff')
      }
    }, 60000);

    fetchData()

    return ()=> clearInterval(timer)

  }, [])



  const handlePlayerReady = (player: any) => {
    playerRef.current = player;

    player.on('waiting', () => {
      player.log('player is waiting');
    });

    player.on('dispose', () => {
      player.log('player will dispose');
    });

    player.on('play', () => {
      // 如果未登录，则 60 秒后设置登录标记
      const isLogin = !!Cookies.get('tel')
      if (!isLogin) {
        loginTimer.current && clearTimeout(loginTimer.current)
        loginTimer.current = setTimeout(() => {
          localStorage.setItem('showLogin', '1');
        }, 60000)
      } else {
        localStorage.removeItem('showLogin');
      }
      console.log('视频开始播放了......')
    });
  };


  return <Layout>
    <div className={styles.liveContainer}>
      <LiveBar
        raceInfo={curRaceInfo}
      />
      <div className={styles.videoContainer}>
        {options.poster && <VideoJS options={options} onReady={handlePlayerReady} />}
      </div>
      <RaceInfoTabs />
    </div>
  </Layout>
}

export default Live
