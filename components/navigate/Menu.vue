<template>
  <nav class="nav">
    <ul class="nav__ul">
      <li class="nav__li">
        <NuxtLink class="nav__link" to="/highcharts">Highcharts</NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
defineOptions({
  name: 'Menu',
});
</script>