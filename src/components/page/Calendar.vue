<template>
    <div>
        <h3>Calendar</h3>
        <!-- <VCalendar expanded :attributes='attrs' @dayclick="onDayClick()" /> -->
        <VDatePicker expanded v-model="date" mode="date" :attributes='attrs' @dayclick="onDayClick()" />

        <table border="1">
            <template v-if="dates.includes(selectedDate)">
                <thead>
                    <th><input type="checkbox" id="all" value="all" v-model="checked"></th>
                    <th>category</th>
                    <th>cost</th>
                    <th>income</th>
                    <th>memo</th>
                </thead>
                <tbody>
                    <tr v-for="item in selectedData[0]" :key="item.id">
                        <td v-for="i in item" :key="item.id">
                            {{ i }}
                        </td>
                    </tr>
                </tbody>
            </template>
        </table>
    </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';

export default {
    data() {
        return {
            attrs: [],
            dates: [],
            dateData: [],
            selectedData: []
        }
    },
    setup() {
        const date = ref(new Date());
        const selectedDate = ref();

        return {
            date, selectedDate,
        };
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
                
                this.dateData = this.mergeDate(data);

                this.dateData.forEach(element => {
                    this.dates.push(element.date);
                });
                this.attrs.push({
                    dot: true,
                    dates: this.dates
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        },
        
        onDayClick() {
            const sDate = this.date.getFullYear() + "-"
                + this.two(this.date.getMonth() + 1) + "-"
                + this.two(this.date.getDate());
            this.selectedDate = sDate;

            this.selectedData = [];
            this.dateData.forEach(element => {
                if (element.date==sDate){
                    this.selectedData.push(element.data);
                }
            });
        },

        mergeDate(d) {
            const res = d.reduce((acc, cur) => {
                const date = acc.findIndex(item => item.date === cur.date);
                if (date === -1) {
                    acc.push({
                        "date": cur.date, data: [{
                            "category": cur.category,
                            "cost": cur.cost,
                            "income": cur.income,
                            "memo": cur.memo
                        }]
                    });
                } else {
                    acc[date].data.push({
                        "category": cur.category,
                        "cost": cur.cost,
                        "income": cur.income,
                        "memo": cur.memo
                    });
                }
                return acc;
            }, []);

            return res;
        },

        two(str) {
            str = String(str);
            return str.length < 2 ? "0" + str : str;
        }
    }
}

</script>

<style scoped></style>