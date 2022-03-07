import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/home/home.vue'),
  },
]

const router = new VueRouter({
  routes,
})

// // 路由导航守卫:也就是所有页面的导航都会经过这里
// // to: 要去的路由信息
// // from: 来自哪里的路由信息
// // next: 放行方法(符合通过条件可调用放行)
// router.beforeEach((to, from, next) => {
//   // 用户登录状态信息
//   let user = JSON.parse(window.localStorage.getItem('user'))
//   // 单位登录状态信息
//   // let unitUser = store.getters.getUnitToken
//   let userID = window.localStorage.getItem('memberID')
//   // console.log('unitToken', unitUser)
//   //   // 验证下单页面的登录状态
//   if (to.path == '/confirm') {
//     // if (to.meta.requiresAuth && user && userID) {
//     if (user && userID) {
//       next()
//     } else {
//       // // 没有登录信息,跳转到登陆页面
//       Toast.loading({
//         message: '请先登录,正在跳转到登录页面...',
//         forbidClick: true,
//         duration: 1000,
//       })

//       // 此路由需要授权，请检查是否已登录
//       // 如果没有，则重定向到登录页面
//       // return {
//       //   path: '/login',
//       //   // 保存我们所在的位置，以便以后再来
//       //   query: { redirect: to.fullPath },
//       // }
//       next('/login')
//     }
//   }
//   // 验证登录页面的登录状态
//   // if () {
//   //   if (unitUser) {
//   //     if (from.path == 'model') {
//   //       next({ path: '/confirm' })
//   //     }
//   //   } else {
//   //     // 没有登录信息,跳转到登陆页面
//   //     next()
//   //   }
//   // }

//   next()
// })

export default router
