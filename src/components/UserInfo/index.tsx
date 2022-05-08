import { FC, useState } from 'react'
import styles from './index.less'

import { Modal, Button, Form, message } from 'antd';

import { LoginForm, ProFormText, ProFormCaptcha } from '@ant-design/pro-form';
import { MobileOutlined, LockOutlined, } from '@ant-design/icons';
import type { CSSProperties } from 'react';


const UserInfo: FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const appdow = ()=>{
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
      登录/注册
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
            console.log(values);
            message.success('提交成功');
          }
        }
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
            onGetCaptcha={async () => {
              message.success('获取验证码成功！验证码为：1234');
            }}
          />
        </>
      </LoginForm>


    </Modal>
  </div>
}

export default UserInfo
