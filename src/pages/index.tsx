import styles from './index.less';
import GameLiveItem from '@/component/gameLive/GameLiveItem'

export default function IndexPage() {
  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
      <GameLiveItem/>
    </div>
  );
}
