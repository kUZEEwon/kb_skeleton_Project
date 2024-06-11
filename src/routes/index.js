import { createWebHistory, createRouter } from "vue-router";

import member from "@/routes/member/member.js";
import page from "@/routes/page/page.js";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        ...member,
        ...page
    ]
});

export default router;