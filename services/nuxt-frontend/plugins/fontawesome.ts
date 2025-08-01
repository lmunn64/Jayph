import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { 
  faSnowflake,
  faUtensils,
  faGamepad,
  faBroom,
  faBook,
  faFan,
  faCoffee,
  faBaby,
  faTable,
  faBoxOpen,     
  faFire,
  faFireExtinguisher,
  faFirstAid,
  faCar,
  faDumbbell,
  faBlender,
  faTshirt,     
  faLaptop,
  faHotTub,
  faChair,
  faSwimmer,
  faTv,
  faWineGlass,
  faWifi,
  faChild,
  faPaw,
  faKey,
  faLightbulb,
  faSoap,
  faDoorClosed,
  faBolt,
  faCouch,
  faBed,
  faExclamationTriangle,
  faCheck,
  faPuzzlePiece, faBath, faStar, faStarHalf, faStarHalfStroke, faUser } from '@fortawesome/free-solid-svg-icons'

export default defineNuxtPlugin((nuxtApp) => {
  library.add(faStar, faStarHalf, faStarHalfStroke, faStar)
  library.add(faUser, faBed, faBath)
  library.add(faSnowflake, faUtensils, faGamepad, faBroom, faBook,
  faFan,
  faCoffee,
  faBaby,
  faTable,
  faBoxOpen,     
  faFire,
  faFireExtinguisher,
  faFirstAid,
  faCar,
  faDumbbell,
  faBlender,
  faTshirt,     
  faLaptop,
  faHotTub,
  faChair,
  faSwimmer,
  faTv,
  faWineGlass,
  faWifi,
  faChild,
  faPaw,
  faKey,
  faLightbulb,
  faSoap,
  faDoorClosed,
  faBolt,
  faCouch,
  faBed,
  faExclamationTriangle,
  faPuzzlePiece)
  nuxtApp.vueApp.component('FontAwesomeIcon', FontAwesomeIcon)
})