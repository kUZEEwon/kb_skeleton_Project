<template>
  <div>
    <div class="balance-info">
      <p>잔액: {{ balance }}</p>
      <p>이전 달 대비 지출: {{ expenditureChange }}</p>
    </div>
    <div class="year-month-selector">
      <div class="year-display">
        <button @click="changeYear(-1)" class="arrow-button">
          <i class="fas fa-chevron-left"></i>
        </button>
        <span>{{ currentYear }}년</span>
        <button @click="changeYear(1)" class="arrow-button">
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>
      <div class="month-display">
        <button @click="changeMonth(-1)" class="arrow-button">
          <i class="fas fa-chevron-left"></i> {{ prevMonthLabel }}
        </button>
        <span>{{ currentMonth }}월</span>
        <button @click="changeMonth(1)" class="arrow-button">
          {{ nextMonthLabel }} <i class="fas fa-chevron-right"></i>
        </button>
      </div>
      <div>
        <AddTransaction v-if="modalcheck" @close="modalcheck = false;" />
        <button @click="addTransaction()">
          내역추가
        </button>
      </div>
    </div>
    <PieChart v-if="categoryData.length > 0" :chartData="categoryData" />

    <TransactionTable :data="category" :total_expend="calc(category)" />
  </div>
</template>

<script>
import axios from 'axios';
import PieChart from '@/components/PieChart.vue';
import TransactionTable from '@/components/TransactionTable.vue';
import AddTransaction from '@/components/page/AddTransaction.vue';

export default {
  name: 'HomeView',
  components: {
    PieChart,
    TransactionTable,
    AddTransaction,
  },
  data() {
    return {
      balance: 210000,
      expenditureChange: 400000,
      currentYear: new Date().getFullYear(),
      currentMonth: new Date().getMonth() + 1,
      categoryData: [],
      transactionData: [],
      category: [],
      modalcheck: false,
    };
  },
  computed: {
    prevMonthLabel() {
      return (this.currentMonth === 1 ? 12 : this.currentMonth - 1) + "월";
    },
    nextMonthLabel() {
      return (this.currentMonth === 12 ? 1 : this.currentMonth + 1) + "월";
    },
  },
  watch: {
    currentYear: 'fetchData',
    currentMonth: 'fetchData',
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      const uid = this.$cookies.get('id');
      try {
        const response = await axios.get(`http://localhost:3001/account?uid=${uid}`);
        const data = response.data;

        const filteredData = data.filter(item => {
          const date = new Date(item.date);
          return date.getFullYear() === this.currentYear && date.getMonth() + 1 === this.currentMonth;
        });

        this.transactionData = filteredData;
        this.updateCategoryData(filteredData);
        this.category = this.reduceByCategory(filteredData);
        // console.log(this.categoryData)
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
        const categoryIndex = acc.findIndex(item => item.category === cur.category);
        if (categoryIndex === -1) {
          acc.push({ category: cur.category, cost: [cur.cost], category_total: cur.cost });
        } else {
          acc[categoryIndex].cost.push(cur.cost);
          acc[categoryIndex].category_total += cur.cost;
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
    }
  },
};
</script>

<style>
.balance-info {
  display: flex;
  justify-content: space-between;
  padding: 20px;
}

.year-month-selector {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

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
</style>
