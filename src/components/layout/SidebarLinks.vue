<script setup lang="ts">
import { defineProps } from 'vue'

interface Link {
  title: string
  icon: string
  to?: string
}

defineProps<{
  links: Link[]
}>()

const emit = defineEmits<{
  linkClicked: [linkTitle: string]
}>()

const triggerLinkClick = (linkTitle: string) => {
  emit('linkClicked', linkTitle)
}
</script>

<template>
  <template v-for="link in links" :key="link.title">
    <RouterLink
      v-if="link.to"
      :to="link.to"
      class="nav-link"
      exactActiveClass="text-primary bg-muted"
    >
      <iconify-icon :icon="link.icon"></iconify-icon>
      <span class="hidden text-nowrap lg:block">{{ link.title }}</span>
    </RouterLink>

    <div
      v-else
      class="nav-link cursor-pointer"
      @click="triggerLinkClick(link.title)"
    >
      <iconify-icon :icon="link.icon"></iconify-icon>
      <span class="hidden text-nowrap lg:block">{{ link.title }}</span>
    </div>
  </template>
</template>

<style scoped>
.nav-link {
  @apply mx-2 flex items-center justify-center gap-3 rounded-lg px-4 py-2 text-muted-foreground transition-colors hover:text-primary lg:justify-normal;
}
</style>
