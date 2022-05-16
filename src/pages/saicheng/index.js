

import Layout from '@/components/layout/index'
import { getMatchSchedule } from '@/api/index'

import React, { useState, useEffect } from 'react';
import { List, message, Avatar, Skeleton, Divider, Tabs, Button } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import styles from './index.less'

const { TabPane } = Tabs;

const InfiniteListExample = () => {
  const [navTab, setNavTab] = useState(0)

  const [pageNo, setPageNo] = useState(1);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
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
    console.log('🚀 ~ loadMoreData ~ res', res, res.data)

    if (res.data.length < 20) setHasMore(false)
    setPageNo(pageNo + 1)
    setData([...data, ...res.data]);
    setLoading(false);
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
      {data.length > 0 && <div
        id="scrollableDiv"
        style={{
          // height: document.documentElement.clientHeight - 77,
          overflow: 'auto',
          padding: '0 16px',
          border: '1px solid rgba(140, 140, 140, 0.35)',
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
            renderItem={item => (
              <List.Item key={item.id}>
                <ul className={styles.item_box}>
                  <li className={styles.item}>
                    <div className={styles.name}>NBA</div>
                    <div className={styles.contetn}>
                      <div className={styles.tiem}>2020/19/19</div>
                      <div className={styles.team_info}>
                        <div className={styles.l_team_box}>
                          <span className={styles.team_name}>东京</span>
                          < img src="https://cdn.sportnanoapi.com/basketball/team/dac366ad395d59f9e1f68b69c61bde83.png" alt="" />
                        </div>
                        <span className={styles.bifen}>9-9</span>
                        <div className={styles.r_team_box}>
                          < img src="https://cdn.sportnanoapi.com/basketball/team/dac366ad395d59f9e1f68b69c61bde83.png" alt="" />
                          <span className={styles.team_name}>北方</span>
                        </div>
                      </div>
                      <Button disabled type="primary">状态</Button>
                    </div>

                  </li>
                </ul>
              </List.Item>
            )}
          />
        </InfiniteScroll>
      </div>}
    </Layout>
  );
};

export default () => <InfiniteListExample />;
