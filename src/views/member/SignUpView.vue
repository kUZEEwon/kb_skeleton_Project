<template lang="">
    <div>
        <h4 slot="header" class="card-title">Sign Up</h4>
    <form>
      <div class="row">
        <div class="col-md-12">
          <input type="text"
                    label="Username"
                    placeholder="Username"
                    :required="true"
                    v-model="user.username">
          </input>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <input type="text"
                    :required="true"
                    label="ID"
                    placeholder="ID"
                    v-model="user.id">
          </input>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <input type="password"
                    :required="true"
                    label="Password"
                    placeholder="Password"
                    autoComplete="off" 
                    v-model="user.password">
          </input>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <input type="text"
                    label="Email"
                    :required="true"
                    placeholder="Email"
                    v-model="user.email">
          </input>
        </div>
      </div>
      
      <br/>
      <div class="text-center">
        <button type="submit" class="btn btn-info btn-fill float-right" @click.prevent="signUp">
          Update Profile
        </button>
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
<style lang="">

</style>