import styles from './index.less';
import GameLiveItem from '@/components/gameLive/GameLiveItem'
import Layous from '@/components/layout/index'

export default function IndexPage() {
  return (
    <div>
      <Layous>
        <div className={styles.liveList}>
         <GameLiveItem/>
        </div>
      </Layous>
    </div>
  );
}
