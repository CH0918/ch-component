import { createApp } from 'vue';
import App from './App.vue';

import CIcon from '@ch/components/icon';

const plugins = [CIcon];
const app = createApp(App);
plugins.forEach((comp) => {
  app.use(comp);
});
app.mount('#app');
