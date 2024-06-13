<template>
    <div>
        <h3>거래내역 추가</h3>
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
        <p class="button-group">
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
    beforeUnmount() {
        // console.log("before Unmount");
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
p {
    height: 60px;
}
input {
    color: #222222;
    border: none;
    border-bottom: solid #aaaaaa 1px;
    position: relative;
    background: none;
    z-index: 5;
}

select {
    color: #222222;
    border: none;
    border-bottom: solid #aaaaaa 1px;
    position: relative;
    background: none;
    z-index: 5;
}

.button-group {
    text-align: center;
    margin-bottom: 0px;
    /* margin-top: 20px; */
}

.button-group button {
    padding: 10px 20px;
    margin: 5px;
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