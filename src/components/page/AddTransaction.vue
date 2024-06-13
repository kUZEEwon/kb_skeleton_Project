<template>
    <div class="user-info-container">
        <h3>내역 추가</h3>
        <div class="input-group">
            <label for="date">Date</label><br>
            <input id="date" class="inputVal" v-model.trim="date" type="date" placeholder="Enter the Date" />
        </div>
        <div class="input-group">
            <label for="cost">Cost</label><br>
            <input id="cost" class="inputVal" v-model.trim="cost" type="number" placeholder="Enter the Cost" />
        </div>
        <div class="input-group">
            <label for="category">Category</label><br>
            <select id="category" class="inputVal" v-model="category">
                <option value="" disabled selected>Choose</option>
                <option v-for="(category, index) in categorys" :key="index">{{ category }}</option>
            </select>
        </div>
        <div class="input-group">
            <label for="income">Income</label><br>
            <select id="income" class="inputVal" v-model="income">
                <option value="true">Income</option>
                <option value="false">Expense</option>
            </select>
        </div>
        <div class="input-group">
            <label for="memo">Memo</label><br>
            <textarea id="memo" v-model="memo" rows="3"></textarea>
        </div>
        <div class="button-group">
            <button @click="addTransaction()" :disabled="!checkVal">Create</button>
            <button @click="close()">Close</button>
        </div>
        <!-- {{ this.chartData }} -->
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "AddTransaction",
    props: {
        chartData: {
            type: Array,
            required: true
        }
    },
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
                    this.updateChartData();

                    this.updateTableData();

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

        },
        updateTableData() {
            let tableData = {
                category: this.category,
                cost: this.cost,  // 새로운 비용을 배열에 추가
                category_total: this.category_total + this.cost  // 기존 총 비용에 새 비용을 더함
            };

            this.$emit('update:tableData', tableData);

        }
    }
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
    font-size: 1.5em;
}

.input-group {
    margin-bottom: 15px;
}

.input-group label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
}

.input-group input[type="date"],
.input-group input[type="number"],
.input-group select,
.input-group textarea {
    width: 100%;
    padding: 8px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
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