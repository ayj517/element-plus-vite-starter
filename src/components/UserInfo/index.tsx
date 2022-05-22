import { FC, useState, useRef, useEffect } from 'react'
import styles from './index.less'
import * as Cookies from 'js-cookie';
import { Modal, Button, Form, message } from 'antd';

import { LoginForm, ProFormText, ProFormCaptcha, ProFormInstance } from '@ant-design/pro-form';
import { MobileOutlined, LockOutlined, CustomerServiceOutlined } from '@ant-design/icons';
import { sendSmsCode, getLogin, getAppHost } from '@/api'
import logo from '@/static/logo.jpg'

import QRCode from 'qrcode.react';

const UserInfo: FC = () => {
  const curUser = Cookies.get('tel')
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loginText, setLoginText] = useState(curUser ? `${curUser} | 退出` : '登录/注册')
  const [isLogin, setIsLogin] = useState(!!curUser)
  const [kfInfo, setKfInfo] = useState({
    kfImg: 'https://oss.11zb.com/app/kf11zb.jpeg',
    kfId: "kf11zb"
  })
  const formRef = useRef<any>(null);
  const loginAlert = useRef<any>(null)

  const checkLogin = () => {
    loginAlert.current && clearInterval(loginAlert.current)
    loginAlert.current = setInterval(() => {
      const showLogin = localStorage.getItem('showLogin')
      if (showLogin) {
        localStorage.removeItem('showLogin')
        setIsModalVisible(true)
        clearInterval(loginAlert.current)
      }
    }, 1000)
  }

  checkLogin()

  const showModal = () => {
    if (!isLogin) {
      setIsModalVisible(true);
    } else {
      Cookies.remove('tel')
      Cookies.remove('token')
      setIsLogin(false)
      setLoginText('登录/注册')
    }
  };

  // const appdow = () => {
  //   message.info('正在开发中...');
  // }

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    const fetchKF = async () => {
      const res = await getAppHost()
      const kfImg = res.data.kf_qr_code
      const kfId = res.data.kf_wx_id
      setKfInfo({ kfImg, kfId })
    }
    fetchKF()
  }, [])

  return <div className={styles.userInfoContainer}>
    <div className={styles.right_box}>
      <span className={styles.appDow} >
        <CustomerServiceOutlined style={{ fontSize: '16px', color: '#08c', paddingRight: '5px' }} />
        联系客服
        <div className={styles.code_er}>
          <img src={kfInfo.kfImg} />
          <p style={{ fontSize: '16px' }}>扫码联系客服: {kfInfo.kfId}</p>
        </div>
      </span>
      <span className={styles.appDow} >
        <MobileOutlined style={{ fontSize: '16px', color: '#08c', paddingRight: '5px' }} />
        下载APP
        <div className={styles.code_er}>
          <QRCode
            id="qrCode"
            value="https://www.jianshu.com/u/992656e8a8a6"
            size={200} // 二维码的大小
            fgColor="#000000" // 二维码的颜色
            style={{ margin: 'auto' }}
            imageSettings={{ // 二维码中间的logo图片
              src: logo,
              height: 40,
              width: 40,
              excavate: true, // 中间图片所在的位置是否镂空
            }}
          />
          <p>APP下载</p>
        </div>
      </span>
      <span className={styles.login} onClick={showModal} >
        {loginText}
      </span>
    </div>


    <Modal
      className='login-modal'
      title="手机验证码登录"
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
    >
      <LoginForm
        className="login-form"
        onFinish={
          async (values) => {
            const res = await getLogin(values)
            if (res.code === 0 && res.success) {
              const userInfo = res.data.user_info
              const access_token = res.data.access_token
              Cookies.set('tel', userInfo.mobile, { expires: 100 })
              Cookies.set('token', access_token, { expires: 100 })
              setLoginText(`${userInfo.mobile} | 退出`)
              setIsModalVisible(false)
              setIsLogin(true)
            } else {
              message.error(res.msg);
            }
          }
        }
        formRef={formRef}
      >
        <>
          <ProFormText
            fieldProps={{
              size: 'large',
              prefix: <MobileOutlined className={'prefixIcon'} />,
            }}
            name="mobile"
            placeholder={'手机号'}
            rules={[
              {
                required: true,
                message: '请输入手机号！',
              },
              {
                pattern: /^1\d{10}$/,
                message: '手机号格式错误！',
              },
            ]}
          />
          <ProFormCaptcha
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined className={'prefixIcon'} />,
            }}
            captchaProps={{
              size: 'large',
            }}
            placeholder={'请输入验证码'}
            captchaTextRender={(timing: any, count: any) => {
              if (timing) {
                return `${count} ${'获取验证码'}`;
              }
              return '获取验证码';
            }}
            name="captcha"
            rules={[
              {
                required: true,
                message: '请输入验证码！',
              },
            ]}
            onGetCaptcha={async (e) => {
              // 发送验证码
              const mobile = await formRef.current?.getFieldFormatValue('mobile')
              if (/^1[3456789]\d{9}$/.test(mobile)) {
                const res = await sendSmsCode({ mobile })
                message.success(res.data);
              } else {
                message.error('请输入正确手机号');
              }
            }}
          />
        </>
      </LoginForm>


    </Modal>
  </div>
}

export default UserInfo
