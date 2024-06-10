<template>
    <div>
      <canvas ref="chart"></canvas>
    </div>
  </template>
  
  <script>
  import { ref, onMounted, onUnmounted, watch } from 'vue';
  import { Chart, registerables } from 'chart.js';
  
  Chart.register(...registerables);
  
  export default {
    name: 'PieChart',
    props: {
      data: {
        type: Array,
        default: () => [],
      },
    },
    setup(props) {
      const chart = ref(null);
      let chartInstance = null;
  
      const createChart = () => {
        if (!chart.value) {
          console.error('Chart element is not defined.');
          return;
        }
  
        const ctx = chart.value.getContext('2d');
        if (!ctx) {
          console.error('Unable to get 2D context.');
          return;
        }
  
        chartInstance = new Chart(ctx, {
          type: 'pie',
          data: {
            labels: props.data.map(item => item.category),
            datasets: [{
              data: props.data.map(item => item.value),
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
          },
        });
      };
  
      const updateChart = () => {
        if (!chartInstance) {
          console.error('Chart instance is not defined.');
          return;
        }
  
        chartInstance.data.labels = props.data.map(item => item.category);
        chartInstance.data.datasets[0].data = props.data.map(item => item.value);
        chartInstance.update();
      };
  
      onMounted(() => {
        createChart();
      });
  
      watch(props.data, (newData) => {
        if (chartInstance) {
          updateChart();
        } else {
          createChart();
        }
      });
  
      onUnmounted(() => {
        if (chartInstance) {
          chartInstance.destroy();
        }
      });
  
      return { chart };
    },
  };
  </script>
  
  <style>
  canvas {
    max-width: 100%;
    max-height: 400px;
  }
  </style>
  