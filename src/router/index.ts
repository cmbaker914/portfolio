import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProjectsView from '../views/ProjectsView.vue'
import BlogView from '../views/BlogView.vue'
import PostView from '../views/PostView.vue'
import CVView from '../views/CVView.vue'
import { posts, site } from '../data/content.js'

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'home', component: HomeView, meta: { title: `${site.name} - Portfolio` } },
  { path: '/projects', name: 'projects', component: ProjectsView, meta: { title: 'Projects' } },
  { path: '/blog', name: 'blog', component: BlogView, meta: { title: 'Blog' } },
  { path: '/blog/:slug', name: 'post', component: PostView },
  { path: '/cv', name: 'cv', component: CVView, meta: { title: 'CV' } },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to) {
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  },
})

router.afterEach((to) => {
  const post = to.name === 'post' ? posts.find((p) => p.slug === String(to.params.slug)) : undefined
  document.title = post?.title ?? (to.meta.title as string | undefined) ?? site.name
})

export default router
