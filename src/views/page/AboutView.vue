<template>
    <div class="calendar-container">
        <button @click="prevMonth">〈</button>
        <span>{{ formattedDate }}</span>
        <button @click="nextMonth">〉</button>
    </div>
    <section>
        <div class="tbl-header">
            <table>
                <thead>
                    <tr>
                        <th style="color: blue;">날짜</th>
                        <th style="color: blue;">카테고리</th>
                        <th style="color: blue;">메모</th>
                        <th style="color: blue;">수입</th>
                    </tr>
                </thead>
            </table>
        </div>
        <div class="tbl-content">
            <table cellpadding="0" cellspacing="0" border="0">
                <tbody>
                    <tr v-for="data in filteredIncome" :key="data.id">
                        <td>{{ new Date(data.date).getDate() }}일</td>
                        <td>{{ data.category }}</td>
                        <td>{{ data.memo }}</td>
                        <td>{{ data.cost }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>

    <section>
        <!--for demo wrap-->
        <select v-model="selectedCategory">
            <option value="">전체</option> <!-- 전체 옵션 -->
            <option v-for="category in categories" :key="category.id" :value="category.name">
                {{ category.name }}
            </option>
        </select>
        <div class="tbl-header">
            <table>
                <thead>
                    <tr>
                        <th style="color: red;">날짜</th>
                        <th style="color: red;">카테고리</th>
                        <th style="color: red;">메모</th>
                        <th style="color: red;">지출</th>
                    </tr>
                </thead>
            </table>
        </div>
        <div class="tbl-content">
            <table cellpadding="0" cellspacing="0" border="0">
                <tbody>
                    <tr v-for="data in filteredOutcome" :key="data.id">
                        <td>{{ new Date(data.date).getDate() }}일</td>
                        <td>{{ data.category }}</td>
                        <td>{{ data.memo }}</td>
                        <td>{{ data.cost }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { getCookie } from '../../auth/AuthService';
import axios from 'axios';

const income = ref([])
const outcome = ref([])
const selectedCategory = ref('');
const categories = ref([
    { id: 1, name: '식비' },
    { id: 2, name: '교통비' },
    { id: 3, name: '쇼핑' },
    { id: 4, name: '취미' },
    { id: 5, name: '여행' },
    { id: 6, name: '전자기기' },
    { id: 6, name: '문화생활' }
]);
const currentDate = ref(new Date());

// 이전 월로 이동하는 함수
const prevMonth = () => {
    currentDate.value = new Date(currentDate.value.setMonth(currentDate.value.getMonth() - 1));
};

// 다음 월로 이동하는 함수
const nextMonth = () => {
    currentDate.value = new Date(currentDate.value.setMonth(currentDate.value.getMonth() + 1));
};
// 현재 날짜를 형식에 맞게 표시하는 함수
const formattedDate = computed(() => {
    const options = { year: 'numeric', month: 'long' };
    return currentDate.value.toLocaleDateString('ko-KR', options);

});
onMounted(async () => {
    try {
        const response = await axios.get('http://localhost:3001/account', { params: { "uid": getCookie() } });
        income.value = response.data.filter(item => item.income).sort((a, b) => new Date(b.date) - new Date(a.date))
        outcome.value = response.data.filter(item => !item.income).sort((a, b) => new Date(b.date) - new Date(a.date))
    } catch (error) {
        console.error('데이터 가져오기 오류:', error);
    }
});

/* 날짜별 filter*/
const filteredIncome = computed(() => {
    return income.value.filter(item => {
        const date = new Date(item.date);
        return date.getMonth() + 1 == currentDate.value.getMonth() + 1
    });

});

/* 날짜, 카테고리별 Filter*/
const filteredOutcome = computed(() => {
    if (!selectedCategory.value) {
        return outcome.value.filter(item => {
            const date = new Date(item.date);
            return date.getMonth() + 1 == currentDate.value.getMonth() + 1
        }); // 전체 카테고리일 경우 모든 데이터 표시
    } else {
        return outcome.value.filter(item => {
            const date = new Date(item.date);
            console.log('date= ', date.getMonth())
            console.log('current= ', currentDate.value.getMonth())
            return item.category === selectedCategory.value && date.getMonth() + 1 == currentDate.value.getMonth() + 1
        });
    }
});
</script>

<style scoped>
h1 {
    font-size: 30px;
    color: #fff;
    text-transform: uppercase;
    font-weight: 300;
    text-align: center;
    margin-bottom: 15px;
}

table {
    width: 100%;
    table-layout: fixed;
}

.tbl-header {
    background-color: rgba(255, 255, 255, 0.3);
}

.tbl-content {
    height: 300px;
    overflow-x: auto;
    margin-top: 0px;
    border: 1px solid rgba(255, 255, 255, 0.3);
}

th {
    padding: 20px 15px;
    text-align: left;
    font-weight: 500;
    font-size: 12px;
    border: none;
    text-transform: uppercase;
}

td {
    padding: 15px;
    text-align: left;
    vertical-align: middle;
    font-weight: 300;
    font-size: 12px;
    border-bottom: solid 1px rgba(255, 255, 255, 0.1);
}

section {
    margin: 50px;
}

.calendar-container {
    display: flex;
    align-items: center;
    justify-content: center;

    /* 배경 색상 */
    padding: 10px;
    border-radius: 10px;
    color: aaa;
    /* 텍스트 색상 */
    font-size: 20px;
}

button {
    background: none;
    border: none;
    color: #aaa;
    /* 버튼 텍스트 색상 */
    font-size: 24px;
    cursor: pointer;
    margin: 0 20px;
    /* 버튼 간격 */
}

button:hover {
    color: #aaaaaa88;
    /* 버튼 호버 색상 */
}
</style>