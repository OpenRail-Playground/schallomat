import { createApp } from 'vue'
import { createPinia } from 'pinia'
import OpenLayersMap from 'vue3-openlayers'

import App from './App.vue'
import router from './router'

// The style are only needed for some map controls.
// However, you can also style them by your own
import 'vue3-openlayers/styles.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(OpenLayersMap /*, options */)

app.mount('#app')
