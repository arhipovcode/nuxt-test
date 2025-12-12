<template>
  <div class="content" v-if="isShowContent">
    <div class="content__title">
      {{ item?.title }}
    </div>
    <div class="content__subtitle">
      {{ item?.subtitle }}
    </div>
    <div class="content__desc" v-html="item?.desc"></div>

    <div class="content__code flex flex_i-start flex_colgap-1"
         :class="{'content__code_success': isCopied}"
         v-if="item?.codeJson">
      <pre class="content__code-json">{{ item?.codeJson }}</pre>
      <Icon class="content__code-copy" name="solar:copy-linear"
            :class="{'content__code-copy_disabled': isCopied}"
            @click="copyCode"/>
    </div>

    <button class="content__show-example" @click="handleBtn">
      {{ textBtn }}
    </button>

    <div ref="contentExample" class="content-chart" v-if="isShowExample">
      <div class="content-chart__switch">
        <Checkbox
          text-on="Включить код примера"
          text-off="Скрыть пример"
          @checkbox-state="changeOptions"
        />
      </div>
      <Chart :options="chartOptions"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useItemChartStore } from "~/stores/item-chart";
import merge from "lodash.merge";
import Checkbox from "~/components/ui/Checkbox.vue";

const itemChart = useItemChartStore();
const contentExample = ref<HTMLElement | null>(null);
const isShowExample = ref(false);
const isCopied = ref(false);
const changedOptions = ref<Record<string, unknown>>({});
const textBtn = computed(() => isShowExample.value ? 'Скрыть пример' : 'Показать пример');
const item = computed(() => itemChart.getItem);
const chartOptions = computed(() => {
  return merge(
    {},
    item.value?.chartOptions ?? {} as Record<string, unknown>,
    changedOptions.value,
  )
});
const isShowContent = computed(() => !!item.value && Object.keys(item.value).length > 0);

const handleBtn = async () => {
  isShowExample.value = !isShowExample.value;

  if (isShowContent.value) {
    await nextTick();
    contentExample.value?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  }

  if (!isShowExample.value) {
    changedOptions.value = {}
  }
};
const copyCode = async () => {
  try {
    if (item.value?.codeJson) {
      await navigator.clipboard.writeText(item.value.codeJson);
      console.log('Скопировано!');
      isCopied.value = true;
    }

    setTimeout(() => {
      isCopied.value = false;
    }, 1000);

  } catch (err) {
    console.error('Ошибка при копировании:', err);
  }
};
const changeOptions = (isAdded: boolean) => {
  const addedData = item.value?.codeJson || {};
  changedOptions.value = isAdded ? new Function('return ' + addedData)() : {};
}
</script>
