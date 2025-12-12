// Minimal Vue <script setup> macro typings for ESLint/TS checks.
declare const defineProps: <T>() => T;
declare const defineEmits: <T>() => T;
declare const defineExpose: (exposed?: Record<string, any>) => void;
declare const withDefaults: <T, U>(props: T, defaults: U) => T & U;

