<template>
  <div class="highcharts-page">
    <div class="container">
      <div class="highcharts-page__wrapper flex">
        <Sidebar
          :list="menu"
        />
        <Content :key="keyContent"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { menu } = useCharts();
const itemChart = useItemChartStore();
const keyContent = ref<number>(123);

watch(() => itemChart.getItem?.childId, (newValue: string | number | undefined) => {
  if (newValue) {
    keyContent.value += 1;
  }
})
</script>