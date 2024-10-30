<script setup lang="ts">
import usePageStore from '@/stores/page';

usePageStore().pageData.title = 'Home';
</script>

<template>
  <div>
    <RouterLink :to="{ name: '/projects/' }">Projects</RouterLink>
  </div>
</template>
