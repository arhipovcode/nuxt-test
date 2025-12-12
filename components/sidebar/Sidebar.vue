<template>
  <aside class="sidebar" :class="empty">
    <template v-if="list.length">
      <div
        class="sidebar__menu"
        v-for="(item, idx) in list"
        :key="item.id + idx"
      >
        <sidebar-menu
          :item="item"
          :is-active="item.id === activeId"
          @change="changeActiveId"
        />
      </div>
    </template>

    <div class="sidebar__empty" v-else>
      Нет данных
    </div>
  </aside>
</template>

<script setup lang="ts">
import type { ChartList } from "~/interfaces/chart-list";

const props = defineProps<{
  list: ChartList[],
}>();

const activeId = ref<string>('all_chart');

const empty = computed(() => {
  return props.list.length > 0 ? '' : 'sidebar_empty flex flex_i-center flex_jc-center';
});

const changeActiveId = (itemId: string) => {
  activeId.value = itemId;
}
</script>
