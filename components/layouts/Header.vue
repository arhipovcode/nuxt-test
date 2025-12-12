<template>
  <header class="header">
    <div class="container">
      <div class="flex flex_i-center flex_colgap-4">
        <NuxtLink to="/">
          <div class="header__logo text-bold">Книга рецептов</div>
        </NuxtLink>

        <Menu />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">

import Menu from "~/components/navigate/Menu.vue";

defineOptions({
  name: 'Header',
});
</script>
