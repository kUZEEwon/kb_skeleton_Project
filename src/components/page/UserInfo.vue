<template>
    <div>
        <h3>User Info</h3>

        <div>
            <p>User Id</p>
            <input v-model="uid" type="text" disabled>
        </div>
        <div>
            <p>User Name</p>
            <input v-model="username" type="text" :disabled="!updating">
        </div>
        <div>
            <p>User Password</p>
            <input v-model="upw" type="password" :disabled="!updating">
        </div>
        <div>
            <p>User Email</p>
            <input v-model="uemail" type="email" :disabled="!updating">
        </div>
        <div>
            <button v-if="!updating" @click="setUpdate()">Update</button>
            <button v-else @click="updateUserInfo()">Save</button>
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

<style scoped></style>