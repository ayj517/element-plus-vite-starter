import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
import type { RunTimeLayoutConfig } from 'umi';
import UserInfo from '@/components/UserInfo'
import { history } from 'umi';
import logo from '@/static/logo.jpg'

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * 登录校验在这里进行
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
}> {


  return {
    settings: {}
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState }) => {
  const currentUser = initialState?.currentUser;


  return {
    // headerContentRender: () => <HeaderContainer />,
    rightContentRender: () => <UserInfo />,
    disableContentMargin: false,
    // footerRender: () => <Footer />,
    onPageChange: () => {
      // 如果没有登录，重定向到 login
      // if (!initialState?.currentUser) login();

      // // 根目录重定向到默认页面, 需要根据项目路由配置修改
      // if (window.location.pathname === '/')
      //   history.push(`/project/${currentProject?.appKey}/scene`);
    },
    headerRender: <div>adsfasdfasdf</div>,
    logo: logo,
    ...initialState?.settings,
  };
};
