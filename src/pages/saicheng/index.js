

import Layout from '@/components/layout/index'
import { getMatchSchedule } from '@/api/index'

import React, { useState, useEffect } from 'react';
import { List, message, Avatar, Skeleton, Divider,Tabs } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
const { TabPane } = Tabs;

const InfiniteListExample = () => {
    const [navTab, setNavTab] = useState(0)

  const [pageNo, setPageNo] = useState(1);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);


  useEffect(() => {
    setData([])
    setPageNo(1)
    console.log(12312)
    loadMoreData();
  }, [navTab]);

  const loadMoreData = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const _data = {
        sport_id: navTab,
        type:'next',
        page:pageNo
    }
    console.log(pageNo)
    const res  =await getMatchSchedule(_data)
    
    setPageNo(pageNo+1)
    setData([...data, ...res.data]);
    setLoading(false);
  
    //   .then(res => res.json())
    //   .then(body => {
    //     console.log(body)
    //     // setPageNo(pageNo++)
    //     // setData([...data, ...body.results]);
    //     // setLoading(false);
    //   })
    //   .catch(() => {
    //     setLoading(false);
    //   });
  };



  function callback(key) {
    console.log(key);
    setNavTab(key-1)

  }


  return (
    <Layout>
    <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="热门" key="1">
        </TabPane>
        <TabPane tab="足球" key="2">
        </TabPane>
        <TabPane tab="篮球" key="3">
        </TabPane>
    </Tabs>
    <div
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
        hasMore={data.length < 50}
        hasChildren={data.length < 50}
        loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
        endMessage={<Divider plain>没有更多数据了... 🤐</Divider>}
        // scrollableTarget="scrollableDiv"
      >
        <List
          dataSource={data}
          renderItem={item => (
            <List.Item key={item.id}>
              <div>Content</div>
            </List.Item>
          )}
        />
      </InfiniteScroll>
    </div>
    </Layout>
  );
};

export default () => <InfiniteListExample />;