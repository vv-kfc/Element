import Vue from 'vue'
import VueRouter from 'vue-router'
import Element from '../components/Element'
import HelloWorld from '../components/HelloWorld'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'element',
    component: Element
  },
 

]

const router = new VueRouter({
  routes
})

export default router
