import Vue from 'vue'
import Router from 'vue-router'
import cesiumContainer from '@/components/cesiumContainer'
import Population from '@/components/Population'
import EmSystem from '@/components/EmSystem'
import PlanetWithRing from '@/components/PlanetWithRing'
import University from '@/components/University'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'cesiumContainer',
      component: cesiumContainer
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
    }
  ]
})
