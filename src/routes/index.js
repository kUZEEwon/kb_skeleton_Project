import { createWebHistory, createRouter } from "vue-router";

import member from "@/routes/member/member.js";
import {getCookie} from "@/auth/AuthService.js";
import Main from "../views/Main.vue";
import page from "@/routes/page/page.js";
import { useAccountStore } from '@/store/store.js';
import axios from "axios";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        ...member,
        ...page
    ]
});
router.beforeEach( async (to, from, next) => {
    const userStore = useAccountStore();
    if (to.matched.some(record => record.meta.requiresAuth)) {
      // 인증이 필요한 페이지
      if (!getCookie()) { // 로그인되어 있지 않으면
        alert('로그인이 필요합니다');
        next('/login'); // 로그인 페이지로 리다이렉션
      } else {
        //쿠키가 있다면 pinia에 저장
        const response = await axios.get('http://localhost:3001/users', { params: { "id": getCookie()} })
        userStore.setUser({"id":response.data[0].id,"email":response.data[0].email,"username":response.data[0].username});
        next(); // 인증되었으면 계속 진행
      }
    } else {
      // 인증이 필요하지 않은 페이지
      next(); // 그냥 진행
    }
  });
export default router;