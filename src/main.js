import { createApp } from 'vue/dist/vue.esm-bundler'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fab } from '@fortawesome/free-brands-svg-icons'
import App from './App.vue'
import router from './router/main'
import 'bulma/css/bulma.min.css'

library.add(fab)

const app = createApp(App)

app.use(router)

app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
