<template>
    <p v-if="topCategory">
    <b><u>{{ topCategory }}</u></b> 에 가장 많이 사용하셨어요.
    </p>
    <div class="container">
        

        <div><br/></div>
            <table>
                <!-- <thead>
            <tr>
                <th>날짜</th>
                <th>카테고리</th>
                <th>메모</th>
                <th>비용</th>
            </tr>
        </thead> -->
                <tbody>
                    <tr v-for="(transaction, index) in sortedData" :key="index">
                        <td>{{ transaction.category }}</td>
                        <td>{{ (transaction.category_total / total_expend * 100).toFixed(2) }} %</td>
                        <td>{{ transaction.category_total }}원</td>
                    </tr>
                </tbody>
            </table>
        </div>

    
</template>

<script>
export default {
    name: 'TransactionTable',
    props: {
        data: Array,
        total_expend: Number
    },
    data() {
        return {
            sortOrder: 1
        }
    },
    computed: {
        sortedData() {
            return this.data.slice().sort((a, b) => {
                const percentageA = a.category_total / this.total_expend;
                const percentageB = b.category_total / this.total_expend;
                return (percentageB - percentageA) * this.sortOrder;
            });
        },
        topCategory() {
            if (this.sortedData.length > 0) {
                return this.sortedData[0].category;
            }
            return null;
        }
    },
};
</script>

<style>
.container {
    display: flex;
    justify-content: center;
}
p {
    display: flex;
    justify-content: center;
}

table {
    width: 80%;
    border-collapse: collapse;
}

th,
td {
    padding: 8px;
    border: 1px solid #ddd;
    text-align: center;
}

thead {
    background-color: #f2f2f2;
}
</style>