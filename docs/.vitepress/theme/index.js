import DefaultTheme from 'vitepress/theme';
import CustomLayout from './components/customLayout.vue';
import './style/vars.less';
import './style/reset.less';

export default {
  ...DefaultTheme,
  Layout: CustomLayout,
};
