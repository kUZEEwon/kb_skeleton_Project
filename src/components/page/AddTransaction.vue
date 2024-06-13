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
                <option value="" default disabled>선택</option>
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
            <button @click="addTransaction(); close(); sendNewData()" v-bind:disabled="!checkVal">Create</button>
            <button @click="close()">Close</button>
        </p>
        {{ this.chartData }}
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "AddTransaction",
    props: {
        chartData: {
            type: Array,
            // required: true
        }
    },
    data() {
        return {
            // newData: {
            //     "date": "",
            //     "cost": 0,
            //     "category": "",
            //     "income": false,
            //     "memo": "",
            // },
            date: "",
            cost: 0,
            category: "",
            income: false,
            memo: "",
            categorys: ["식비", "교통비", "쇼핑", "의료비", "여행", "취미", "문화생활", "전자기기"],
            checkVal: false,
        }
    },
    watch: {
        'date': function () {
            this.checkVal = this.checkValue();
        },
        'cost': function () {
            this.checkVal = this.checkValue();
        },
        'category': function () {
            this.checkVal = this.checkValue();
        },
    },
    methods: {
        close() {
            this.$emit('close');
        },
        sendNewData() {
            const id = this.$cookies.get('id');
            this.$emit('newData', {
                "uid": id,
                "date": this.date,
                "cost": this.cost,
                "category": this.category,
                "income": this.income,
                "memo": this.memo
            });
        },
        checkValue() {
            if (this.date != "" && this.category != "" && this.cost > 0) {
                return true;
            }
            return false;
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
                    // console.log(res.data);
                    this.updateChartData();
                })
                .catch((err) => {
                    console.log(err);
                })
        },
        updateChartData() {
            // let updatedData = [...this.chartData]
            // // console.log(updatedData)
            // if (!updatedData[this.category]) {
            //     updatedData.push({ "category": this.category, "value": this.cost })
            // } else {
            //     this.updatedData.map(item => {
            //         if (item.category === this.category) {
            //             item.value + this.cost
            //         }
            //     });
            // }
            let updatedData = { "category": this.category, "value": this.cost };

            this.$emit('update:chartData', updatedData);
        }
    }
}
</script>

<style scoped></style>