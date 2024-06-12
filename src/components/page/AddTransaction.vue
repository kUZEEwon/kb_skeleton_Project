<template>
    <div>
        <h3>Modal</h3>
        <p>
            Date <br>
            <input class="inputVal" v-model.trim="date" type="date" placeholder="Enter your First Name" />
        </p>
        <p>
            Cost <br>
            <input class="inputVal" v-model.trim="cost" type="number" placeholder="Enter your Last Name" />
        </p>
        <p>
            Category <br>
            <select class="inputVal" v-model="category">
                <option v-for="category in categorys" :key="category.index">
                    {{ category }}
                </option>
            </select>
        </p>
        <p>
            Income <br>
            <select class="inputVal" v-model="income">
                <option value="true">수입</option>
                <option value="false">지출</option>
            </select>
        </p>
        <p>
            Memo <br>
            <textarea v-model="memo" cols="30" rows="1"></textarea>
        </p>
        <p>
            <button @click="addTransaction()">Create</button>
            <button @click="$emit('close', false)">Close</button>
        </p>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "AddTransaction",
    data() {
        return {
            date: "",
            cost: 0,
            category: "",
            income: false,
            memo: "",
            categorys: ["식비", "교통비", "쇼핑", "의료비", "여행", "취미", "문화생활", "전자기기"]
        }
    },
    methods: {
        close() {
            this.$emit('close');
        },
        addTransaction() {
            const id = this.$cookies.get('id');

            axios.post(`http://localhost:3001/account/`, {
                "uid": id,
                "date": this.date,
                "cost": this.cost,
                "category": this.category,
                "income": this.income,
                "memo": this.memo
            })
                .then((res) => {
                    console.log(res.data);
                })
                .catch((err) => {
                    console.log(err);
                })
        },
    }
}
</script>

<style scoped></style>