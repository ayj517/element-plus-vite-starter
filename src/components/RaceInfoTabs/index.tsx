import { FC } from 'react'
import { Tabs } from 'antd'
import styles from './index.less'

const { TabPane } = Tabs

const EmptyData = (props: any) => {
  const { description } = props

  return <div className={styles.emptyData}>
    <div className={styles.emptyBg}></div>
    <p>{description || "请下载 APP 查看..."}</p>
  </div>
}

const RaceInfoTabs: FC = () => {

  return <div className={styles.tabsContainer}>
    <Tabs tabBarStyle={{
      color: '#cf7221',
      background: '#fff',
      paddingLeft: '10px'
    }}>
      <TabPane tab="视频直播" key="1">
        <EmptyData />
      </TabPane>
      <TabPane tab="本场赛况" key="2">
        <EmptyData />
      </TabPane>
      <TabPane tab="数据分析" key="3">
        <EmptyData />
      </TabPane>
    </Tabs>
  </div>
}

export default RaceInfoTabs
