<template>
    <div>
        <h3>Calendar</h3>
        <VDatePicker expanded v-model="date" mode="date" :attributes='attrs' @dayclick="onDayClick()" />

        <table v-if="selectDayData.transaction.length !== 0">
            <thead>
                <th><input type="checkbox" value="all" v-model="allChecked"></th>
                <th>category</th>
                <th>cost</th>
                <th>income</th>
                <th>memo</th>
            </thead>
            <tbody>
                <tr v-for="data in selectDayData.transaction" :key="data.id">
                    <td><input type="checkbox" :id="data.id" :value="data.id" v-model="checked" :key="data.id"></td>
                    <td>{{ data.category }}</td>
                    <td>{{ data.cost }}</td>
                    <td>{{ data.income }}</td>
                    <td>{{ data.memo }}</td>
                </tr>
            </tbody>
        </table>

        <div v-if="checked.length !== 0">
            <button @click="">Update</button>
            <button @click="deleteTransaction()">Delete</button>
        </div>
    </div>
</template>

<script setup>
import { onMounted, onBeforeUpdate, reactive, ref, computed } from 'vue';
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

function deleteTransaction() {
    checked.value.forEach(async (id) => {
        // 거래내역 아이디 중 일치하는게 있나 확인
        if (transactionData.transaction.map(v => v.id).includes(id)) {
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
    })
    checked.value.splice(0);
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

<style lang="scss" scoped></style>