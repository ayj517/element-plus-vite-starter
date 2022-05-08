import styles from './index.less';
import GameLiveItem from '@/components/gameLive/GameLiveItem'
import Layout from '@/components/layout/index'
import { useState, useEffect } from 'react';
import { getMatchLive } from '@/api/index'
import { Empty, Spin } from 'antd';
import { useLocation } from 'umi';

export type queryType = {
  typeId?: string;
};

const IndexPage = () => {
  const [liveList, setLiveList] = useState([])
  const [navTab, setNavTab] = useState(1)
  const [loding, setLoding] = useState(false)

  const location = useLocation() as unknown as { query: queryType };
  const query = location.query;
  const typeId = query.typeId || 1

  useEffect(() => {
    getList(typeId)
  }, [typeId]);

  const _type: any = {
    1: '推荐',
    2: '足球',
    3: '篮球',
  }

  // const navTabFn = (nub: any) => {
  //   setNavTab(nub)
  //   getList(nub)
  // }

  const getList = async (id: any) => {
    setLoding(true)
    // setLiveList([])
    const liveData = {
      menu_id: id
    }
    const res = await getMatchLive(liveData);
    setLoding(false)
    setLiveList(res.data.matchLives)
  }
  return (
    <div>
      <Layout>
        <div className={styles.liveList}>
          <h1>{_type[typeId]}</h1>
          {
            !loding && liveList.length > 0 ? <GameLiveItem liveList={liveList} /> : <Empty />
          }
        </div>
      </Layout >
    </div >
  );
}

export default IndexPage
