import Navbar from "@/components/layout/Navbar.vue";
import Overview from "@/views/page/OverView.vue";
import Calendar from "@/views/page/CalendarView.vue";
import About from "@/views/page/AboutView.vue";
import UserInfo from "@/views/page/UserInfoView.vue";

export default [
    {
        path: '/admin',
        component: Navbar,
        redirect: '/admin/overview',
        meta:{requiresAuth:true},
        children: [
            {
                path: 'overview',
                name: 'Overview',
                component: Overview
            },
            {
                path: "calendar",
                name: 'Calendar',
                component: Calendar
            },
            {
                path: "about",
                name: 'About',
                component: About
            },
            {
                path: "userInfo",
                name: 'UserInfo',
                component: UserInfo
            }
        ]
    }
];