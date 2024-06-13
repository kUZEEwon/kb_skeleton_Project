<template>
    <div>
        <button @click="logout">로그 아웃</button>
    </div>
</template>
<script setup>
import { deleteCookie } from "@/auth/AuthService.js";
import { useAccountStore } from '@/store/store.js';
import { useRouter } from "vue-router";

const router = useRouter();

const logout = () => {
    const accountStore = useAccountStore();
    deleteCookie();
    accountStore.clearUser();
    router.push('/login')

}
</script>
<style scoped>
button {
    background-color: #0073cf;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 5px 15px;
    font-size: 16px;
    cursor: pointer;
}

button:hover {
    background-color: #0c5db4;
}
</style>