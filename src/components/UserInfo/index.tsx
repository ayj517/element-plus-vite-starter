import { FC, useState, useRef, useEffect } from 'react'
import styles from './index.less'
import * as Cookies from 'js-cookie';
import { Modal, Button, Form, message } from 'antd';

import { LoginForm, ProFormText, ProFormCaptcha, ProFormInstance } from '@ant-design/pro-form';
import { MobileOutlined, LockOutlined, } from '@ant-design/icons';
import { sendSmsCode, getLogin } from '@/api'

const UserInfo: FC = () => {
  const curUser = Cookies.get('tel')
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loginText, setLoginText] = useState(curUser ? `${curUser} | 退出` : '登录/注册')
  const [isLogin, setIsLogin] = useState(!!curUser)
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

  const appdow = () => {
    message.info('正在开发中...');
  }

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return <div className={styles.userInfoContainer}>
    <span className={styles.appDow} onClick={appdow} >
      下载APP
    </span>
    <span className={styles.login} onClick={showModal} >
      {loginText}
    </span>

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
            console.log('values', values);
            const res = await getLogin(values)
            console.log('🚀 ~ res', res)

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
