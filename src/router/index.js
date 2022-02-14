import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/authfolder/Login.vue'
import Signup from '../views/authfolder/Signup.vue'
import CreatePlaylist from '../views/playlist/CreatePlaylist.vue'
import PlaylistDetail from '../views/playlist/PlaylistDetail.vue'
// router guard
import { projectAuth } from '../firebase/config'

const requireAuth = (to, from, next) => {
  let user = projectAuth.currentUser
  if(!user) {
    next({name: 'Login'})
  } else {
    next( )
  }
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: requireAuth
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/playlist/create',
    name: 'CreatePlaylist',
    component: CreatePlaylist,
    beforeEnter: requireAuth
  },
  {
    path: '/playlistdetail/:id',
    name: 'PlaylistDetail',
    component: PlaylistDetail,
    beforeEnter: requireAuth,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
