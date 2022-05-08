import styles from './index.less';
import GameLiveItem from '@/components/gameLive/GameLiveItem'
import Layous from '@/components/layout/index'
import { useState,useEffect } from 'react';
import {getMatchLive} from '@/api/index'

const IndexPage = ()=> {
  const [liveList,setLiveList] = useState([])
  const [navTab,setNavTab] = useState(1)

  useEffect(() => {
    getList(navTab)
  },[]);

  const _type ={
    1:'推荐',
    2:'足球',
    3:'篮球',
  }

  const navTabFn =(nub:any)=>{
    setNavTab(nub)
    getList(nub)
  }

  const getList = async(id:any)=>{
    const liveData = {
      menu_id:id
    }
    const res  = await getMatchLive(liveData);
    console.log(res.data.matchLives,'res.data.matchLives')
    setLiveList(res.data.matchLives)
  }
  return (
    <div>
      <Layous curTab={navTab} tabFn={navTabFn}>
        <div className={styles.liveList}>
          <h1>{_type[navTab]}</h1>
         <GameLiveItem liveList={liveList}/>
        </div>
      </Layous>
    </div>
  );
}

export default IndexPage
