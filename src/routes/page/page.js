import Overview from "@/views/page/OverView.vue";
import Calendar from "@/views/page/CalendarView.vue";

export default [
    {
        path: '/',
        // component: DashboardLayout,
        redirect: '/admin/overview',
        meta:{requiresAuth:true}
    },
    {
        path: '/admin',
        // component: DashboardLayout,
        redirect: '/admin/overview',
        meta:{requiresAuth:true},
        children: [
            {
                path: 'overview',
                name: 'Overview',
                component: Overview
            },
            {
                path: "/admin/calendar",
                name: 'Calendar',
                component: Calendar
            },
        ]
    }
];