import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProjectsView from '../views/ProjectsView.vue'
import BlogView from '../views/BlogView.vue'
import PostView from '../views/PostView.vue'
import CVView from '../views/CVView.vue'

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/projects', name: 'projects', component: ProjectsView },
  { path: '/blog', name: 'blog', component: BlogView },
  { path: '/blog/:slug', name: 'post', component: PostView },
  { path: '/cv', name: 'cv', component: CVView },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to) {
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  },
})

export default router
