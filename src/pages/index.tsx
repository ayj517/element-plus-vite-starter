import styles from './index.less';
import GameLiveItem from '@/components/gameLive/GameLiveItem'
import Layous from '@/components/layout/index'

export default function IndexPage() {
  return (
    <div>
      <Layous>
        <div className={styles.liveList}>
          <h1>推荐</h1>
         <GameLiveItem/>
        </div>
      </Layous>
    </div>
  );
}
