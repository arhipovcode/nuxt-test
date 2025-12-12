<template>
<h5 class="sidebar__menu-title"
    :class="{'sidebar__menu-title_select-content': itemData?.parentId === item.id}"
    @click="change(item.id)">
  {{ item.title }}
</h5>
<div class="sidebar__menu-list"
     :class="[{'sidebar__menu-list_active': isActive}]"
     v-for="(el, idx) in item.list" :key="item.id + el.id + '_' + idx"
     @click="fetchData(item.id, el.id, el.title)">
      <span class="sidebar__menu-list__elem"
            :class="{'sidebar__menu-list__elem_selected': itemData?.childId === item.id + el.id}">
        {{ el.title }}
      </span>
</div>
</template>

<script setup lang="ts">
import type {ChartList} from "~/interfaces/chart-list";

const { fetchItemChart } = useCharts();
defineProps<{
  item: ChartList,
  isActive: boolean,
}>();

const emit = defineEmits<{
  (e: 'change', parentId: string): void;
}>();

const itemChart = useItemChartStore();
const itemData = computed(() => itemChart.getItem);

const change = (parentId: string) => {
  emit('change', parentId);
};
const fetchData = (parentId: string, childId: string | number, subtitle: string) => {
  fetchItemChart(parentId, childId, subtitle);
};
</script>
