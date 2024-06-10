<template>
    <div>
        <!-- <p>balance : {{ balance }}</p> -->
         <p>User Name : {{ username }}</p>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "Home",
    data() {
        return {
            balance: 0,
            username: ""
        }
    },
    created() {
        axios.get("http://localhost:3001/users")
            .then((res) => {
                console.log(res.data.first_name);
                // this.members = res.data;
            })
            .catch((err) => {
                console.log(err);
            })
    },
}
</script>

<style lang="scss" scoped></style>