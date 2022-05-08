import { FC } from "react";
import styles from './index.less'

export type Racer = {
  name: string;
  logo: string;
}

const LiveBar: FC = () => {

  return <div className={styles.liveBarContainer}>
    <div className={styles.racer}>
      <img src="https://cdn.sportnanoapi.com/basketball/team/06e7bde6cca98873fe971fad4e67a9b6.png" alt="" />
      <div className={styles.racerInfo}>
        <span>76人</span>
        <em>0</em>
      </div>
    </div>
    <div className={styles.gameInfo}>
      <h4>NBA 季后赛 05月09日 08:00</h4>
      <span>未开始</span>
    </div>
    <div className={styles.racer2}>
      <img src="https://cdn.sportnanoapi.com/basketball/team/06e7bde6cca98873fe971fad4e67a9b6.png" alt="" />
      <div className={styles.racerInfo}>
        <span>76人</span>
        <em>0</em>
      </div>
    </div>
  </div>

}

export default LiveBar
