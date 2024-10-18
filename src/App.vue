<script setup lang="ts">
import { supabase } from './libs/supabaseClient';

console.log(supabase);
</script>

<template>
  <main>
    <RouterView />
  </main>
</template>
