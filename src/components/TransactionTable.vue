<template>
    <div class="transaction-table">
        <p v-if="topCategory" class="top-category">
            <b><u>{{ topCategory }}</u></b>에 가장 많이 사용하셨어요.
        </p>
        <div class="container">
            <table>
                <thead>
                    <tr>
                        <th>카테고리</th>
                        <th>비율</th>
                        <th>총 금액</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(transaction, index) in sortedData" :key="index">
                        <td>{{ transaction.category }}</td>
                        <td>{{ (transaction.category_total / total_expend * 100).toFixed(2) }} %</td>
                        <td>{{ transaction.category_total }}원</td>
                    </tr>
                </tbody>
            </table>
        </div>
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
.transaction-table {
    font-family: 'Arial', sans-serif;
    margin: 20px auto;
    width: 80%;
    max-width: 800px;
}

.top-category {
    text-align: center;
    margin-bottom: 20px;
    font-size: 1.2em;
}

.container {
    display: flex;
    justify-content: center;
    margin-top: 10px;
}

table {
    width: 100%;
    border-collapse: collapse;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

th,
td {
    padding: 12px 15px;
    border: 1px solid #ddd;
    text-align: center;
}

thead {
    background-color: #f4f4f4;
}

tbody tr:nth-child(even) {
    background-color: #f9f9f9;
}

tbody tr:hover {
    background-color: #f1f1f1;
}
</style>
