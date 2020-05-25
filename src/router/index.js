import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/install',
    component: () => import('@/views/install/index'),
    hidden: true
  },
  {
    path: '/resetPassword',
    component: () => import('@/views/resetpwd/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: {title: 'Dashboard', icon: 'dashboard'}
    }]
  },
  {
    path: '/misc',
    component: Layout,
    redirect: '/misc/table',
    name: 'Misc',
    meta: {title: 'Misc', icon: 'example'},
    children: [
      {
        path: '/phototable',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: {title: 'Photo', icon: 'table'}
      },
      { path: '/linktable',
        component:()=> import('@/views/link/complexTable'),
        name: 'LinkTable',
        meta: { title: 'LinkTable', icon: 'table' }},
      { path: '/optiontable',
        component:()=> import('@/views/configoption/complexTable'),
        name: 'OptionTable',
        meta: { title: 'OptionTable' , icon: 'table'}}
    ]
  },
  {
    path: '/edit',
    component: Layout,
    redirect: '/views/edit/postedit',
    name: 'edit',
    meta: {title: 'edit', icon: 'example'},
    children: [
      {
        path: 'index',
        name: 'Table',
        component: () => import('@/views/edit/index'),
        meta: {title: 'Postedit', icon: 'table'}
      }
    ]
  },
  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: {title: 'ME', icon: 'form'}
      }
    ]
  },
  {
    path: '/tag',
    component: Layout,
    redirect: '/views/tag/complex-table',
    name: 'tag',
    meta: {
      title: 'Tag&Category',
      icon: 'form'
    },
    children: [
      {
        path: '/tag/table',
        component: () => import('@/views/tag/index'),
        redirect: '/views/tag/complex-table',
        name: 'tagTable',
        meta: {
          title: 'Tables',
          icon: 'table'
        },
        children: [
         { path: '/Tag/complex-table',
            component:()=> import('@/views/tag/complexTable'),
            name: 'TagTable',
            meta: { title: 'TagTable' }},
          { path: '/Category/complex-table',
            component:()=> import('@/views/category/complexTable'),
            name: 'CategoryTable',
            meta: { title: 'CategoryTable' }}
        ]
      }
    ]
  },
  {
    path: '/post',
    component: Layout,
    redirect: '/views/post/complex-table',
    name: 'post',
    meta: {
      title: 'Post',
      icon: 'form'
    },
    children: [
      {
        path: '/post/table',
        component: () => import('@/views/post/index'),
        redirect: '/views/post/complex-table',
        name: 'postTable',
        meta: {
          title: 'Tables',
          icon: 'table'
        },
        children: [
          { path: 'complex-table',
            component:()=> import('@/views/post/complexTable'),
            name: 'complexTable',
            meta: { title: 'PostTable' }},
          { path: '/comment/complex-table',
            component:()=> import('@/views/comment/complexTable'),
            name: 'complexTable',
            meta: { title: 'CommentTable' }}
        ]
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://github.com/PeiYunluo',
        meta: {title: 'GITHUB', icon: 'link'}
      }
    ]
  },
  // 404 page must be placed at the end !!!
  {path: '*', redirect: '/404', hidden: true}
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({y: 0}),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
