<template>
  <div class="wrapper">
    <Header />
    <main class="content flex flex_jc-center">
      <slot />
    </main>
    <Footer />
  </div>
</template>
<script setup lang="ts">
import Header from '../components/layouts/Header.vue';
import Footer from "~/components/layouts/Footer.vue";
</script>