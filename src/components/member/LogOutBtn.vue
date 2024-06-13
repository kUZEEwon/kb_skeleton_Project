<template lang="">
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
    margin: 10px
}
</style>