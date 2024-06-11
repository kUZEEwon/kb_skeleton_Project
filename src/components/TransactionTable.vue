<template>
    <table>
        <thead>
            <tr>
                <th>날짜</th>
                <th>카테고리</th>
                <th>메모</th>
                <th>비용</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="transaction in data" :key="transaction.id">
                <td>{{ new Date(transaction.date).toLocaleDateString() }}</td>
                <td>{{ transaction.category }}</td>
                <td>{{ transaction.memo }}</td>
                <td>{{ transaction.cost }}</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    name: 'TransactionTable',
    props: {
        data: Array,
    },
};
</script>

<style>
table {
    width: 100%;
    border-collapse: collapse;
}

th,
td {
    padding: 8px;
    border: 1px solid #ddd;
    text-align: left;
}

thead {
    background-color: #f2f2f2;
}
</style>