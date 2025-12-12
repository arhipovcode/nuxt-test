<template>
    <input :type="type"
        :placeholder="placeholder"
        :value="modelValue"
        @input="handleInput">
</template>

<script setup lang="ts">
interface Props {
  type?: string;
  placeholder: string;
  modelValue: string;
}
const props = withDefaults(defineProps<Props>(), {
  type: 'text',
});
const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void
}>();

const handleInput = (event: Event) => {
  const value = (event.target as HTMLInputElement).value;
  emit('update:modelValue', value);
};
</script>