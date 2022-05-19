import styles from './index.less';
import GameLiveItem from '@/components/gameLive/GameLiveItem'
import Layout from '@/components/layout/index'
import { useState, useEffect } from 'react';
import { getMatchLive } from '@/api/index'
import { Empty, Spin ,Alert} from 'antd';
import { useLocation } from 'umi';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: 38,color:'#FA6981' }} spin />;

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
    console.log('vision--1.0.0')
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
      {/* <Alert message="因第三方网络波动问题影响，目前直播无法正常播放，我们正在积极处理中，请稍后重试" type="error" /> */}

        <div className={styles.liveList}>
          <h1>{_type[typeId]}</h1>
          <Spin spinning={loding} indicator={antIcon} >
          {
            liveList.length > 0 ? <GameLiveItem liveList={liveList} /> : <Empty />
          }
          </Spin>
        </div>
      </Layout >
    </div >
  );
}

export default IndexPage
