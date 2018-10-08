import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/Workbench',
    name: 'Workbench',
    meta: { title: '工作台' },
    children: [{
      path: 'Workbench',
      meta: { title: '工作台', icon: 'workbench' },
      component: () => import('@/views/Workbench/Workbench.vue')
    }]
  },

  {
    path: '/Building',
    component: Layout,
    name: 'Building',
    meta: { title: '楼盘管理', icon: 'building1' },
    children: [
      {
        path: 'BuildingList',
        name: 'BuildingList',
        component: () => import('@/views/Building/building-list/building-list'),
        meta: { title: '楼盘列表'}
      },
      {
        path: 'BuildingTags',
        name: 'BuildingTags',
        component: () => import('@/views/Building/building-tags/building-tags'),
        meta: { title: '楼盘标签' }
      },
      /*{
        path: 'MoudelSort',
        name: 'MoudelSort',
        component: () => import('@/views/Building/moudel-sort/moudel-sort'),
        meta: { title: '板块排序'}
      },*/
      {
        path: 'ManageTeam',
        name: 'ManageTeam',
        component: () => import('@/views/Building/manage-team/manage-team'),
        meta: { title: '运营团队'}
      }
    ]
  },

  {
    path: '/Artist',
    component: Layout,
    meta: { title: '文章管理', icon: 'article1' },
    children: [
      {
        path: 'ArtistList',
        name: 'ArtistList',
        component: () => import('@/views/Artist/artist-list/artist-list'),
        meta: { title: '文章列表'}
      },
      {
        path: 'ArtistType',
        name: 'ArtistType',
        component: () => import('@/views/Artist/artist-type/artist-type'),
        meta: { title: '文章分类'}
      },
      {
        path: 'ArtistAdd',
        name: 'ArtistAdd',
        hidden:true,
        component: () => import('@/views/Artist/article-addoredit/article-addoredit'),
        meta: {title: '发布文章'}
      },
      {
        path: 'ArtistEdit',
        name: 'ArtistEdit',
        hidden:true,
        component: () => import('@/views/Artist/article-addoredit/article-addoredit'),
        meta: {title: '编辑文章'}
      },
      {
        path: 'ArtistView',
        name: 'ArtistView',
        hidden:true,
        component: () => import('@/views/Artist/article-view'),
        meta: {title: '文章详情'}
      }
    ]
  },
  {
    path: '/Order',
    component: Layout,
    children: [
      {
        path: 'Order',
        name: 'Order',
        component: () => import('@/views/Order/Order.vue'),
        meta: { title: '预约列表', icon: 'order1' }
      }
    ]
  },
  {
    path: '/Consumer',
    component: Layout,
    children: [
      {
        path: 'Consumer',
        name: 'Consumer',
        component: () => import('@/views/Consumer/Index.vue'),
        meta: { title: '客户管理', icon: 'customer1' }
      }
    ]
  },
  {
    path: '/Home',
    component: Layout,
    meta: { title: '首页管理', icon: 'first-page' },
    children: [
      {
        path: 'Index',
        name: 'Index',
        redirect: '/Home/Index/List',
        component: () => import('@/views/Home/Index/Index.vue'),
        meta: { title: '首页列表' },
        children: [
          {
            path: 'List',
            name: 'List',
            hidden: true,
            component: () => import('@/views/Home/Index/List/List.vue')
          },
          {
            path: 'CityEdit/:id',
            name: 'CityEdit',
            hidden: true,
            meta: { title: '城市编辑' },
            component: () => import('@/views/Home/Index/Edit/Edit.vue')
          },
          {
            path: 'NationEdit/:id',
            name: 'NationEdit',
            hidden: true,
            meta: { title: '全国编辑' },
            component: () => import('@/views/Home/Index/Edit/Edit.vue')
          }
        ]
      },
      {
        path: 'City',
        name: 'City',
        component: () => import('@/views/Home/City/City.vue'),
        meta: { title: '城市管理' }
      }
    ]
  },

  {
    path: '/System',
    component: Layout,
    name: 'System',
    redirect: '/System/User',
    meta: { title: '系统管理', icon: 'system' },
    children: [
      {
        path: 'User',
        component: () => import('@/views/System/User/User'),
        name: 'User',
        meta: {title: '用户管理'}
      },
      {
        path: 'Menu',
        component: () => import('@/views/System/Menu/Menu'),
        name: 'Menu',
        meta: {title: '菜单管理'}
      },
      {
        path: 'Role',
        component: () => import('@/views/System/Role/Role'),
        name: 'Role',
        meta: {title: '角色管理'}
      },
      {
        path: 'Disk',
        component: () => import('@/views/System/Disk/Disk'),
        name: 'Disk',
        meta: {title: '字典管理'}
      }
    ]
  },
  {
    path: '/Notice',
    component: Layout,
    redirect: '/Notice/AddNotic',
    children: [
      {
        path: 'Notice',
        name: 'Notice',
        component: () => import('@/views/Notice/Notice/Notice'),
        meta: { title: '公告管理', icon: 'announcement' }
      },
      {
        path: 'AddNotic',
        name: 'AddNotic',
        hidden:true,
        component: () => import('@/views/Notice/add-notic'),
        meta: {title: '新增公告', icon: 'link'}
      },
       {
        path: 'NoticEdit',
        name: 'NoticEdit',
        hidden:true,
        component: () => import('@/views/Notice/add-notic'),
        meta: {title: '公告编辑', icon: 'link'}
      }
//    {
//      path: 'NoticEdit/:id',
//      name: 'NoticEdit',
//      hidden:true,
//      component: () => import('@/views/Notice/notic-editor'),
//      meta: {title: '公告编辑', icon: 'link'}
//    }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
