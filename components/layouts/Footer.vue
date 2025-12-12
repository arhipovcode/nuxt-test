<template>
  <footer class="footer">
    <p>&copy; {{ year }} Все права защищены</p>
  </footer>
</template>

<script setup lang="ts">
const year = new Date().getFullYear();
</script>