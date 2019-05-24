import Vue from 'vue'
import Router from 'vue-router'
import cesiumContainer from '@/components/cesiumContainer'
import Population from '@/components/Population'

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
    }
  ]
})
