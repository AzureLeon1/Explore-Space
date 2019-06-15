import Vue from 'vue'
import Router from 'vue-router'
import cesiumContainer from '@/components/cesiumContainer'
import Population from '@/components/Population'
import EmSystem from '@/components/EmSystem'
import PlanetWithRing from '@/components/PlanetWithRing'
import University from '@/components/University'
import ImportExport from '@/components/ImportExport'
import Earth from '@/components/Earth'
import Solar from '@/components/Solar'
import Login from '@/views/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/earth',
      name: 'Earth',
      // component: cesiumContainer
      component: Earth
    },
    {
      path: '/population',
      name: 'Population',
      component: Population
    },
    {
      path: '/emSystem',
      name: 'EmSystem',
      component: EmSystem
    },
    {
      path: '/planetWithRing',
      name: 'PlanetWithRing',
      component: PlanetWithRing
    },
    {
      path: '/university',
      name: 'University',
      component: University
    },
    {
      path: '/importExport',
      name: 'ImportExport',
      component: ImportExport
    },
    {
      path: '/solar',
      name: 'Solar',
      component: Solar
    }
  ]
})
