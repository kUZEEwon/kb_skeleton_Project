<template>

    <br />
    <div>
        <div class="calendar-container">
            <button @click="changeMonth(-1)">〈</button>
            <span>{{ formattedDate }}</span>
            <button @click="changeMonth(1)">〉</button>
        </div>

        <!-- 내역 추가 버튼을 이 부분에 배치 -->
        <div class="add-transaction-button">
            <button @click="modalOpen">
                내역 추가
            </button>
        </div>
        <br />

        <div class="modal-wrap" v-show="modalCheck">
            <div class="modal-container">
                <AddTransaction @close="modalOpen" @update:chartData="updateChartData"
                    @update:tableData="updateTableData" />
            </div>
        </div>

        <div>
            <PieChart v-if="categoryData.length > 0" :chartData="categoryData" />
            <br /><br />
            <TransactionTable :data="category" :total_expend="totalExpenditure" />
        </div>
    </div>

</template>


<script>
import axios from 'axios';
import PieChart from '@/components/PieChart.vue';
import TransactionTable from '@/components/TransactionTable.vue';
import AddTransaction from '@/components/page/AddTransaction.vue';
import { useAccountStore } from '@/store/store.js';

export default {
    name: 'HomeView',
    components: {
        PieChart,
        TransactionTable,
        AddTransaction,
    },
    data() {
        return {
            currentYear: new Date().getFullYear(),
            currentMonth: new Date().getMonth() + 1,
            categoryData: [],
            transactionData: [],
            category: [],
            items: [],
            modalCheck: false,
            intervalId: null
        };
    },
    computed: {
        prevMonthLabel() {
            return (this.currentMonth === 1 ? 12 : this.currentMonth - 1) + "월";
        },
        nextMonthLabel() {
            return (this.currentMonth === 12 ? 1 : this.currentMonth + 1) + "월";
        },
        formattedDate() {
            const options = { year: 'numeric', month: 'long' };
            return new Date(this.currentYear, this.currentMonth - 1).toLocaleDateString('ko-KR', options);
        }
        ,
        totalExpenditure() {
            return this.calc(this.category);
        }
    },

    watch: {
        currentYear: 'fetchData',
        currentMonth: 'fetchData'
    },
    
        mounted() {
            this.fetchData();

        },
        methods: {
            async fetchData() {
                try {
                    const response = await axios.get('http://localhost:3001/account');
                    const cookieId = this.$cookies.get('id');
                    const data = response.data.filter(item => item.uid == cookieId);


                    // 이번 달 데이터 필터링
                    const filteredData = data.filter(item => {
                        const date = new Date(item.date);
                        return date.getFullYear() === this.currentYear && date.getMonth() + 1 === this.currentMonth;
                    });

                    // 이전 달 데이터 필터링
                    const previousMonth = this.currentMonth === 1 ? 12 : this.currentMonth - 1;
                    const previousYear = this.currentMonth === 1 ? this.currentYear - 1 : this.currentYear;
                    const filteredPrevMonthData = data.filter(item => {
                        const date = new Date(item.date);
                        return date.getFullYear() === previousYear && date.getMonth() + 1 === previousMonth;
                    });

                    this.transactionData = filteredData;
                    this.items = data;

                    // store의 fetchData 액션 호출
                    await useAccountStore().fetchData(filteredData, filteredPrevMonthData);
                    useAccountStore().setItems(data);

                    // piechart
                    this.updateCategoryData(filteredData);
                    // table
                    this.category = this.reduceByCategory(filteredData);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            },
            updateCategoryData(data) {
                const categories = {};
                data.forEach(item => {
                    if (!item.income) {
                        if (!categories[item.category]) {
                            categories[item.category] = 0;
                        }
                        categories[item.category] += item.cost;
                    }
                });
                this.categoryData = Object.keys(categories).map(key => ({ category: key, value: categories[key] }));
            },
            changeYear(offset) {
                this.currentYear += offset;
            },
            changeMonth(offset) {
                this.currentMonth += offset;
                if (this.currentMonth > 12) {
                    this.currentMonth = 1;
                    this.changeYear(1);
                } else if (this.currentMonth < 1) {
                    this.currentMonth = 12;
                    this.changeYear(-1);
                }
            },
            reduceByCategory(d) {
                const res = d.reduce((acc, cur) => {
                    if (!cur.income) {
                        const categoryIndex = acc.findIndex(item => item.category === cur.category);
                        if (categoryIndex === -1) {
                            acc.push({ category: cur.category, cost: [cur.cost], category_total: cur.cost });
                        } else {
                            acc[categoryIndex].cost.push(cur.cost);
                            acc[categoryIndex].category_total += cur.cost;
                        }
                    }
                    return acc;
                }, []);

                return res;
            },
            calc(s) {
                const res = s.reduce((acc, cur) => {
                    return acc + cur.category_total;
                }, 0);
                return res
            },
            addTransaction() {
                this.modalcheck = true;
            },
            modalOpen() {
                this.modalCheck = !this.modalCheck
            },
            updateChartData(updatedData) {
                console.log("들어온값: " + updatedData)
                let found = false;
                this.categoryData.forEach(item => {
                    if (item.category == updatedData.category) {
                        item.value += updatedData.value;
                        found = true;
                    }
                });
                if (!found) {
                    this.categoryData.push(updatedData)
                }

                console.log("최종값: " + this.categoryData)
            },
            updateTableData(newData) {
                console.log("table data input : ", newData);
                // 이미 존재하는 카테고리인지 확인하여 업데이트 또는 추가
                let found = false;
                this.category.forEach(item => {
                    if (item.category == newData.category) {
                        item.cost.push(newData.cost);
                        item.category_total += newData.cost;
                        found = true;
                    }
                });

                if (!found) {
                    this.category.push({
                        category: newData.category,
                        cost: [newData.cost],
                        category_total: newData.cost
                    });
                }

                console.log("Updated category data: ", this.category);
                this.$emit('updateTableData', this.category); // 이벤트 발생
            },
        },
    };


</script>



<style scoped>
.balance-info {
    display: flex;
    justify-content: space-between;
    padding: 20px;
}

/*
.year-month-selector {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
}*/

.year-display,
.month-display {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}

.arrow-button {
    background: none;
    border: none;
    font-size: 16px;
    cursor: pointer;
    display: flex;
    align-items: center;
}

.arrow-button i {
    margin: 0 5px;
}

.arrow-button:hover {
    color: #007bff;
}

.calendar-container {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    border-radius: 10px;
    color: aaa;
    font-size: 20px;
}

.add-transaction-button {
    text-align: center;
    margin-top: 20px;
}

.add-transaction-button button {
    background-color: #0073cf;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
}

.add-transaction-button button:hover {
    background-color: #0c5db4;
}

button {

    background: none;
    border: none;
    color: #aaa;
    text-align: center;
    font-size: 24px;
    cursor: pointer;
    margin: 0 20px;
}

button:hover {
    color: #aaaaaa88;
}


.modal-wrap {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
}


.modal-container {
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 550px;
    background: #fff;
    border-radius: 10px;
    padding: 20px;
    box-sizing: border-box;
}
</style>