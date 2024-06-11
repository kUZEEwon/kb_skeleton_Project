<template>
    <div>
        <canvas ref="MyChart"></canvas>
    </div>
</template>

<script>
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

export default {
    props: {
        chartData: {
            type: Array,
            default: () => [] // 기본값으로 빈 배열 설정
        }
    },
    data() {
        return {
            chart: null,
            type: 'pie',
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        }
    },
    watch: {
        chartData: {
            handler(newData) {
                this.updateChart(newData)
            },
            deep: true,
            immediate: true
        }
    },
    mounted() {
        this.createChart()
    },
    methods: {
        createChart() {
            const ctx = this.$refs.MyChart.getContext('2d');
            this.chart = new Chart(ctx, {
                type: this.type,
                data: this.getChartData(this.chartData), // 여기서 getChartData를 호출합니다.
                options: this.options
            });
        },
        updateChart(newData) {
            if (this.chart) {
                // Update chart data
                this.chart.data.labels = newData.map(item => item.label);
                this.chart.data.datasets[0].data = newData.map(item => item.value);
                this.chart.update();
            }
        },
        addData(label, newData) {
            // Add data to the chart
            this.chart.data.labels.push(label);
            this.chart.data.datasets[0].data.push(newData);
            this.chart.update();
        },
        removeData() {
            // Remove data from the chart
            this.chart.data.labels.pop();
            this.chart.data.datasets[0].data.pop();
            this.chart.update();
        },
        getChartData(data) {
            return {
                labels: data.map(item => item.label),
                datasets: [{
                    data: data.map(item => item.value),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            };
        }
    }
}
</script>

<style>
canvas {
    max-width: 100%;
    max-height: 400px;
}
</style>
