<template>
  <br/><br/>
  <div class="user-info-container">
      <h4 slot="header" class="card-title">회원 가입</h4>
      <form>
          <div class="input-group">
              <input type="text" placeholder="Username" v-model="user.username" required>
          </div>
          <div class="input-group">
              <input type="text" placeholder="ID" v-model="user.id" required>
          </div>
          <div class="input-group">
              <input type="password" placeholder="Password" v-model="user.password" required autocomplete="off">
          </div>
          <div class="input-group">
              <input type="text" placeholder="Email" v-model="user.email" required>
          </div>
          
          <div class="button-group">
              <button type="submit" class="btn btn-info" @click.prevent="signUp">가입하기</button>
          </div>
          <div class="clearfix"></div>
      </form>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useCookies } from 'vue3-cookies';


const { cookies } = useCookies();
const router = useRouter();

const user = reactive({
    'id': '',
    'password': '',
    'email': '',
    'username': ''
})
const signUp = async () => {
    const users = await axios.get('http://localhost:3001/users', { params: { "id": user.id } })
    if (users.data.length > 0) {
        alert('존재하는 회원 입니다')
        user.id = ''
        return
    }
    const response = await axios.post('http://localhost:3001/users', { ...user })
    cookies.set('id', user.id);
    router.push('/');
}
</script>
<style scopped>
.user-info-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
}

.card-title {
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

.button-group .btn {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    background-color: #007bff;
    color: white;
}
</style>