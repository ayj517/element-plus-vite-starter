import styles from './index.less';
import GameLiveItem from '@/components/gameLive/GameLiveItem'
import Layous from '@/components/layout/index'
import { useState,useEffect } from 'react';
import {getMatchLive} from '@/api/index'

const IndexPage = ()=> {
  const [liveList,setLiveList] = useState([])
  const [navTab,setNavTab] = useState(0)

  useEffect(() => {
    
    getList(navTab)
  });


  const navTabFn =(nub:any)=>{
    setNavTab(nub)
    getList(nub)
  }

  const getList = async(id:any)=>{
    const liveData = {
      menu_id:id
    }
    const res  = await getMatchLive(liveData);
    setLiveList(res.data.recentMatchs)
  }
  return (
    <div>
      <Layous curTab={navTab} tabFn={navTabFn}>
        <div className={styles.liveList}>
          <h1>推荐</h1>
         <GameLiveItem/>
        </div>
      </Layous>
    </div>
  );
}

export default IndexPage
