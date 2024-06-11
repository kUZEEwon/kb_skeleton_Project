<template>
    <div>
        <h1>Sign in</h1>

        <p>
            <input class="inputVal" v-model.trim="id" type="text" placeholder="Enter your ID" />
        </p>
        <p>
            <input class="inputVal" v-model.trim="password" type="password" placeholder="Enter your PW" />
        </p>
        <p>
            <button @click=signIn()>Sign in</button>
            <button @click=signUp()>Sign Up</button>
        </p>
    </div>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useCookies } from 'vue3-cookies';


const id = ref('')
const password = ref('')
const { cookies } = useCookies();
const router = useRouter();
const signIn = async () => {
    const response = await axios.get('http://localhost:3001/users', { params: { "id": id.value, "password": password.value } })
    if (response.data[0].password == password.value) {
        cookies.set('id', id.value);
        router.push('/admin');
    } else {
        alert("잘못된 비밀번호입니다.")
        id.value = ''
        password.value = ''
    }
}
</script>

<style scoped>
.inputVal {
    border-radius: 8px;
    border: 1px solid transparent;
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    background-color: #1a1a1a;
    cursor: text;
    transition: border-color 0.25s;
}
</style>