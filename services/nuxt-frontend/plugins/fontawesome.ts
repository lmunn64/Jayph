import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faBath, faBed, faStar, faStarHalf, faStarHalfStroke, faUser } from '@fortawesome/free-solid-svg-icons'

export default defineNuxtPlugin((nuxtApp) => {
  library.add(faStar, faStarHalf, faStarHalfStroke, faStar)
  library.add(faUser, faBed, faBath)
  nuxtApp.vueApp.component('FontAwesomeIcon', FontAwesomeIcon)
})