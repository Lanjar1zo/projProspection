import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import { IonicVue } from '@ionic/vue';
import { Capacitor } from '@capacitor/core';
import { JeepSqlite } from 'jeep-sqlite/dist/components/jeep-sqlite';
//import { defineCustomElements as pwaElements } from '@ionic/pwa-elements/loader';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* @import '@ionic/vue/css/palettes/dark.always.css'; */
/* @import '@ionic/vue/css/palettes/dark.class.css'; */
import '@ionic/vue/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import { DefaultApolloClient } from '@vue/apollo-composable';
import { apolloClient } from './Apollo/client';

//pwaElements(window);
customElements.define('jeep-sqlite', JeepSqlite);
const platform = Capacitor.getPlatform();

const app = createApp(App)
  .use(IonicVue)
  .use(router)
  .provide(DefaultApolloClient, apolloClient);

// Set the platform as global properties on the app
app.config.globalProperties.$platform = platform;

const mountApp = () => {
  router.isReady().then(() => {
    app.mount('#app');
  });
};

console.log(platform);

if (platform !== 'web') {
  mountApp();
} else {
  window.addEventListener('DOMContentLoaded', async () => {
    const jeepEl = document.createElement('jeep-sqlite');
    document.body.appendChild(jeepEl);
    customElements
      .whenDefined('jeep-sqlite')
      .then(() => {
        console.log('jeep-sqlite defined');
        console.log('Mounted');
        mountApp();
      })
      .catch((err) => {
        console.error('jeep-sqlite creation error:', err);
      });
  });
}
