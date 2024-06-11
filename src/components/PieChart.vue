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
      required: true
    }
  },
  data() {
    return {
      chart: null,
      type: 'pie',
      data: {
        labels: [],
        datasets: [{
          label: 'Cost',
          data: [],
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
      },
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
        data: this.getChartData(this.chartData),
        options: this.options
      });
    },
    updateChart(newData) {
      // if (this.chart) {
      //   const newChartData = this.getChartData(newData);
      //   this.chart.data.labels = newChartData?.labels;
      //   this.chart.data.datasets[0].data = newChartData?.datasets[0].data;
      //   this.chart.update();
      // }
      if (this.chart !== null) {
        this.chart.destroy()
        this.createChart()
      }

    },
    getChartData(data) {
      return {
        labels: data?.map(item => item.category),
        datasets: [{
          data: data?.map(item => item.value),
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
