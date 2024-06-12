<template>
    <div>
        <header>
            <div id="home"><router-link to="/admin">account book</router-link></div>
            <nav>
                <ul>
                    <li><router-link to="/admin/about">About</router-link></li>
                    <li><router-link to="/admin/calendar">Calendar</router-link></li>
                </ul>
            </nav>


            <!-- <VDatePicker v-model="date" is-dark="system">
            <template #default="{ togglePopover }">
                <button class="px-3 py-2 bg-blue-500 text-sm text-white font-semibold rounded-md"
                    @click="togglePopover">
                    {{ date }}
                </button>
            </template>
</VDatePicker> -->

            <div>
                <p>잔액 : {{ currentBalance }}</p>
                <p>이전달 대비 지출: {{ expenseDifference }}</p>
            </div>

            <div id="hamburger-icon" :class="{ open: isOpened }" @click="toggleMenu">
                <div class="bar1"></div>
                <div class="bar2"></div>
                <div class="bar3"></div>
                <ul class="mobile-menu">
                    <li><router-link to="/admin/about">About</router-link></li>
                    <li><router-link to="/admin/calendar">Calendar</router-link></li>
                </ul>
            </div>
        </header>
        <div class="router-view">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useAccountStore } from '@/store/store.js';

export default {
    name: "Navbar",
    data() {
        return {
            month: 6,
            isOpened: false
        }
    },
    methods: {
        toggleMenu() {
            this.isOpened = !this.isOpened
        },
    },

    setup() {
        const date = ref(new Date());

        const accountStore = useAccountStore();

        // Pinia store에서 getter 가져오기
        const currentBalance = computed(() => accountStore.currentBalance);

        // Pinia store에서 state 값 가져오기
        const expenseDifference = computed(() => accountStore.expenseDifference);

        return {
            date,
            currentBalance,
            expenseDifference
        }
    }
}
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
}

body {
    background-color: darkgray;
    min-height: 0vh;
    place-items: start;
}

header {
    /* navbar 상단 고정 */
    position: fixed;
    top: 0;
    /* width: 100% */
    left: 0;
    right: 0;

    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    background-color: black;
    padding: 0 10px;
}

header a {
    text-decoration: none;
}

ul {
    display: flex;
    list-style: none;
    gap: 20px;
}

li a {
    color: white;
}

.router-view {
    padding-top: 50px;
}

#hamburger-icon {
    display: none;
    cursor: pointer;
}

#hamburger-icon div {
    width: 35px;
    height: 3px;
    background-color: white;
    margin: 6px 0;
}

.open .bar1 {
    transform: rotate(-45deg) translate(-6px, 7px);
}

.open .bar2 {
    opacity: 0;
}

.open .bar3 {
    transform: rotate(45deg) translate(-6px, -7px);
}

#home {
    font-size: 32px;
    font-weight: 700;
    color: white;
}

.mobile-menu {
    display: none;
}

p {
    color: aliceblue;
}

@media only screen and (max-width: 600px) {
    header nav {
        display: none;
    }

    #hamburger-icon {
        display: block;
    }
}
</style>