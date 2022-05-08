import { FC, useRef } from 'react';
import { Tabs, Empty } from 'antd'
import LiveBar from '@/components/LiveBar';
import VideoJS from '@/components/VideoJs'
import styles from './index.less'
import RaceInfoTabs from '@/components/RaceInfoTabs';
import Layout from '@/components/layout'

const { TabPane } = Tabs;
const Live: FC = () => {
  const playerRef = useRef(null)
  // 视频设置
  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [{
      src: 'https://www.runoob.com/try/demo_source/movie.mp4',
      type: 'video/mp4'
    }],
    notSupportedMessage: '此视频暂无法播放，请稍后再试',
    poster: "https://tse1-mm.cn.bing.net/th/id/OET.383287bd6368464698d1585fa9a6f913?w=272&h=272&c=7&rs=1&o=5&dpr=2&pid=1.9"
  }

  const handlePlayerReady = (player: any) => {
    playerRef.current = player;

    player.on('waiting', () => {
      player.log('player is waiting');
    });

    player.on('dispose', () => {
      player.log('player will dispose');
    });
  };


  return <Layout>
    <div className={styles.liveContainer}>
      <LiveBar />
      <div className={styles.videoContainer}>
        <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
      </div>
      <RaceInfoTabs />
    </div>
  </Layout>
}

export default Live
