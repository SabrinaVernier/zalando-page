import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

import { library } from '@fortawesome/fontawesome-svg-core'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faHeart, faUser } from '@fortawesome/free-regular-svg-icons'

import { faShoppingBag, faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons'

library.add(faHeart, faUser, faShoppingBag, faStar, faStarHalfAlt)

createApp(App).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
