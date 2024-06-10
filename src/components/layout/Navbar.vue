<template>
    <header>
        <div id="home"><router-link to="/admin">account book</router-link></div>
        <nav>
            <ul>
                <li><router-link to="/admin/about">About</router-link></li>
                <li><router-link to="/admin/calendar">Calendar</router-link></li>
            </ul>
        </nav>
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
</template>

<script>
export default {
    name: "Navbar",
    data() {
        return {
            balance: 0,
            isOpened: false
        }
    },
    methods: {
        toggleMenu() {
            this.isOpened = !this.isOpened
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

#brand a {
    color: coral;
}

.mobile-menu {
    display: none;
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