<template>
    <br/><br/>
    <div class="calendar-container">
        <h3>Calendar</h3>
        <VDatePicker 
            expanded 
            v-model="date" 
            mode="date" 
            :attributes="attrs" 
            @dayclick="onDayClick()" 
        />

        <table v-if="selectDayData.transaction.length !== 0">
            <thead>
                <tr>
                    <th><input type="checkbox" value="all" v-model="allChecked" :disabled="updating"></th>
                    <th>Category</th>
                    <th>Cost</th>
                    <th>Income</th>
                    <th>Memo</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="data in selectDayData.transaction" :key="data.id">
                    <td><input type="checkbox" :id="data.id" :value="data.id" v-model="checked" :disabled="updating"></td>
                    <td v-if="checkId(data.id) && updating">
                        <select v-model="data.category">
                            <option v-for="category in data.income ? incomeCategory : expendCategory" :key="category">
                                {{ category }}
                            </option>
                        </select>
                    </td>
                    <td v-else>{{ data.category }}</td>
                    <td v-if="checkId(data.id) && updating">
                        <input type="number" v-model="data.cost">
                    </td>
                    <td v-else>{{ data.cost }}</td>
                    <td v-if="checkId(data.id) && updating">
                        <select v-model="data.income">
                            <option value="true">Income</option>
                            <option value="false">Expense</option>
                        </select>
                    </td>
                    <td v-else>{{ data.income ? 'Income' : 'Expense' }}</td>
                    <td v-if="checkId(data.id) && updating">
                        <input type="text" v-model="data.memo">
                    </td>
                    <td v-else>{{ data.memo }}</td>
                </tr>
                <tr>
                    <td colspan="5" class="button-group">
                        <button v-if="!updating" @click="setUpdate" :disabled="checked.length === 0">Update</button>
                        <button v-if="!updating" @click="deleteTransaction" :disabled="checked.length === 0">Delete</button>
                        <button v-else @click="updateTransaction">Save</button>
                        <button v-else @click="setUpdate">Cancel</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { onMounted, onBeforeUpdate, reactive, ref, computed, watch } from 'vue';
import axios from 'axios';

const transactionData = reactive({ transaction: [] });
const selectDayData = reactive({ transaction: [] });
const date = ref(new Date());

const attrs = reactive([]);

const checked = ref([]);

async function fetchData() {
    const uid = $cookies.get('id');
    try {
        const response = await axios.get(`http://localhost:3001/account?uid=${uid}`);
        const datas = response.data;
        datas.forEach(data => {
            transactionData.transaction.push(data);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

onMounted(async () => {
    console.log('onMounted');
    await fetchData();
    setAttrs();
    // console.log(transactionData.transaction);
})

onBeforeUpdate(() => {
    console.log('onUpdated');
    setAttrs();

    // 이전 선택 날짜 거래정보 초기화
    selectDayData.transaction.splice(0);
    // 현재 선택 날짜 거래정보 추가
    transactionData.transaction.filter(data => {
        if (data.date == selectedDate) {
            selectDayData.transaction.push(data);
        }
    });
})

watch(date, async () => {
    checked.value.splice(0);
    updating.value = false;
})

function deleteTransaction() {
    checked.value.forEach(async (id) => {
        // 일치하는 아이디의 인덱스 반환후 삭제
        const index = transactionData.transaction.findIndex((v) => v.id === id);
        transactionData.transaction.splice(index, 1);

        try {
            const response = await axios.delete(`http://localhost:3001/account/${id}`, { data: {} });
            console.log("deleted");
        } catch (error) {
            console.error('Error fetching data:', error);
            checked.value.splice(0);
        }
    }
    )
    checked.value.splice(0);
}

const updating = ref(false);
const expendCategory = ["식비", "교통비", "쇼핑", "의료비", "여행", "취미", "문화생활", "전자기기"];
const incomeCategory = ["용돈", "급여", "기타"];

function updateTransaction() {
    checked.value.forEach(async (id) => {
        // 일치하는 아이디의 인덱스 반환
        const index = transactionData.transaction.findIndex((v) => v.id === id);
        // console.log(transactionData.transaction[index]);

        try {
            const response = await axios.put(`http://localhost:3001/account/${id}`, transactionData.transaction[index]);
            console.log("put");
        } catch (error) {
            console.error('Error fetching data:', error);
            checked.value.splice(0);
        }
    }
    )
    checked.value.splice(0);
    updating.value = false;
}

function setUpdate() {
    updating.value = !updating.value;
}

function checkId(id) {
    return checked.value.includes(id);
}

let selectedDate = "";
function onDayClick() {
    selectedDate = date.value.getFullYear() + "-"
        + two(date.value.getMonth() + 1) + "-"
        + two(date.value.getDate());
}

function setAttrs() {
    const dates = [];
    transactionData.transaction.reduce((acc, cur) => {
        const date = acc.findIndex(item => item.date === cur.date);
        if (date === -1) {
            acc.push({ "date": cur.date });
            dates.push(cur.date);
        }
        return acc
    }, []);
    // console.log(dates);

    attrs.pop();
    attrs.push({
        dot: true,
        dates: dates
    })
}

const allChecked = computed({
    get: () => {
        return selectDayData.transaction.length === checked.value.length;
    },
    set: (e) => {
        checked.value = e ? selectDayData.transaction.map(item => item.id) : [];
    },
})

function two(n) {
    const str = String(n);
    return str.length < 2 ? "0" + str : str;
}

</script>

<style scoped>
.calendar-container {
    max-width: 600px;
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

table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}

thead {
    background-color: #007bff;
    color: white;
}

thead th {
    padding: 10px;
}

tbody td {
    padding: 10px;
    text-align: center;
    border: 1px solid #ccc;
}

.button-group {
    text-align: center;
    margin-top: 20px;
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