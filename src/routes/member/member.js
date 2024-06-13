import LoginView from "@/views/member/LoginView.vue";
import SignUpView from "@/views/member/SignUpView.vue";

export default [
    {
        path: "/",
        redirect: '/admin',
        meta:{requiresAuth:false}
    },
    {
        path: "/login",
        name: 'login',
        component: LoginView,
        meta:{requiresAuth:false}
    },
    {
        path: "/signup",
        name: 'signup',
        component: SignUpView,
        meta:{requiresAuth:false}
    },
    // {
    //     path: "/signup",
    //     name: 'signup',
    //     component: SignUpView
    // },
];