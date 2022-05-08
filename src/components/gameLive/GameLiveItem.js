
import styles from './index.less'
import { Row, Col } from 'antd';
import playImg from '@/static/play.png'
import play_icon from '@/static/play_icon.png'
import hot from '@/static/hot.png'
import { history } from 'umi';

const GameLiveitem = (props) => {
  const { liveList } = props

  const handleClick = (item) => {
    const { match_id, sport_id, ff_match_id } = item
    history.push(`/live?match_id=${match_id}&sport_id=${sport_id}&ff_match_id=${ff_match_id}`)
  }

  return <Row className={styles.liveItemBox} gutter={[16, 16]}>
    {
      liveList.map((item, index) => {
        return (
          <Col xl={6} key={item._id}>
            <div className={styles.itemBox}>
              <div className={styles.img_top} onClick={() => handleClick(item)}>
                <div className={styles.imgBox}>
                  <img className={styles.img} src={item.screenshot_url} alt="" />
                  <img className={styles.play_img} src={playImg} alt="" />
                </div>
                <div className={styles.play_status}>
                  <img className={styles.status_icon} src={play_icon} alt="" />
                  <span>直播中</span>
                </div>
              </div>
              <div className={styles.bottomContent}>
                <span>{item.alias_name} {item.home_name + ' VS ' + item.away_name}</span>
                <div className={styles.hot_box}>
                  <img src={hot} alt="" />
                  <span>{item.hots}万</span>
                </div>
              </div>
            </div>
          </Col>
        )
      })
    }

  </Row>
}

export default GameLiveitem
