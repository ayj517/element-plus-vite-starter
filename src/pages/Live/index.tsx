import { FC } from 'react';
import LiveBar from '@/components/LiveBar';

import styles from './index.less'
const Live: FC = () => {

  return <div className={styles.liveContainer}>
    <LiveBar />
    直播页面
  </div>
}

export default Live
