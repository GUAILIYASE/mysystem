import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import layout from '../views/layout/layout.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    name: 'layout',
    component: layout,
    children:[
      {
        path: '/',
        name: 'Home',
        component: Home,
        meta:{
          title:'首页'
        }
      },
      {
        path: '/imgupload',
        name: 'imgupload',
        component:  ()=>import('../views/layout/imgupload/imgupload.vue'),
        meta:{
          title:'图片上传'
        }
      },
      {
        path: '/label',
        name: 'label',
        component:  ()=>import('../views/layout/label/label.vue'),
        meta:{
          title:'标签页'
        }
      },
      {
        path: '/pagination',
        name: 'pagination',
        component:  ()=>import('../views/layout/pagination/pagination.vue'),
        meta:{
          title:'分页表格'
        }
      },
      {
        path: '/postArticle',
        name: 'postArticle',
        component:  ()=>import('../views/layout/postArticle/postArticle.vue'),
        meta:{
          title:' 发布文章'
        }
      },
      {
        path: '/havenPost',
        name: 'havenPost',
        component:  ()=>import('../views/layout/havenPost/havenPost.vue'),
        meta:{
          title:'已发布'
        }
      },
      {
        path: '/statisticsArticle',
        name: 'statisticsArticle',
        component:  ()=>import('../views/layout/statisticsArticle/statisticsArticle.vue'),
        meta:{
          title:'统计文章'
        }
      },
      {
        path: '/havenPost',
        name: 'edit',
        component:  ()=>import('../views/layout/edit/edit.vue'),
        meta:{
          title:'编辑文章'
        }
      },
      {
        path: '/havenPost',
        name: 'look',
        component:  ()=>import('../views/look/look.vue'),
        meta:{
          title:'查看文章'
        }
      },
      {
        path: '/exit',
        name: 'exit',
        component: ()=>import('../views/layout/exit/exit.vue'),
        meta:{
          title:'退出'
        }
      },

    ]

    
  },
  {
     path: '/login',
    name: 'login',
    meta:{
      title:'登录'
    },
    component: ()=>import('../views/login/login.vue'),
  },
  {
    path: '/register',
    name: 'register',
    meta:{
      title:'注册'
    },
    component: ()=>import('../views/register/register.vue'),
  },
  {
    path: '*',
    meta:{
      title:'404'
    },
    component: ()=>import('../views/404/404.vue'),
  }
 
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next)=>{
  document.title = to.meta.title
  if (to.path === '/login'||to.path ==='/register') {
    next()
  } else {
    if (localStorage.getItem('user')) {
      next()
    } else {
      next('/login')
    }
  }
})


export default router
