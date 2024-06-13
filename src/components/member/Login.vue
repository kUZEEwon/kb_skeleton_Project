<template>
    <br/><br/>
    <h1>가계부</h1>
    <div class="user-info-container">
        <h1>Sign in</h1>
        <form @submit.prevent>
            <div class="input-group">
                <input class="inputVal" v-model.trim="id" type="text" placeholder="Enter your ID" />
            </div>
            <div class="input-group">
                <input class="inputVal" v-model.trim="password" autoComplete="off" type="password"
                    placeholder="Enter your PW" />
            </div>
            <div class="button-group">
                <button type="submit" @click="signIn">Sign in</button>
                <button @click="signUp">Sign Up</button>
            </div>
        </form>
    </div>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useCookies } from 'vue3-cookies';
import { useAccountStore } from '@/store/store.js';

const id = ref('')
const userStore = useAccountStore();
const password = ref('')
const { cookies } = useCookies();
const router = useRouter();
const signIn = async () => {
    const response = await axios.get('http://localhost:3001/users', { params: { "id": id.value, "password": password.value } })
    if (response.data[0].password == password.value) {
        cookies.set('id', id.value, { path: '/' });
        userStore.setUser({ "id": response.data[0].id, "email": response.data[0].email, "username": response.data[0].username })
        router.push('/admin');
    } else {
        alert("잘못된 비밀번호입니다.")
        id.value = ''
        password.value = ''
    }
}
const signUp = () => {
    router.push('/signUp')
}
</script>

<style scoped>
/* .inputVal {
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.413);
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    cursor: text;
    transition: border-color 0.25s;
}
 */

.user-info-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
}

h1 {
    text-align: center;
    margin-bottom: 20px;
}

.input-group {
    margin-bottom: 15px;
}

.input-group input {
    width: calc(100% - 10px);
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
}

.button-group {
    text-align: center;
    margin-top: 20px;
}

.button-group button {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    margin: 0 5px;
}

.button-group button:first-of-type {
    background-color: #007bff;
    color: white;
}

.button-group button:last-of-type {
    background-color: #28a745;
    color: white;
}
</style>