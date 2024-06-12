<template>
    <br/><br/>
    <div class="user-info-container">
        <h3>User Info</h3>

        <div class="input-group">
            <label for="userId">User Id</label>
            <input id="userId" v-model="uid" type="text" disabled>
        </div>
        <div class="input-group">
            <label for="userName">User Name</label>
            <input id="userName" v-model="username" type="text" :disabled="!updating">
        </div>
        <div class="input-group">
            <label for="userPassword">User Password</label>
            <input id="userPassword" v-model="upw" type="password" :disabled="!updating">
        </div>
        <div class="input-group">
            <label for="userEmail">User Email</label>
            <input id="userEmail" v-model="uemail" type="email" :disabled="!updating">
        </div>
        <div class="button-group">
            <button v-if="!updating" @click="setUpdate">Update</button>
            <button v-else @click="updateUserInfo">Save</button>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';

const uid = ref();
const upw = ref();
const uemail = ref();
const username = ref();

async function fetchData() {
    const id = $cookies.get('id');
    try {
        const response = await axios.get(`http://localhost:3001/users?id=${id}`);
        uid.value = response.data[0].id;
        upw.value = response.data[0].password;
        uemail.value = response.data[0].email;
        username.value = response.data[0].username;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

onMounted(async () => {
    console.log('onMounted');
    await fetchData();
})

async function updateUserInfo() {
    
    try {
        const response = await axios.put(`http://localhost:3001/users/${uid.value}`, {
            id: uid.value,
            username: username.value,
            password: upw.value,
            email: uemail.value
        });
        console.log("put");
    } catch (error) {
        console.error('Error fetching data:', error);
    }
    updating.value = false;
}

const updating = ref(false);

function setUpdate() {
    updating.value = !updating.value;
}

</script>


<style scoped>
.user-info-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
}

h3 {
    text-align: center;
    margin-bottom: 20px;
}

.input-group {
    margin-bottom: 15px;
}

.input-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
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