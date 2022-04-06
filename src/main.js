import { createApp } from "vue";
import App from "./App.vue";

/**
 * App Setup
 */
import store from './store'

const app = createApp(App).use(store, 'store');
app.mount("#app");
