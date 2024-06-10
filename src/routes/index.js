import { createWebHistory, createRouter } from "vue-router";

import member from "@/routes/member/member.js";
import {getCookie} from "@/auth/AuthService.js";
import Main from "../views/Main.vue";
const router = createRouter({
    history: createWebHistory(),
    routes: [
        ...member,
        {
            path:'/',
            name: 'main',
            component: Main,
            meta:{requiresAuth:true}
        }
    ]
});
router.beforeEach((to, from, next) => {
    console.log(getCookie())
    if (to.matched.some(record => record.meta.requiresAuth)) {
      // 인증이 필요한 페이지
      if (!getCookie()) { // 로그인되어 있지 않으면
        next('/login'); // 로그인 페이지로 리다이렉션
      } else {
        next(); // 인증되었으면 계속 진행
      }
    } else {
      // 인증이 필요하지 않은 페이지
      next(); // 그냥 진행
    }
  });
export default router;