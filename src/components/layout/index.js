
import styles from './index.less'
import zuqiu from '@/static/zuqiu.png'
import zuqiu1 from '@/static/zuqiu1.png'
import lanqiu from '@/static/lanqiu.png'
import lanqiu1 from '@/static/lanqiu1.png'
import remen from '@/static/remen.png'
import remen1 from '@/static/remen1.png'
const Layouts = (props)=>{

    const navList =[
        {
            name:'推荐',
            icon:remen,
            iconCur:remen1,
            link:'/'
        },
        {
            name:'足球',
            icon:zuqiu,
            iconCur:zuqiu1,
            link:'/'
        }, {
            name:'篮球',
            icon:lanqiu,
            iconCur:lanqiu1,
            link:'/'
        },
    ]

    return(
        <div className={styles.content_box}>
            <div className={styles.left_nav}>
                <ul className={styles.navList}>
                    {
                        navList.map((item,index)=>{
                            return(
                                <li className={styles.nav_item} key={item.name}>
                                    <img src={item.icon} alt="" />
                                    <span>{item.name}</span>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
            <div className={styles.broadcast_box}>
                {props.children}
            </div>
        </div>
    )
}
export default Layouts