<template>
    <div>
        <!-- <p>balance : {{ balance }}</p> -->
        <!-- <p>User Name : {{ username }}</p> -->
        
        <AddTransaction v-if="modalcheck" @close="modalcheck=false" />
        <button @click="addTransaction()">
            내역추가
        </button>

        <table>
            <tr v-for="(log, index) in category" :key="index">
                <td>{{ log.category_total / total_expend * 100 }}</td>
                <td>{{ log.category }}</td>
                <td>{{ log.category_total }}</td>
            </tr>
        </table>
    </div>
</template>

<script>
import axios from 'axios';
import AddTransaction from '@/components/page/AddTransaction.vue';

export default {
    name: "Home",
    data() {
        return {
            balance: 0,
            username: "",
            statement: {},
            total_expend: 0,
            category: {},
            modalcheck: false
        }
    },
    components:{
        AddTransaction
    },
    methods:{
        addTransaction() {
            this.modalcheck = true;
        }
    },
    created() {
        const id = this.$cookies.get('id');

        const calc = (s) => {
            const res = s.reduce((acc, cur) => {
                return acc + cur.cost;
            }, 0);
            return res
        }

        axios.get(`http://localhost:3001/account/`)
            .then((res) => {
                // this.username = res.data.first_name;
                this.statement = res.data;

                this.total_expend = calc(this.statement);
                // console.log(this.total_expend);

                this.category = this.statement.reduce((acc, cur) => {
                    const categoryIndex = acc.findIndex(item => item.category === cur.category);
                    if (categoryIndex === -1) {
                        acc.push({ category: cur.category, cost: [cur.cost], category_total: cur.cost });
                    } else {
                        acc[categoryIndex].cost.push(cur.cost);
                        acc[categoryIndex].category_total += cur.cost;
                    }
                    return acc;
                }, []);

            })
            .catch((err) => {
                console.log(err);
            })
    }
}
</script>

<style lang="scss" scoped></style>