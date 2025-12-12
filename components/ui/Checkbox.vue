<template>
  <div class="switch-checkbox" :class="stateCheckbox" @click="change">
    <span class="switch-checkbox__label flex flex_i-center flex_jc-center"
      :style="styleSize">
      <Icon class="switch-checkbox__icon" :size="size" :name="nameIcon" v-if="isActiveSwitch"/>
    </span>
    {{ textOn }}
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'Checkbox',
});

const props = defineProps({
  nameIcon: {
    type: String,
    default: 'iconoir:check'
  },
  size: {
    type: Number,
    default: 20
  },
  isActive: {
    type: Boolean,
    default: false
  },
  textOn: {
    type: String,
    default: 'Включить'
  },
})
const emit = defineEmits<{
  (e: 'checkbox-state', state: boolean): void;
}>();

const isActiveSwitch = ref<boolean>(props.isActive);

const stateCheckbox = computed<string>(() => {
  return isActiveSwitch.value ? '--active' : '--inactive'
})
const styleSize = computed<Record<string, string>>(() => {
  return {width: props.size + 'px', height: props.size + 'px'}
})
const change = () => {
  isActiveSwitch.value = !isActiveSwitch.value;
  emit( 'checkbox-state', isActiveSwitch.value)
}
</script>