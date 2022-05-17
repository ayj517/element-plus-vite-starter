
import Layout from '@/components/layout/index'
import { getMatchSchedule } from '@/api/index'
import React, { useState, useEffect } from 'react';
import { List, message, Avatar, Skeleton, Divider, Tabs, Button,Empty, Spin  } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import styles from './index.less'
import dayjs from 'dayjs'
import { history } from 'umi';
import { LoadingOutlined } from '@ant-design/icons';
const antIcon = <LoadingOutlined style={{ fontSize: 38,color:'#FA6981' }} spin />;



const { TabPane } = Tabs;
const status = {
    3:'已结束',
    2:'进行中',
    1:'未开始', 
    4:'推迟'
}

const handleClick = (item) => {
    const { match_id, sport_id, ff_match_id } = item
    history.push(`/live?match_id=${match_id}&sport_id=${sport_id}&ff_match_id=${ff_match_id}`)
}

const InfiniteListExample = () => {
  const [navTab, setNavTab] = useState(0)

  const [pageNo, setPageNo] = useState(1);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(true)
  const [loding, setLoding] = useState(false)


  useEffect(() => {
    setLoding(true)

    loadMoreData();
  }, [navTab]);

  const loadMoreData = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const _data = {
      sport_id: navTab,
      type: 'next',
      page: pageNo
    }

    const res = await getMatchSchedule(_data)
    // console.log('🚀 ~ loadMoreData ~ res', res, res.data)

    if (res.data.length < 20) setHasMore(false)
    setPageNo(pageNo + 1)
    setData([...data, ...res.data]);
    setLoading(false);
    setLoding(false)

  };

  function callback(key) {
    setData([])
    setPageNo(1)
    setNavTab(key)

  }

  return (
    <Layout>
      <Tabs defaultActiveKey="0" onChange={callback}>
        <TabPane tab="热门" key="0">
        </TabPane>
        <TabPane tab="足球" key="1">
        </TabPane>
        <TabPane tab="篮球" key="2">
        </TabPane>
      </Tabs>
      <Spin spinning={loding} className="zzzzzzz" indicator={antIcon} >

      {data.length > 0 && <div
        id="scrollableDiv"
        style={{
          // height: document.documentElement.clientHeight - 77,
          overflow: 'auto',
        }}
      >
            <InfiniteScroll
            dataLength={data.length}
            next={loadMoreData}
            hasMore={hasMore}
            loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
            endMessage={<Divider plain>没有更多数据了... 🤐</Divider>}
            // scrollableTarget="scrollableDiv"
            >
            <List
                dataSource={data}
                className={styles.item_box}
                renderItem={item => (
                <List.Item key={item.id} className={styles.item} onClick={() => handleClick(item)}>
                        <div className={styles.name}>{item.sport_id==1?'足球':'篮球'}-{item.alias_name}</div>
                        <div className={styles.contetn}>
                        <div className={styles.tiem}>{dayjs(item.match_date).format('YYYY-MM-DD HH:mm')}</div>
                        <div className={styles.team_info}>
                            <div className={styles.l_team_box}>
                            <span className={styles.team_name}>{item.home_name}</span>
                            < img src={item.home_logo} alt="" />
                            </div>
                            <span className={styles.bifen}>{item.home_score}-{item.away_score}</span>
                            <div className={styles.r_team_box}>
                            < img src={item.away_logo} alt="" />
                            <span className={styles.team_name}>{item.away_name}</span>
                            </div>
                        </div>
                        {/* <!-- match_status 3已结束 2进行中 1 未开始 4推迟 --> */}
                        <Button disabled={item.match_status===2?false:true}   type={item.match_status!=2?'dashed':'primary'}>{status[item.match_status]}</Button>
                        </div>
                </List.Item>
                )}
            />
            </InfiniteScroll>
      </div>
      
      }
          </Spin>

    </Layout>
  );
};

export default () => <InfiniteListExample />;
