<template>
  <div ref="chartContainer" :style="style" />
</template>

<script setup lang="ts">
import merge from "lodash.merge";
import Highcharts, { type Chart } from 'highcharts';

const props = defineProps({
  options: {
    type: Object as PropType<Highcharts.Options>,
    required: true
  },
  style: {
    type: Object as PropType<Record<string, string>>,
    default: () => ({ width: '100%', height: '400px' })
  },
});
const { $highcharts } = useNuxtApp();
const chartContainer = ref<HTMLElement | null>(null);
let chartInstance: Chart | null = null;

const baseOptions: Highcharts.Options = {
  chart: {
    type: 'bar',
    backgroundColor: 'transparent'
  },
  accessibility: {
    enabled: false
  },
};

const chartOptions = computed(() => {
  return merge({}, baseOptions, props.options)
})

onMounted(() => {
  if (chartContainer.value) {
    chartInstance = $highcharts.chart(chartContainer.value, chartOptions.value)
  }
});
onBeforeUnmount(() => {
  if (chartInstance) {
    chartInstance.destroy()
  }
});

watch(() => chartOptions.value, () => {
    if (chartInstance) {
      chartInstance.destroy();
    }
    if (chartContainer.value) {
      chartInstance = $highcharts.chart(chartContainer.value, chartOptions.value);
    }
})
</script>
