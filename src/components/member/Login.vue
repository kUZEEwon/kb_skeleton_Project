<template>
    <div>
        <h1>Sign in</h1>

        <p>
            <input class="inputVal" v-model.trim="uid" type="text" placeholder="Enter your ID" />
        </p>
        <p>
            <input class="inputVal" v-model.trim="upw" type="password" placeholder="Enter your PW" />
        </p>
        <p>
            <button @click=signIn()>Sign in</button>
            <button @click=signUp()>Sign Up</button>
        </p>
    </div>
</template>

<script>

export default {
    name: "Login",
    data() {
        return {
            uid: "",
            upw: "",
        }
    },
    methods: {
        signUp() {
            alert("sign up")
            // this.$router.push({name: "signup"})
        },
        signIn() {
            alert("sign in")
            // axios.post("http://localhost:3000/signin/", {
            //     id: this.uid,
            //     pw: this.upw,
            // })
            //     .then((res) => {
            //         if (res.data.id === undefined){
            //             alert("Check your ID and password again");
            //             return;
            //         }

            //         alert(res.data.id);
            //         localStorage.setItem("login", JSON.stringify(res.data));

            //         this.$router.push({name: "bbslist"})
            //     })
            //     .catch((err) => {
            //         console.log(err);
            //     })
        }
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