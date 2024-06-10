import Navbar from "@/components/layout/Navbar.vue";
import Overview from "@/views/page/OverView.vue";
import Calendar from "@/views/page/CalendarView.vue";

export default [
    {
        path: '/admin',
        component: Navbar,
        redirect: '/admin/overview',
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