import { defineStore } from 'pinia';
import axios from 'axios';

export const useAccountStore = defineStore({
    id: 'account',
    state: () => ({
        user:{},
        items: [],
        expenseDifference: 0
    }),
    getters: {
        currentBalance(state) {
            /* id= this.$cookies.get("idCookie"); */
            const incomeTotal = state.items
                .filter(item => item.income)
                .reduce((total, item) => total + item.cost, 0);

            const expenseTotal = state.items
                .filter(item => !item.income)
                .reduce((total, item) => total + item.cost, 0);

            return incomeTotal - expenseTotal;
        }
    },
    actions: {
        async fetchData(currentMonth, currentYear) {
            try {
                const response = await axios.get('http://localhost:3001/account');
                this.setItems(response.data);
                
                // 지출 차이 계산
                this.calculateExpenseDifference(currentMonth, currentYear);
            } catch (error) {
                console.error('There was an error fetching the data!', error);
            }},
        setItems(items) {
            
            this.items = items;
        },
        calculateExpenseDifference(currentMonthData, previousMonthData) { // Accept currentMonth and currentYear as arguments
            // 이번 달과 이전 달의 지출 합계 계산
            const currentMonthExpenditure = currentMonthData.reduce((total, item) => total + (item.income ? 0 : item.cost), 0);
            const previousMonthExpenditure = previousMonthData.reduce((total, item) => total + (item.income ? 0 : item.cost), 0);

            // 지출 변화 계산
            this.expenseDifference = currentMonthExpenditure - previousMonthExpenditure;
        },
        setUser(userData) {
            this.user = userData;
        },
        clearUser() {
            this.user = {};
        },
    },
    
});
