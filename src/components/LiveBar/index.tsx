import { FC } from "react";
import styles from './index.less'
import dayjs from 'dayjs'
import { Statistic } from 'antd'
const { Countdown } = Statistic;

export type Racer = {
  name: string;
  logo: string;
}

const statusMap: any = {
  1: '未开始',
  2: '进行中',
  3: '已结束',
  4: '推迟'
}

const LiveBar: FC = (props: any) => {
  const { raceInfo } = props
  console.log('🚀 ~ raceInfo', raceInfo)
  const {
    home_name, home_logo, home_score,
    away_name, away_logo, away_score,
    match_status = 1,
    alias_name = '',
    stages_name = '',
    match_time
  } = raceInfo
  console.log('🚀 ~ match_time', match_time)

  const gameTime = dayjs(match_time * 1000).format('MM月DD日 HH:mm')

  return <div className={styles.liveBarContainer}>
    <div className={styles.racer}>
      <img src={home_logo} alt="" />
      <div className={styles.racerInfo}>
        <span>{home_name}</span>
        <em>{home_score}</em>
      </div>
    </div>



    <div className={styles.gameInfo}>

      {match_status == 2 && <h4>{alias_name} {stages_name} {gameTime}</h4>}
      {((match_status == 1 || match_status == 4) && match_time) && <h4>
        距离比赛还有 {<Countdown valueStyle={{ color: '#fff' }} value={match_time * 1000} format="D 天 H 时 m 分 s 秒" />}
      </h4>}
      <span>{statusMap[match_status]}</span>
    </div>



    <div className={styles.racer2}>
      <img src={away_logo} alt="" />
      <div className={styles.racerInfo}>
        <span>{away_name}</span>
        <em>{away_score}</em>
      </div>
    </div>
  </div>

}

export default LiveBar
