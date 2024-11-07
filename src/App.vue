<script setup lang="ts">
import GuestLayout from './components/layout/main/GuestLayout.vue';
import MainLayout from './components/layout/main/MainLayout.vue';

const errorStore = useErrorStore()
const authStore = useAuthStore()

onErrorCaptured(error => {
  errorStore.setError({ error })
})

onMounted(async () => {
  authStore.trackAuthChanges()
})
</script>

<template>
  <Component :is="authStore.user ? MainLayout : GuestLayout">
    <AppErrorPage v-if="errorStore.activeError" />

    <RouterView v-else v-slot="{ Component, route }">
      <Suspense v-if="Component" :timeout="0">
        <Component :is="Component" :key="route.name"></Component>

        <template #fallback>
          <span>Loading ..</span>
        </template>
      </Suspense>
    </RouterView>
  </Component>
</template>
