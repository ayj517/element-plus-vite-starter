import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  layout: {
    name: 'logo',
    locale: false,
    layout: 'topmenu',
    logo: null,
  },
  routes: [
    {
      name: '直播',
      path: '/',
      component: '@/pages/index',
    },
    {
      name: '赛程',
      path: '/game',
      component: '@/pages/index',
    },
    {
      name: '活动',
      path: '/activity',
      component: '@/pages/index',
    },
  ],
  fastRefresh: {},
});
